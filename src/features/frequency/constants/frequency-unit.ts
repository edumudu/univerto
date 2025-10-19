export type FrequencyUnit = (typeof FREQUENCY_UNIT)[keyof typeof FREQUENCY_UNIT];

export const FREQUENCY_UNIT = Object.freeze({
  MILLIHERTZ: 'millihertz',
  HERTZ: 'hertz',
  KILOHERTZ: 'kilohertz',
  MEGAHERTZ: 'megahertz',
  GIGAHERTZ: 'gigahertz',
  TERAHERTZ: 'terahertz',
  RPM: 'rpm',
  DEGREE_PER_SECOND: 'degree_per_second',
});

