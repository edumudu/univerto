import { timeScale } from '../constants/time-scale';
import type { TimeUnit } from '../constants/time-unit';

function from(fromQuantity: number, fromUnit: TimeUnit) {
  if (timeScale[fromUnit] === undefined) throw new Error(`Invalid "from" unit "${fromUnit}"`)

  function to(targetUnit: TimeUnit) {
    if (timeScale[targetUnit] === undefined) throw new Error(`Invalid "to" unit "${targetUnit}"`)

    function convert() {
      const fromInBase = fromQuantity * timeScale[fromUnit]
      const result = fromInBase / timeScale[targetUnit]

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

export const TimeUnitConverter = {
  from,
};

