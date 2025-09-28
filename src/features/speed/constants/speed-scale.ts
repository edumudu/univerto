import { Rational } from '~/features/core/utils/rational';
import type { SpeedUnit } from './speed-unit'
import { SPEED_UNIT } from './speed-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const METER_PER_SECOND = new Rational(1, 1);
  
const KILOMETER_PER_HOUR = scaleUnit(METER_PER_SECOND, 1, 3.6); 
const MILE_PER_HOUR = scaleUnit(METER_PER_SECOND, 44704, 1e5); 
const KNOT = scaleUnit(METER_PER_SECOND, 514444, 1e6); 
const FOOT_PER_SECOND = scaleUnit(METER_PER_SECOND, 3048, 1e4); 
const INCH_PER_HOUR = scaleUnit(METER_PER_SECOND, 70556, 1e10); 
const MILLIMETER_PER_HOUR = scaleUnit(METER_PER_SECOND, 277778, 1e12); 

export const speedScale: Record<SpeedUnit, Rational> = {
  [SPEED_UNIT.METER_PER_SECOND]: METER_PER_SECOND,
  [SPEED_UNIT.KILOMETER_PER_HOUR]: KILOMETER_PER_HOUR,
  [SPEED_UNIT.MILE_PER_HOUR]: MILE_PER_HOUR,
  [SPEED_UNIT.KNOT]: KNOT,
  [SPEED_UNIT.FOOT_PER_SECOND]: FOOT_PER_SECOND,
  [SPEED_UNIT.INCH_PER_HOUR]: INCH_PER_HOUR,
  [SPEED_UNIT.MILLIMETER_PER_HOUR]: MILLIMETER_PER_HOUR,
};
