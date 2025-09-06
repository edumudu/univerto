import { lengthScale } from '../constants/length-scale';
import type { LengthUnit } from '../constants/length-unit';

function from(fromQuantity: number, fromUnit: LengthUnit) {
  if (lengthScale[fromUnit] === undefined) throw new Error(`Invalid "from" unit "${fromUnit}"`)

  function to(targetUnit: LengthUnit) {
    if (lengthScale[targetUnit] === undefined) throw new Error(`Invalid "to" unit "${targetUnit}"`)

    function convert() {
      const fromInBase = fromQuantity * lengthScale[fromUnit]
      const result = fromInBase / lengthScale[targetUnit]

      return result
    }

    return {
      convert,
    };
  }

  return {
    to,
  };
}

export const LengthUnitConverter = {
  from,
};
