import {describe, expect, it} from 'vitest'
import { MassUnitConverter } from './mass-unit-converter'
import { MASS_UNIT } from '../constants/mass-unit'

describe('MassUnitConverter', () => {
  it.each([
    {
      from: {
        unit: MASS_UNIT.MICROGRAM,
        quantity: 1,
      },
      to: {
        unit: MASS_UNIT.MILLIGRAM,
        quantity: 0.001,
      }
    },
    {
      from: {
        unit: MASS_UNIT.MILLIGRAM,
        quantity: 1,
      },
      to: {
        unit: MASS_UNIT.GRAM,
        quantity: 0.001,
      }
    },
    {
      from: {
        unit: MASS_UNIT.GRAM,
        quantity: 1000,
      },
      to: {
        unit: MASS_UNIT.KILOGRAM,
        quantity: 1,
      }
    },
    {
      from: {
        unit: MASS_UNIT.KILOGRAM,
        quantity: 1,
      },
      to: {
        unit: MASS_UNIT.METRIC_TON,
        quantity: 0.001
      }
    },
    {
      from: {
        unit: MASS_UNIT.POUND,
        quantity: 1,
      },
      to: {
        unit: MASS_UNIT.OUNCE,
        quantity: 16,
      }
    },
    {
      from: {
        unit: MASS_UNIT.STONE,
        quantity: 1,
      },
      to: {
        unit: MASS_UNIT.POUND,
        quantity: 14,
      }
    },
    {
      from: {
        unit: MASS_UNIT.SHORT_TON,
        quantity: 1,
      },
      to: {
        unit: MASS_UNIT.POUND,
        quantity: 2000,
      }
    },
    {
      from: {
        unit: MASS_UNIT.LONG_TON,
        quantity: 1,
      },
      to: {
        unit: MASS_UNIT.POUND,
        quantity: 2240,
      }
    },
  ])('should convert "$from.quantity" $from.unit to to "$to.quantity" $to.unit', ({from, to}) => {
    const result = MassUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBeCloseTo(to.quantity, 10)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12345
    const originalUnit = MASS_UNIT.MICROGRAM
    const converted = MassUnitConverter.from(value, originalUnit).to(MASS_UNIT.GRAM).convert()
    const convertedBack = MassUnitConverter.from(converted, MASS_UNIT.GRAM).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle large number conversions', () => {
    const result = MassUnitConverter
      .from(1000000, MASS_UNIT.MICROGRAM)
      .to(MASS_UNIT.GRAM)
      .convert()

    expect(result).toBe(1)
  })

  it('should correctly convert between metric and imperial units', () => {
    // 1 kilogram ≈ 2.20462 pounds
    const result = MassUnitConverter
      .from(1, MASS_UNIT.KILOGRAM)
      .to(MASS_UNIT.POUND)
      .convert()

    expect(result).toBeCloseTo(2.20462, 4)
  })

  it('should correctly convert ounces to grams', () => {
    // 1 ounce = 28.349523125 grams
    const result = MassUnitConverter
      .from(1, MASS_UNIT.OUNCE)
      .to(MASS_UNIT.GRAM)
      .convert()

    expect(result).toBeCloseTo(28.349523125, 8)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => MassUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => MassUnitConverter.from(1, MASS_UNIT.MICROGRAM).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = MassUnitConverter.from(0, MASS_UNIT.MICROGRAM).to(MASS_UNIT.MICROGRAM).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values', () => {
      const result = MassUnitConverter.from(-2, MASS_UNIT.MICROGRAM).to(MASS_UNIT.MICROGRAM).convert()

      expect(result).toBe(-2)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = MassUnitConverter.from(42, MASS_UNIT.MICROGRAM).to(MASS_UNIT.MICROGRAM).convert()

      expect(result).toBe(42)
    })
  }) 
})
