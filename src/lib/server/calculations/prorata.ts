import type { AreaPeriod } from '$lib/types';

const DAY_MS = 86_400_000;

function utcStartOfDay(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    )
  );
}

function daysInclusive(start: Date, end: Date): number {
  const s = utcStartOfDay(start);
  const e = utcStartOfDay(end);

  return Math.round((e.getTime() - s.getTime()) / DAY_MS) + 1;
}

export function annualWeightedProRata(
  areaPeriods: AreaPeriod[],
  yearStart: Date,
  yearEnd: Date,
  buildingDenominatorArea: number
): number {
  if (buildingDenominatorArea <= 0) {
    return 0;
  }

  const yStart = utcStartOfDay(yearStart);
  const yEnd = utcStartOfDay(yearEnd);

  const totalDays = daysInclusive(yStart, yEnd);

  if (totalDays <= 0) {
    return 0;
  }

  let areaDays = 0;

  for (const period of areaPeriods) {
    const periodStart = utcStartOfDay(period.startDate);
    const periodEnd = utcStartOfDay(period.endDate);

    const clampedStart = new Date(
      Math.max(periodStart.getTime(), yStart.getTime())
    );

    const clampedEnd = new Date(
      Math.min(periodEnd.getTime(), yEnd.getTime())
    );

    if (clampedEnd.getTime() < clampedStart.getTime()) {
      continue;
    }

    const days = daysInclusive(clampedStart, clampedEnd);

    areaDays += period.rentableArea * days;
  }

  return areaDays / (buildingDenominatorArea * totalDays);
}