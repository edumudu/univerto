import { Rational } from '~/features/core/utils/rational';
import type { DataUnit } from './data-unit'
import { DATA_UNIT } from './data-unit';
import { scaleUnit } from '~/features/core/utils/scale-unit';

const BIT = new Rational(1, 1); 
const BYTE = scaleUnit(BIT, 8);

const KILOBYTE = scaleUnit(BYTE, 1_000);
const MEGABYTE = scaleUnit(KILOBYTE, 1_000);
const GIGABYTE = scaleUnit(MEGABYTE, 1_000);
const TERABYTE = scaleUnit(GIGABYTE, 1_000);
const PETABYTE = scaleUnit(TERABYTE, 1_000);
const EXABYTE = scaleUnit(PETABYTE, 1_000);

const KIBIBYTE = scaleUnit(BYTE, 1_024);
const MEBIBYTE = scaleUnit(MEGABYTE, 1_024);
const GIBIBYTE = scaleUnit(GIGABYTE, 1_024);
const TEBIBYTE = scaleUnit(TERABYTE, 1_024);
const PEBIBYTE = scaleUnit(PETABYTE, 1_024);
const EXBIBYTE = scaleUnit(PEBIBYTE, 1_024);


export const dataScale: Record<DataUnit, Rational> = {
  [DATA_UNIT.BIT]: BIT,
  [DATA_UNIT.BYTE]: BYTE,
  [DATA_UNIT.KILOBYTE]: KILOBYTE,
  [DATA_UNIT.KIBIBYTE]: KIBIBYTE,
  [DATA_UNIT.MEGABYTE]: MEGABYTE,
  [DATA_UNIT.MEBIBYTE]: MEBIBYTE,
  [DATA_UNIT.GIGABYTE]: GIGABYTE,
  [DATA_UNIT.GIBIBYTE]: GIBIBYTE,
  [DATA_UNIT.TERABYTE]: TERABYTE,
  [DATA_UNIT.TEBIBYTE]: TEBIBYTE,
  [DATA_UNIT.PETABYTE]: PETABYTE,
  [DATA_UNIT.PEBIBYTE]: PEBIBYTE,
  [DATA_UNIT.EXABYTE]: EXABYTE,
  [DATA_UNIT.EXBIBYTE]: EXBIBYTE,
};
