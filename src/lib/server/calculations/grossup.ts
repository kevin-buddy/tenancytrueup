import type { CostType } from '$lib/types';

export function grossUpLine(
  amount: number,
  costType: CostType,
  actualOccupancyPercent: number,
  grossUpPercent: number
): number {
  if (costType !== 'variable') {
    return amount;
  }

  if (!Number.isFinite(actualOccupancyPercent)) {
    return amount;
  }

  if (actualOccupancyPercent <= 0) {
    return amount;
  }

  if (!Number.isFinite(grossUpPercent)) {
    return amount;
  }

  if (grossUpPercent <= 0) {
    return amount;
  }

  // Do not reduce the expense if occupancy is already above the gross-up target,
  // unless the lease explicitly requires gross-down behavior.
  if (actualOccupancyPercent >= grossUpPercent) {
    return amount;
  }

  return (amount / (actualOccupancyPercent / 100)) * (grossUpPercent / 100);
}