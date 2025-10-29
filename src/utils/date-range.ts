

/**
 * Default range helpers (provide when missing to avoid runtime ReferenceError).
 * - daily: last 7 days (start at 00:00 of day 6 days ago, end at 23:59:59.999 today)
 * - weekly: last 4 weeks (28 days)
 * - monthly: last 6 months (from 1st of month 5 months ago to end of current month)
 * - yearly: last 5 years (from Jan 1 of currentYear-4 to end of current year)
 */
export function defaultDailyRange(now: Date) {
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const start = new Date(now);
  start.setDate(start.getDate() - 6); // include today => 7 days total
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

export function defaultWeeklyRange(now: Date) {
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const start = new Date(now);
  start.setDate(start.getDate() - 27); // 28 days range = 4 weeks
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

export function defaultMonthlyRange(now: Date) {
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0); // last day of current month
  end.setHours(23, 59, 59, 999);
  const start = new Date(now.getFullYear(), now.getMonth() - 5, 1); // first day 5 months ago => 6 months total
  start.setHours(0, 0, 0, 0);
  return { start, end };
}

export function defaultYearlyRange(now: Date) {
  const end = new Date(now.getFullYear(), 11, 31);
  end.setHours(23, 59, 59, 999);
  const start = new Date(now.getFullYear() - 4, 0, 1); // 5 years total including current year
  start.setHours(0, 0, 0, 0);
  return { start, end };
}
