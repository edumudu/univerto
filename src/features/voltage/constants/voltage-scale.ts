import type { VoltageUnit } from './voltage-unit'
import { VOLTAGE_UNIT } from './voltage-unit';

const VOLT = 1;
const MILLIVOLT = 0.001 * VOLT; 
const KILOVOLT = 1000 * VOLT; 
const MEGAVOLT = 1_000_000 * VOLT; 

export const voltageScale: Record<VoltageUnit, number> = {
  [VOLTAGE_UNIT.MILLIVOLT]: MILLIVOLT,
  [VOLTAGE_UNIT.VOLT]: VOLT,
  [VOLTAGE_UNIT.KILOVOLT]: KILOVOLT,
  [VOLTAGE_UNIT.MEGAVOLT]: MEGAVOLT,
};
