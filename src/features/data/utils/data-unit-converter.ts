import { dataScale } from '../constants/data-scale';
import type { DataUnit } from '../constants/data-unit';

function from(fromQuantity: number, fromUnit: DataUnit) {
  if (dataScale[fromUnit] === undefined) throw new Error(`Invalid "from" unit "${fromUnit}"`)

  function to(targetUnit: DataUnit) {
    if (dataScale[targetUnit] === undefined) throw new Error(`Invalid "to" unit "${targetUnit}"`)

    function convert() {
      const fromInBase = fromQuantity * dataScale[fromUnit]
      const result = fromInBase / dataScale[targetUnit]

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

export const DataUnitConverter = {
  from,
};
