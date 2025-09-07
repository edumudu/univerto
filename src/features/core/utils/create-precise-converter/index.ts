import type { UnitScale } from '~/features/core/types/unit-scale';
import { Rational } from '~/features/core/utils/rational';

export function createPreciseConverter<S extends Record<string, UnitScale>, Unit extends keyof S>(scale: S) {
  function from(fromQuantity: number, fromUnit: Unit) {
    if (scale[fromUnit] === undefined) throw new Error(`Invalid "from" unit "${fromUnit.toString()}"`)

    function to(targetUnit: Unit) {
      if (scale[targetUnit] === undefined) throw new Error(`Invalid "to" unit "${targetUnit.toString()}"`)

      function convertToRational() {
        const fromExp = scale[fromUnit].exponent;
        const toExp = scale[targetUnit].exponent;
        const exponentDif = fromExp - toExp;

        const fromRational = Rational.fromNumber(fromQuantity)
        const factor = Rational.pow(scale[fromUnit].base, exponentDif);

        return fromRational.multiply(factor)
      }

      function convertToFraction() {
        const fromRational = convertToRational()

        return fromRational.toFraction()
      }

      function convert() {
        const result = convertToRational()

        return result.toNumber()
      }
      
      return {
        convertToRational,
        convertToFraction,
        convert,
      }
    }

    return {
      to,
    }
  }
  
  return{
    from
  }
}


