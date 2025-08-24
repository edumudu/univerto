import type { TimeUnit } from './time-unit'
import { TIME_UNIT } from './time-unit';

const NS = 1;
const US = 1000 * NS;
const MS = 1000 * US;
const SEC = 1000 * MS;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;
const DECADE = 10 * YEAR;

export const timeScale: Record<TimeUnit, number> = {
  [TIME_UNIT.NANOSECOND]: NS,
  [TIME_UNIT.MICROSECOND]: US,
  [TIME_UNIT.MILLISECOND]: MS,
  [TIME_UNIT.SECOND]: SEC,
  [TIME_UNIT.MINUTE]: MIN,
  [TIME_UNIT.HOUR]: HOUR,
  [TIME_UNIT.DAY]: DAY,
  [TIME_UNIT.WEEK]: WEEK,
  [TIME_UNIT.MONTH]: MONTH,
  [TIME_UNIT.YEAR]: YEAR,
  [TIME_UNIT.DECADE]: DECADE,
};
