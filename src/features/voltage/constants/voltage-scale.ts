import { Rational } from '~/features/core/utils/rational';
import type { VoltageUnit } from './voltage-unit'
import { VOLTAGE_UNIT } from './voltage-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const VOLT = new Rational(1, 1); // Base

const MILLIVOLT = scaleUnit(VOLT, 1, 1e3);
const KILOVOLT = scaleUnit(VOLT, 1e3);
const MEGAVOLT = scaleUnit(KILOVOLT, 1e3);

export const voltageScale: Record<VoltageUnit, Rational> = {
  [VOLTAGE_UNIT.MILLIVOLT]: MILLIVOLT,
  [VOLTAGE_UNIT.VOLT]:      VOLT,
  [VOLTAGE_UNIT.KILOVOLT]:  KILOVOLT,
  [VOLTAGE_UNIT.MEGAVOLT]:  MEGAVOLT,
};
