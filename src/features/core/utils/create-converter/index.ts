export function createConverter<Scale extends Record<string, number>, Unit extends keyof Scale>(scale: Scale) {
  function from (fromQuantity: number, fromUnit: Unit) {
    if (scale[fromUnit] === undefined) throw new Error(`Invalid "from" unit "${fromUnit.toString()}"`)

    function to(targetUnit: Unit) {
      if (scale[targetUnit] === undefined) throw new Error(`Invalid "to" unit "${targetUnit.toString()}"`)
      
      function convert() {
        const fromInBase = fromQuantity * scale[fromUnit]
        const result = fromInBase / scale[targetUnit]

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
  
  return {
    from,
  }
}
