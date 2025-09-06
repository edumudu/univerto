export type MassUnit = (typeof MASS_UNIT)[keyof typeof MASS_UNIT];

export const MASS_UNIT = Object.freeze({
  MICROGRAM: 'microgram',
  MILLIGRAM: 'milligram',
  GRAM: 'gram',
  KILOGRAM: 'kilogram',
  METRIC_TON: 'metric_ton',
  OUNCE: 'ounce',
  POUND: 'pound',
  STONE: 'stone',
  SHORT_TON: 'short_ton',
  LONG_TON: 'long_ton',
});
