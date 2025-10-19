import { Rational } from '~/features/core/utils/rational';
import type { FrequencyUnit } from './frequency-unit'
import { FREQUENCY_UNIT } from './frequency-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const HERTZ = new Rational(1, 1); // Base unit

// Standard frequency units
const MILLIHERTZ = scaleUnit(HERTZ, 1, 1e3);
const KILOHERTZ = scaleUnit(HERTZ, 1e3);
const MEGAHERTZ = scaleUnit(KILOHERTZ, 1e3);
const GIGAHERTZ = scaleUnit(MEGAHERTZ, 1e3);
const TERAHERTZ = scaleUnit(GIGAHERTZ, 1e3);

// Angular frequency units
// 1 rpm = 1/60 Hz (1 revolution per minute = 1/60 revolutions per second)
const RPM = scaleUnit(HERTZ, 1, 60);

// 1 deg/s = 1/360 Hz (1 degree per second = 1/360 of a full rotation per second)
const DEGREE_PER_SECOND = scaleUnit(HERTZ, 1, 360);

export const frequencyScale: Record<FrequencyUnit, Rational> = {
  [FREQUENCY_UNIT.MILLIHERTZ]:         MILLIHERTZ,
  [FREQUENCY_UNIT.HERTZ]:              HERTZ,
  [FREQUENCY_UNIT.KILOHERTZ]:          KILOHERTZ,
  [FREQUENCY_UNIT.MEGAHERTZ]:          MEGAHERTZ,
  [FREQUENCY_UNIT.GIGAHERTZ]:          GIGAHERTZ,
  [FREQUENCY_UNIT.TERAHERTZ]:          TERAHERTZ,
  [FREQUENCY_UNIT.RPM]:                RPM,
  [FREQUENCY_UNIT.DEGREE_PER_SECOND]:  DEGREE_PER_SECOND,
};

