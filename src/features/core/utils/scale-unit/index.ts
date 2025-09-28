import { Rational } from '~/features/core/utils/rational';

export function scaleUnit(base: Rational, numerator: number, denominator: number = 1) {
  return base.multiply(new Rational(numerator, denominator));
}
