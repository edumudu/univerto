import { Rational } from '~/features/core/utils/rational';
import type { MassUnit } from './mass-unit'
import { MASS_UNIT } from './mass-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const GRAM = new Rational(1, 1);

const MICROGRAM = scaleUnit(GRAM, 1, 1e6);
const MILLIGRAM = scaleUnit(GRAM, 1, 1e3);
const KILOGRAM = scaleUnit(GRAM, 1, 1e-3);
const METRIC_TON = scaleUnit(KILOGRAM, 1, 1e-3);

const OUNCE = scaleUnit(GRAM, 28349523125, 1e9);
const POUND = scaleUnit(OUNCE, 16) 
const STONE = scaleUnit(POUND, 14) 
const SHORT_TON = scaleUnit(POUND, 2_000);
const LONG_TON = scaleUnit(POUND, 2_240);

export const massScale: Record<MassUnit, Rational> = {
  [MASS_UNIT.MICROGRAM]: MICROGRAM,
  [MASS_UNIT.MILLIGRAM]: MILLIGRAM,
  [MASS_UNIT.GRAM]: GRAM,
  [MASS_UNIT.KILOGRAM]: KILOGRAM,
  [MASS_UNIT.METRIC_TON]: METRIC_TON,
  [MASS_UNIT.OUNCE]: OUNCE,
  [MASS_UNIT.POUND]: POUND,
  [MASS_UNIT.STONE]: STONE,
  [MASS_UNIT.SHORT_TON]: SHORT_TON,
  [MASS_UNIT.LONG_TON]: LONG_TON,
};
