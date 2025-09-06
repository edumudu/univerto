export type AreaUnit = (typeof AREA_UNIT)[keyof typeof AREA_UNIT];

export const AREA_UNIT = Object.freeze({
  // Metric units
  SQUARE_MILLIMETER: 'square_millimeter',
  SQUARE_CENTIMETER: 'square_centimeter', 
  SQUARE_METER: 'square_meter',
  HECTARE: 'hectare',
  SQUARE_KILOMETER: 'square_kilometer',
  
  // Imperial/US units
  SQUARE_INCH: 'square_inch',
  SQUARE_FOOT: 'square_foot',
  ACRE: 'acre',
  SQUARE_MILE: 'square_mile',
});
