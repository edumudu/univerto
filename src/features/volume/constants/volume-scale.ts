import { Rational } from '~/features/core/utils/rational';
import type { VolumeUnit } from './volume-unit'
import { VOLUME_UNIT } from './volume-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const CUBIC_METER = new Rational(1, 1); // Base

const CUBIC_MILLIMETER = scaleUnit(CUBIC_METER, 1, 1e9);
const CUBIC_CENTIMETER = scaleUnit(CUBIC_METER, 1, 1e6); 
const CUBIC_KILOMETER = scaleUnit(CUBIC_METER, 1e9); 

const LITER = scaleUnit(CUBIC_METER, 1, 1e3); 
const MILLILITER = scaleUnit(LITER, 1, 1e3); 
const KILOLITER = scaleUnit(LITER, 1e3); 
const MEGALITER = scaleUnit(KILOLITER, 1e3); 
const GIGALITER = scaleUnit(MEGALITER, 1e3); 

const CUBIC_INCH = scaleUnit(CUBIC_CENTIMETER, 16387064, 1_000_000);
const CUBIC_FOOT = scaleUnit(CUBIC_INCH, 1728); 
const CUBIC_YARD = scaleUnit(CUBIC_FOOT, 27); 

const TEASPOON = scaleUnit(CUBIC_METER, 492892159375, 1e17);
const TABLESPOON = scaleUnit(TEASPOON, 3); 
const FLUID_OUNCE = scaleUnit(TABLESPOON, 2); 
const CUP = scaleUnit(FLUID_OUNCE, 8); 
const PINT = scaleUnit(CUP, 2); 
const QUART = scaleUnit(PINT, 2); 
const GALLON = scaleUnit(QUART, 4); 

export const volumeScale: Record<VolumeUnit, Rational> = {
  [VOLUME_UNIT.CUBIC_MILLIMETER]: CUBIC_MILLIMETER,
  [VOLUME_UNIT.CUBIC_CENTIMETER]: CUBIC_CENTIMETER,
  [VOLUME_UNIT.MILLILITER]: MILLILITER,
  [VOLUME_UNIT.LITER]: LITER,
  [VOLUME_UNIT.KILOLITER]: KILOLITER,
  [VOLUME_UNIT.MEGALITER]: MEGALITER,
  [VOLUME_UNIT.GIGALITER]: GIGALITER,
  [VOLUME_UNIT.CUBIC_METER]: CUBIC_METER,
  [VOLUME_UNIT.CUBIC_KILOMETER]: CUBIC_KILOMETER,
  [VOLUME_UNIT.TEASPOON]: TEASPOON,
  [VOLUME_UNIT.TABLESPOON]: TABLESPOON,
  [VOLUME_UNIT.CUBIC_INCH]: CUBIC_INCH,
  [VOLUME_UNIT.FLUID_OUNCE]: FLUID_OUNCE,
  [VOLUME_UNIT.CUP]: CUP,
  [VOLUME_UNIT.PINT]: PINT,
  [VOLUME_UNIT.QUART]: QUART,
  [VOLUME_UNIT.GALLON]: GALLON,
  [VOLUME_UNIT.CUBIC_FOOT]: CUBIC_FOOT,
  [VOLUME_UNIT.CUBIC_YARD]: CUBIC_YARD,
};
