import { Rational } from '~/features/core/utils/rational';
import type { LengthUnit } from './length-unit'
import { LENGTH_UNIT } from './length-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const METER = new Rational(1, 1); 

const MILLIMETER = scaleUnit(METER, 1, 1e3);
const MICROMETER = scaleUnit(MILLIMETER, 1, 1e3);
const NANOMETER = scaleUnit(MICROMETER, 1, 1e3);
const CENTIMETER = scaleUnit(MILLIMETER, 10);
const KILOMETER = scaleUnit(METER, 1_000);

const INCH = scaleUnit(MILLIMETER, 254, 10);
const HAND = scaleUnit(INCH, 4);
const FOOT = scaleUnit(HAND, 3);
const YARD = scaleUnit(FOOT, 3);
const CHAIN = scaleUnit(YARD, 22);
const FURLONG = scaleUnit(CHAIN, 10);
const MILE = scaleUnit(FURLONG, 8);
const LEAGUE = scaleUnit(MILE, 3);

export const lengthScale: Record<LengthUnit, Rational> = {
  [LENGTH_UNIT.NANOMETER]: NANOMETER,
  [LENGTH_UNIT.MICROMETER]: MICROMETER,
  [LENGTH_UNIT.MILLIMETER]: MILLIMETER,
  [LENGTH_UNIT.CENTIMETER]: CENTIMETER,
  [LENGTH_UNIT.METER]: METER,
  [LENGTH_UNIT.KILOMETER]: KILOMETER,

  [LENGTH_UNIT.INCH]: INCH,
  [LENGTH_UNIT.HAND]: HAND,
  [LENGTH_UNIT.FOOT]: FOOT,
  [LENGTH_UNIT.YARD]: YARD,
  [LENGTH_UNIT.CHAIN]: CHAIN,
  [LENGTH_UNIT.FURLONG]: FURLONG,
  [LENGTH_UNIT.MILE]: MILE,
  [LENGTH_UNIT.LEAGUE]: LEAGUE,
};
