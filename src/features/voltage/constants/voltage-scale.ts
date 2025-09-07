import type { VoltageUnit } from './voltage-unit'
import { VOLTAGE_UNIT } from './voltage-unit';
import type { UnitScale } from '~/features/core/types/unit-scale';

export const voltageScale: Record<VoltageUnit, UnitScale> = {
  [VOLTAGE_UNIT.MILLIVOLT]: { base: 10, exponent: -3 },
  [VOLTAGE_UNIT.VOLT]:      { base: 10, exponent: 0 },
  [VOLTAGE_UNIT.KILOVOLT]:  { base: 10, exponent: 3 },
  [VOLTAGE_UNIT.MEGAVOLT]:  { base: 10, exponent: 6 },
};
