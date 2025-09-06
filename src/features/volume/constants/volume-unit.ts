export type VolumeUnit = (typeof VOLUME_UNIT)[keyof typeof VOLUME_UNIT];

export const VOLUME_UNIT = Object.freeze({
  // Metric units
  CUBIC_MILLIMETER: 'cubic_millimeter', 
  CUBIC_CENTIMETER: 'cubic_centimeter', 
  CUBIC_METER: 'cubic_meter', 
  CUBIC_KILOMETER: 'cubic_kilometer', 
  MILLILITER: 'milliliter', 
  LITER: 'liter', 
  KILOLITER: 'kiloliter', 
  MEGALITER: 'megaliter', 
  GIGALITER: 'gigaliter', 
  
  // Imperial/US units
  CUBIC_INCH: 'cubic_inch', 
  CUBIC_FOOT: 'cubic_foot', 
  CUBIC_YARD: 'cubic_yard', 
  TEASPOON: 'teaspoon', 
  TABLESPOON: 'tablespoon', 
  FLUID_OUNCE: 'fluid_ounce',
  CUP: 'cup',
  PINT: 'pint', 
  QUART: 'quart', 
  GALLON: 'gallon', 
});
