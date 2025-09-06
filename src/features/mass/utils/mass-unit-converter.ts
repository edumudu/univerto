import { massScale } from '../constants/mass-scale';
import type { MassUnit } from '../constants/mass-unit';

function from(fromQuantity: number, fromUnit: MassUnit) {
  if (massScale[fromUnit] === undefined) throw new Error(`Invalid "from" unit "${fromUnit}"`)

  function to(targetUnit: MassUnit) {
    if (massScale[targetUnit] === undefined) throw new Error(`Invalid "to" unit "${targetUnit}"`)

    function convert() {
      const fromInBase = fromQuantity * massScale[fromUnit]
      const result = fromInBase / massScale[targetUnit]

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

export const MassUnitConverter = {
  from,
};
