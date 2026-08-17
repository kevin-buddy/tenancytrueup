import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { supabaseAdmin } from '$lib/server/supabase';
import { calculateReconciliation } from '$lib/server/calculations/reconciliation';

import type {
  CostType,
  ExpenseLineInput,
  LeaseRuleInput,
  RuleTreatment
} from '$lib/types';

interface LedgerRow {
  category_id: string;
  amount: string | number | null;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function parseYear(value: unknown): number | null {
  const year = Number(value);

  if (!Number.isInteger(year)) {
    return null;
  }

  if (year < 2000 || year > 2100) {
    return null;
  }

  return year;
}

function sumLedgerByCategory(
  rows: LedgerRow[] | null
): Map<string, number> {
  const totals = new Map<string, number>();

  for (const row of rows ?? []) {
    const amount = Number(row.amount ?? 0);

    totals.set(
      row.category_id,
      (totals.get(row.category_id) ?? 0) + amount
    );
  }

  return totals;
}

export const POST: RequestHandler = async ({ request }) => {
  let body: Record<string, unknown> = {};

  try {
    body = await request.json();
  } catch {
    error(400, 'Invalid JSON body');
  }

  const leaseId =
    typeof body.leaseId === 'string' ? body.leaseId : null;

  const year = parseYear(body.year);

  if (!leaseId || year == null) {
    error(400, 'leaseId and a valid year are required');
  }

  const { data: lease, error: leaseError } = await supabaseAdmin
    .from('leases')
    .select('*')
    .eq('id', leaseId)
    .maybeSingle();

  if (leaseError) {
    error(500, leaseError.message);
  }

  if (!lease) {
    error(404, 'Lease not found');
  }

  const { data: building, error: buildingError } = await supabaseAdmin
    .from('buildings')
    .select('*')
    .eq('id', lease.building_id)
    .maybeSingle();

  if (buildingError) {
    error(500, buildingError.message);
  }

  if (!building) {
    error(404, 'Building not found');
  }

  const currentStart = `${year}-01-01`;
  const currentEnd = `${year}-12-31`;

  const priorStart = `${year - 1}-01-01`;
  const priorEnd = `${year - 1}-12-31`;

  const [
    areaPeriodResponse,
    categoryResponse,
    currentLedgerResponse,
    priorLedgerResponse,
    ruleResponse
  ] = await Promise.all([
    supabaseAdmin
      .from('lease_area_periods')
      .select('*')
      .eq('lease_id', leaseId),

    supabaseAdmin
      .from('expense_categories')
      .select('*')
      .eq('building_id', building.id),

    supabaseAdmin
      .from('ledger_entries')
      .select('category_id, amount')
      .eq('building_id', building.id)
      .gte('expense_date', currentStart)
      .lte('expense_date', currentEnd),

    supabaseAdmin
      .from('ledger_entries')
      .select('category_id, amount')
      .eq('building_id', building.id)
      .gte('expense_date', priorStart)
      .lte('expense_date', priorEnd),

    supabaseAdmin
      .from('lease_rules')
      .select('*')
      .eq('lease_id', leaseId)
  ]);

  if (areaPeriodResponse.error) {
    error(500, areaPeriodResponse.error.message);
  }

  if (categoryResponse.error) {
    error(500, categoryResponse.error.message);
  }

  if (currentLedgerResponse.error) {
    error(500, currentLedgerResponse.error.message);
  }

  if (priorLedgerResponse.error) {
    error(500, priorLedgerResponse.error.message);
  }

  if (ruleResponse.error) {
    error(500, ruleResponse.error.message);
  }

  const areaPeriods = (areaPeriodResponse.data ?? []).map(
    (row: any) => ({
      startDate: new Date(row.start_date),
      endDate: new Date(row.end_date),
      rentableArea: Number(row.rentable_area)
    })
  );

  const currentTotals = sumLedgerByCategory(
    currentLedgerResponse.data as LedgerRow[] | null
  );

  const priorTotals = sumLedgerByCategory(
    priorLedgerResponse.data as LedgerRow[] | null
  );

  const expenseLines: ExpenseLineInput[] = (
    categoryResponse.data ?? []
  ).map((category: any) => ({
    categoryId: category.id,
    categoryName: category.name,
    costType: category.cost_type as CostType,
    actualAmount: currentTotals.get(category.id) ?? 0,
    priorYearAmount: priorTotals.has(category.id)
      ? priorTotals.get(category.id) ?? null
      : null
  }));

  const rules: LeaseRuleInput[] = (ruleResponse.data ?? []).map(
    (rule: any) => ({
      categoryId: rule.category_id,
      treatment: rule.treatment as RuleTreatment,
      capPercent:
        rule.cap_percent == null ? null : Number(rule.cap_percent),
      capBaseAmount:
        rule.cap_base_amount == null
          ? null
          : Number(rule.cap_base_amount)
    })
  );

  const result = calculateReconciliation({
    yearStart: new Date(Date.UTC(year, 0, 1)),
    yearEnd: new Date(Date.UTC(year, 11, 31)),
    building: {
      rentableArea: Number(building.rentable_area),
      occupancyPercent: Number(building.occupancy_percent),
      grossUpPercent: Number(building.gross_up_percent)
    },
    lease: {
      estimatedAnnualCam: Number(lease.estimated_annual_cam)
    },
    areaPeriods,
    expenseLines,
    rules
  });

  const { data: reconciliation, error: insertError } =
    await supabaseAdmin
      .from('reconciliations')
      .insert({
        lease_id: leaseId,
        year,
        status: 'draft',
        actual_recoverable_pool: round2(
          result.recoverablePool
        ).toFixed(2),
        tenant_share_percent: result.share.toFixed(8),
        tenant_share_amount: round2(result.tenantShareAmount).toFixed(
          2
        ),
        estimated_charges: round2(result.estimatedCharges).toFixed(2),
        true_up_amount: round2(result.trueUpAmount).toFixed(2)
      })
      .select()
      .single();

  if (insertError) {
    error(500, insertError.message);
  }

  if (!reconciliation) {
    error(500, 'Failed to create reconciliation');
  }

  if (result.lines.length > 0) {
    const { error: lineError } = await supabaseAdmin
      .from('reconciliation_lines')
      .insert(
        result.lines.map((line) => ({
          reconciliation_id: reconciliation.id,
          category_id: line.categoryId,
          category_name: line.categoryName,
          cost_type: line.costType,
          actual_amount: round2(line.actualAmount).toFixed(2),
          grossed_up_amount: round2(line.grossedUpAmount).toFixed(2),
          allowed_amount: round2(line.allowedAmount).toFixed(2),
          excluded_amount: round2(line.excludedAmount).toFixed(2),
          cap_adjustment: round2(line.capAdjustment).toFixed(2)
        }))
      );

    if (lineError) {
      error(500, lineError.message);
    }
  }

  return json({ reconciliation });
};