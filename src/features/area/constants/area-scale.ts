import { Rational } from '~/features/core/utils/rational';
import type { AreaUnit } from './area-unit'
import { AREA_UNIT } from './area-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const SQUARE_METER = new Rational(1, 1);

const SQUARE_MILLIMETER = scaleUnit(SQUARE_METER, 1, 1e6);
const SQUARE_CENTIMETER = scaleUnit(SQUARE_METER, 1, 1e4); 
const HECTARE = scaleUnit(SQUARE_METER, 10_000); 
const SQUARE_KILOMETER = scaleUnit(SQUARE_METER, 1_000_000); 

const SQUARE_INCH = scaleUnit(SQUARE_MILLIMETER, 645.16); 
const SQUARE_FOOT = scaleUnit(SQUARE_INCH, 144); 
const ACRE = scaleUnit(SQUARE_FOOT, 43_560); 
const SQUARE_MILE = scaleUnit(ACRE, 640); 

export const areaScale: Record<AreaUnit, Rational> = {
  [AREA_UNIT.SQUARE_MILLIMETER]: SQUARE_MILLIMETER,
  [AREA_UNIT.SQUARE_CENTIMETER]: SQUARE_CENTIMETER,
  [AREA_UNIT.SQUARE_METER]: SQUARE_METER,
  [AREA_UNIT.HECTARE]: HECTARE,
  [AREA_UNIT.SQUARE_KILOMETER]: SQUARE_KILOMETER,
  [AREA_UNIT.SQUARE_INCH]: SQUARE_INCH,
  [AREA_UNIT.SQUARE_FOOT]: SQUARE_FOOT,
  [AREA_UNIT.ACRE]: ACRE,
  [AREA_UNIT.SQUARE_MILE]: SQUARE_MILE,
};
