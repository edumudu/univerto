export type CurrentUnit = (typeof CURRENT_UNIT)[keyof typeof CURRENT_UNIT];

export const CURRENT_UNIT = Object.freeze({
  MILLIAMPERE: 'milliampere',
  AMPERE: 'ampere',
  KILOAMPERE: 'kiloampere',
});

