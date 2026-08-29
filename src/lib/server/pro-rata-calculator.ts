const DAY_MS = 86_400_000;

export interface ProRataAssignmentInput {
  leaseId: string;
  startDate: string;
  endDate: string;
  area: number;
}

export interface ProRataCalculationInput {
  startDate: string;
  endDate: string;
  denominatorArea: number;
  assignments: ProRataAssignmentInput[];
}

export interface ProRataLineResult {
  leaseId: string;
  occupiedDays: number;
  startArea: number;
  endArea: number;
  weightedAreaDays: number;
  sharePercent: number;
}

export interface ProRataSummary {
  periodStart: string;
  periodEnd: string;
  totalDays: number;
  denominatorArea: number;
  denominatorWeightedDays: number;
  totalWeightedAreaDays: number;
  totalSharePercent: number;
  leasedAreaEnd: number;
  vacancyArea: number;
  leaseCount: number;
}

export interface ProRataCalculationResult {
  summary: ProRataSummary;
  lines: ProRataLineResult[];
}

function parseDate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date: Date, amount: number): Date {
  return new Date(date.getTime() + amount * DAY_MS);
}

function daysInclusive(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1;
}

export function calculateProRata(
  input: ProRataCalculationInput
): ProRataCalculationResult {
  const periodStart = parseDate(input.startDate);
  const periodEnd = parseDate(input.endDate);

  const totalDays = daysInclusive(periodStart, periodEnd);

  const denominatorArea = Number(input.denominatorArea) || 0;

  const leaseData = new Map<
    string,
    {
      intervals: Array<{
        start: number;
        end: number;
        area: number;
      }>;
      weightedAreaDays: number;
      occupiedDays: number;
      startArea: number;
      endArea: number;
    }
  >();

  const breakpoints = new Set<number>([
    periodStart.getTime(),
    addDays(periodEnd, 1).getTime()
  ]);

  for (const assignment of input.assignments) {
    const area = Number(assignment.area) || 0;

    if (area <= 0) {
      continue;
    }

    const assignmentStart = parseDate(assignment.startDate);
    const assignmentEnd = parseDate(assignment.endDate);

    const clampedStart = new Date(
      Math.max(assignmentStart.getTime(), periodStart.getTime())
    );

    const clampedEnd = new Date(
      Math.min(assignmentEnd.getTime(), periodEnd.getTime())
    );

    if (clampedEnd.getTime() < clampedStart.getTime()) {
      continue;
    }

    breakpoints.add(clampedStart.getTime());
    breakpoints.add(addDays(clampedEnd, 1).getTime());

    if (!leaseData.has(assignment.leaseId)) {
      leaseData.set(assignment.leaseId, {
        intervals: [],
        weightedAreaDays: 0,
        occupiedDays: 0,
        startArea: 0,
        endArea: 0
      });
    }

    leaseData.get(assignment.leaseId)!.intervals.push({
      start: clampedStart.getTime(),
      end: clampedEnd.getTime(),
      area
    });
  }

  const sortedBreakpoints = [...breakpoints].sort((a, b) => a - b);

  for (let i = 0; i < sortedBreakpoints.length - 1; i++) {
    const segmentStart = sortedBreakpoints[i];
    const segmentEnd = addDays(new Date(sortedBreakpoints[i + 1]), -1).getTime();

    if (segmentEnd < segmentStart) {
      continue;
    }

    const segmentStartDate = new Date(segmentStart);
    const segmentEndDate = new Date(segmentEnd);

    const days = daysInclusive(segmentStartDate, segmentEndDate);

    if (days <= 0) {
      continue;
    }

    for (const lease of leaseData.values()) {
      let areaSum = 0;

      for (const interval of lease.intervals) {
        if (interval.start <= segmentStart && interval.end >= segmentEnd) {
          areaSum += interval.area;
        }
      }

      if (areaSum > 0) {
        lease.weightedAreaDays += areaSum * days;
        lease.occupiedDays += days;
      }

      if (segmentStart === periodStart.getTime()) {
        lease.startArea = areaSum;
      }

      if (segmentEnd === periodEnd.getTime()) {
        lease.endArea = areaSum;
      }
    }
  }

  const denominatorWeightedDays = denominatorArea * totalDays;

  const lines: ProRataLineResult[] = [...leaseData.entries()]
    .map(([leaseId, lease]) => ({
      leaseId,
      occupiedDays: lease.occupiedDays,
      startArea: lease.startArea,
      endArea: lease.endArea,
      weightedAreaDays: lease.weightedAreaDays,
      sharePercent:
        denominatorWeightedDays > 0
          ? lease.weightedAreaDays / denominatorWeightedDays
          : 0
    }))
    .sort((a, b) => b.sharePercent - a.sharePercent);

  const totalWeightedAreaDays = lines.reduce(
    (sum, line) => sum + line.weightedAreaDays,
    0
  );

  const totalSharePercent =
    denominatorWeightedDays > 0
      ? totalWeightedAreaDays / denominatorWeightedDays
      : 0;

  const leasedAreaEnd = lines.reduce((sum, line) => sum + line.endArea, 0);

  return {
    summary: {
      periodStart: input.startDate,
      periodEnd: input.endDate,
      totalDays,
      denominatorArea,
      denominatorWeightedDays,
      totalWeightedAreaDays,
      totalSharePercent,
      leasedAreaEnd,
      vacancyArea: Math.max(0, denominatorArea - leasedAreaEnd),
      leaseCount: lines.length
    },
    lines
  };
}