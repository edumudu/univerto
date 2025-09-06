export type DataUnit = (typeof DATA_UNIT)[keyof typeof DATA_UNIT];

export const DATA_UNIT = Object.freeze({
  BIT: 'bit',
  BYTE: 'byte',
  KILOBYTE: 'kilobyte',
  KIBIBYTE: 'kibibyte',
  MEGABYTE: 'megabyte',
  MEBIBYTE: 'mebibyte',
  GIGABYTE: 'gigabyte',
  GIBIBYTE: 'gibibyte',
  TERABYTE: 'terabyte',
  TEBIBYTE: 'tebibyte',
  PETABYTE: 'petabyte',
  PEBIBYTE: 'pebibyte',
  EXABYTE: 'exabyte',
  EXBIBYTE: 'exbibyte'
});
