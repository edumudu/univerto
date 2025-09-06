import {describe, expect, it} from 'vitest'
import { LengthUnitConverter } from './length-unit-converter'
import { LENGTH_UNIT } from '../constants/length-unit'

describe('LengthUnitConverter', () => {
  it.each([
    {
      from: {
        unit: LENGTH_UNIT.NANOMETER,
        quantity: 1,
      },
      to: {
        unit: LENGTH_UNIT.MICROMETER,
        quantity: 0.001,
      }
    },
    {
      from: {
        unit: LENGTH_UNIT.MILLIMETER,
        quantity: 1,
      },
      to: {
        unit: LENGTH_UNIT.CENTIMETER,
        quantity: 0.1,
      }
    },
    {
      from: {
        unit: LENGTH_UNIT.CENTIMETER,
        quantity: 100,
      },
      to: {
        unit: LENGTH_UNIT.METER,
        quantity: 1,
      }
    },
    {
      from: {
        unit: LENGTH_UNIT.METER,
        quantity: 1,
      },
      to: {
        unit: LENGTH_UNIT.KILOMETER,
        quantity: 0.001
      }
    },
  ])('should convert "$from.quantity" $from.unit to to "$to.quantity" $to.unit', ({from, to}) => {
    const result = LengthUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBe(to.quantity)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12345
    const originalUnit = LENGTH_UNIT.NANOMETER
    const converted = LengthUnitConverter.from(value, originalUnit).to(LENGTH_UNIT.MILLIMETER).convert()
    const convertedBack = LengthUnitConverter.from(converted, LENGTH_UNIT.MILLIMETER).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle large number conversions', () => {
    const result = LengthUnitConverter
      .from(1000000, LENGTH_UNIT.NANOMETER)
      .to(LENGTH_UNIT.MILLIMETER)
      .convert()

    expect(result).toBe(1)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => LengthUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => LengthUnitConverter.from(1, LENGTH_UNIT.NANOMETER).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = LengthUnitConverter.from(0, LENGTH_UNIT.NANOMETER).to(LENGTH_UNIT.NANOMETER).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values', () => {
      const result = LengthUnitConverter.from(-2, LENGTH_UNIT.NANOMETER).to(LENGTH_UNIT.NANOMETER).convert()

      expect(result).toBe(-2)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = LengthUnitConverter.from(42, LENGTH_UNIT.NANOMETER).to(LENGTH_UNIT.NANOMETER).convert()

      expect(result).toBe(42)
    })
  }) 
})

