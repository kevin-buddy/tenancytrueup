import type {
  CostType,
  LeaseRuleInput,
  ReconciliationLine
} from '$lib/types';

export interface GrossedExpenseLine {
  categoryId: string;
  categoryName: string;
  costType: CostType;
  actualAmount: number;
  priorYearAmount: number | null;
  grossedAmount: number;
}

export function applyLeaseRules(
  lines: GrossedExpenseLine[],
  rules: LeaseRuleInput[]
): ReconciliationLine[] {
  return lines.map((line) => {
    const rule = rules.find((r) => r.categoryId === line.categoryId);

    if (!rule || rule.treatment === 'included') {
      return {
        categoryId: line.categoryId,
        categoryName: line.categoryName,
        costType: line.costType,
        actualAmount: line.actualAmount,
        grossedUpAmount: line.grossedAmount,
        allowedAmount: line.grossedAmount,
        excludedAmount: 0,
        capAdjustment: 0
      };
    }

    if (rule.treatment === 'excluded') {
      return {
        categoryId: line.categoryId,
        categoryName: line.categoryName,
        costType: line.costType,
        actualAmount: line.actualAmount,
        grossedUpAmount: line.grossedAmount,
        allowedAmount: 0,
        excludedAmount: line.grossedAmount,
        capAdjustment: 0
      };
    }

    if (rule.treatment === 'capped') {
      const base = rule.capBaseAmount ?? line.priorYearAmount;

      // If the cap base or percentage is missing, do not silently reduce the bill.
      // Production software should surface a validation warning.
      if (base == null || rule.capPercent == null) {
        return {
          categoryId: line.categoryId,
          categoryName: line.categoryName,
          costType: line.costType,
          actualAmount: line.actualAmount,
          grossedUpAmount: line.grossedAmount,
          allowedAmount: line.grossedAmount,
          excludedAmount: 0,
          capAdjustment: 0
        };
      }

      const capLimit = base * (1 + rule.capPercent / 100);

      const allowedAmount = Math.min(line.grossedAmount, capLimit);

      const capAdjustment = Math.max(0, line.grossedAmount - allowedAmount);

      return {
        categoryId: line.categoryId,
        categoryName: line.categoryName,
        costType: line.costType,
        actualAmount: line.actualAmount,
        grossedUpAmount: line.grossedAmount,
        allowedAmount,
        excludedAmount: 0,
        capAdjustment
      };
    }

    return {
      categoryId: line.categoryId,
      categoryName: line.categoryName,
      costType: line.costType,
      actualAmount: line.actualAmount,
      grossedUpAmount: line.grossedAmount,
      allowedAmount: line.grossedAmount,
      excludedAmount: 0,
      capAdjustment: 0
    };
  });
}