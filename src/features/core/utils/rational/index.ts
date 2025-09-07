export class Rational {
  private numerator: number
  private denominator: number

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator
    this.denominator = denominator
  }
  
  static fromNumber(number: number) {
    return new Rational(number, 1)
  }
  
  toNumber() {
    return this.numerator / this.denominator
  }

  toFraction() {
    return {
      numerator: this.numerator,
      denominator: this.denominator,
    }
  }

  multiply(other: Rational) {
    return new Rational(this.numerator * other.numerator, this.denominator * other.denominator)
  }

  divide(other: Rational) {
    return new Rational(this.numerator * other.denominator, this.denominator * other.numerator)
  }
  
  
  static pow(base: number, exp: number) {
    if (exp >= 0) {
      return new Rational(Math.pow(base, exp), 1);
    } else {
      return new Rational(1, Math.pow(base, -exp));
    }
  }
}
