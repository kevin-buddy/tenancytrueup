import type {
  ReconciliationInput,
  ReconciliationResult
} from '$lib/types';

import { annualWeightedProRata } from './prorata';
import { grossUpLine } from './grossup';
import { applyLeaseRules } from './rules';

export function calculateReconciliation(
  input: ReconciliationInput
): ReconciliationResult {
  const grossedLines = input.expenseLines.map((line) => {
    const grossedAmount = grossUpLine(
      line.actualAmount,
      line.costType,
      input.building.occupancyPercent,
      input.building.grossUpPercent
    );

    return {
      ...line,
      grossedAmount
    };
  });

  const ruledLines = applyLeaseRules(grossedLines, input.rules);

  const recoverablePool = ruledLines.reduce(
    (sum, line) => sum + line.allowedAmount,
    0
  );

  const share = annualWeightedProRata(
    input.areaPeriods,
    input.yearStart,
    input.yearEnd,
    input.building.rentableArea
  );

  const tenantShareAmount = recoverablePool * share;

  const estimatedCharges = input.lease.estimatedAnnualCam;

  const trueUpAmount = tenantShareAmount - estimatedCharges;

  return {
    lines: ruledLines,
    recoverablePool,
    share,
    tenantShareAmount,
    estimatedCharges,
    trueUpAmount
  };
}