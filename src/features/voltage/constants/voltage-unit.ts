export type VoltageUnit = (typeof VOLTAGE_UNIT)[keyof typeof VOLTAGE_UNIT];

export const VOLTAGE_UNIT = Object.freeze({
  MILLIVOLT: 'millivolt',
  VOLT: 'volt',
  KILOVOLT: 'kilovolt',
  MEGAVOLT: 'megavolt',
});
