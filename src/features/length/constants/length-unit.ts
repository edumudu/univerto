export type LengthUnit = (typeof LENGTH_UNIT)[keyof typeof LENGTH_UNIT];

export const LENGTH_UNIT = Object.freeze({
  NANOMETER: 'nanometer',
  MICROMETER: 'micrometer',
  MILLIMETER: 'millimeter',
  CENTIMETER: 'centimeter',
  METER: 'meter',
  KILOMETER: 'kilometer',

  INCH: 'inch',
  HAND: 'hand',
  FOOT: 'foot',
  YARD: 'yard',
  CHAIN: 'chain',
  FURLONG: 'furlong',
  MILE: 'mile',
  LEAGUE: 'league'
});
