import { supabaseAdmin } from '$lib/server/supabase';
import { calculateProRata } from '$lib/server/pro-rata-calculator';

export interface ProRataPreviewParams {
  buildingId: string;
  startDate: string;
  endDate: string;
  denominatorChoice: string;
}

export interface ProRataPreviewLine {
  leaseId: string;
  tenantId: string | null;
  tenantName: string;
  leaseNumber: string | null;
  occupiedDays: number;
  startArea: number;
  endArea: number;
  weightedAreaDays: number;
  sharePercent: number;
}

export interface ProRataPreviewResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
  params: {
    buildingId: string;
    startDate: string;
    endDate: string;
    denominatorChoice: string;
    denominatorType: string;
  };
  summary: any;
  lines: ProRataPreviewLine[];
}

export async function getProRataPreview(
  params: ProRataPreviewParams
): Promise<ProRataPreviewResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const { data: building, error: buildingError } = await supabaseAdmin
    .from('buildings')
    .select('*')
    .eq('id', params.buildingId)
    .maybeSingle();

  if (buildingError) {
    throw new Error(buildingError.message);
  }

  if (!building) {
    throw new Error('Building not found');
  }

  let denominatorType = params.denominatorChoice;

  if (denominatorType === 'building_default') {
    denominatorType = building.default_denominator_type ?? 'rentable_area';
  }

  if (denominatorType === 'lease_defined') {
    denominatorType = 'rentable_area';
  }

  const denominatorArea =
    Number(
      denominatorType === 'gla'
        ? building.total_gla
        : building.total_rentable_area
    ) || 0;

  if (denominatorArea <= 0) {
    errors.push('Building denominator area is missing or zero.');
  }

  const { data: leases, error: leasesError } = await supabaseAdmin
    .from('leases')
    .select('id, lease_number, tenant_id, tenants(name)')
    .eq('building_id', params.buildingId);

  if (leasesError) {
    throw new Error(leasesError.message);
  }

  if (!leases || leases.length === 0) {
    warnings.push('No leases found for this building.');
  }

  const leaseIds = (leases ?? []).map((lease: any) => lease.id);

  let leaseUnits: any[] = [];

  if (leaseIds.length > 0) {
    const { data, error: leaseUnitsError } = await supabaseAdmin
      .from('lease_units')
      .select(
        `
        lease_id,
        start_date,
        end_date,
        usable_area_override,
        rentable_area_override,
        units(rentable_area, usable_area)
        `
      )
      .in('lease_id', leaseIds)
      .lte('start_date', params.endDate)
      .gte('end_date', params.startDate);

    if (leaseUnitsError) {
      throw new Error(leaseUnitsError.message);
    }

    leaseUnits = data ?? [];
  }

  const assignments = leaseUnits.map((row: any) => {
    const unit = Array.isArray(row.units) ? row.units[0] : row.units;

    const area = Number(
      row.rentable_area_override ??
        unit?.rentable_area ??
        row.usable_area_override ??
        unit?.usable_area ??
        0
    );

    return {
      leaseId: row.lease_id,
      startDate: row.start_date,
      endDate: row.end_date,
      area
    };
  });

  const calculation = calculateProRata({
    startDate: params.startDate,
    endDate: params.endDate,
    denominatorArea,
    assignments
  });

  const leaseById = new Map((leases ?? []).map((lease: any) => [lease.id, lease]));

  const lines: ProRataPreviewLine[] = calculation.lines.map((line) => {
    const lease: any = leaseById.get(line.leaseId);

    const tenant = Array.isArray(lease?.tenants)
      ? lease?.tenants[0]
      : lease?.tenants;

    return {
      leaseId: line.leaseId,
      tenantId: lease?.tenant_id ?? null,
      tenantName: tenant?.name ?? 'Unknown Tenant',
      leaseNumber: lease?.lease_number ?? null,
      occupiedDays: line.occupiedDays,
      startArea: line.startArea,
      endArea: line.endArea,
      weightedAreaDays: line.weightedAreaDays,
      sharePercent: line.sharePercent
    };
  });

  if (lines.length === 0) {
    warnings.push('No lease unit assignments overlap the selected period.');
  }

  if (calculation.summary.totalSharePercent > 1) {
    warnings.push(
      'Total tenant share is greater than 100%. Check overlapping assignments or denominator area.'
    );
  }

  if (
    calculation.summary.totalSharePercent < 1 &&
    calculation.summary.totalSharePercent > 0
  ) {
    warnings.push(
      `Total tenant share is ${(calculation.summary.totalSharePercent * 100).toFixed(
        4
      )}%. The remainder may be vacancy or unassigned space.`
    );
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    params: {
      ...params,
      denominatorType
    },
    summary: {
      ...calculation.summary,
      denominatorType
    },
    lines
  };
}