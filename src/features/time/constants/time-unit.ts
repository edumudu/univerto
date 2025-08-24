export type TimeUnit = (typeof TIME_UNIT)[keyof typeof TIME_UNIT];

export const TIME_UNIT = Object.freeze({
  NANOSECOND: 'nanosecond',
  MICROSECOND: 'microsecond',
  MILLISECOND: 'millisecond',
  SECOND: 'second',
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  DECADE: 'decade',
});
