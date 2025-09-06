export type SpeedUnit = (typeof SPEED_UNIT)[keyof typeof SPEED_UNIT];

export const SPEED_UNIT = Object.freeze({
  METER_PER_SECOND: 'meter_per_second',
  MILLIMETER_PER_HOUR: 'millimeter_per_hour',
  KILOMETER_PER_HOUR: 'kilometer_per_hour',
  MILE_PER_HOUR: 'mile_per_hour',
  KNOT: 'knot',
  FOOT_PER_SECOND: 'foot_per_second',
  INCH_PER_HOUR: 'inch_per_hour',
});
