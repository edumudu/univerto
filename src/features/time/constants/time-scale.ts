import { scaleUnit } from '~/features/core/utils/scale-unit';
import type { TimeUnit } from './time-unit'
import { TIME_UNIT } from './time-unit';
import { Rational } from '~/features/core/utils/rational';

const MS = new Rational(1, 1); // Base

const NS = scaleUnit(MS, 1, 1e3);
const US = scaleUnit(NS, 1, 1e3);

const SEC = scaleUnit(MS, 1e3);
const MIN = scaleUnit(SEC, 60);
const HOUR = scaleUnit(MIN, 60);
const DAY = scaleUnit(HOUR, 24);
const WEEK = scaleUnit(DAY, 7);
const MONTH = scaleUnit(DAY, 30);
const YEAR = scaleUnit(DAY, 365);
const DECADE = scaleUnit(YEAR, 10);

export const timeScale: Record<TimeUnit, Rational> = {
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
