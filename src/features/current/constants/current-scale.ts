import { Rational } from '~/features/core/utils/rational';
import type { CurrentUnit } from './current-unit'
import { CURRENT_UNIT } from './current-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const AMPERE = new Rational(1, 1); // Base

const MILLIAMPERE = scaleUnit(AMPERE, 1, 1e3);
const KILOAMPERE = scaleUnit(AMPERE, 1e3);

export const currentScale: Record<CurrentUnit, Rational> = {
  [CURRENT_UNIT.MILLIAMPERE]: MILLIAMPERE,
  [CURRENT_UNIT.AMPERE]:      AMPERE,
  [CURRENT_UNIT.KILOAMPERE]:  KILOAMPERE,
};

