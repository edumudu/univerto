import {describe, expect, it} from 'vitest'
import { DataUnitConverter } from './data-unit-converter'
import { DATA_UNIT } from '../constants/data-unit'

describe('DataUnitConverter', () => {
  it.each([
    {
      from: {
        unit: DATA_UNIT.BIT,
        quantity: 1,
      },
      to: {
        unit: DATA_UNIT.BYTE,
        quantity: 0.125,
      }
    },
    {
      from: {
        unit: DATA_UNIT.BYTE,
        quantity: 1,
      },
      to: {
        unit: DATA_UNIT.KILOBYTE,
        quantity: 0.001,
      }
    },
    {
      from: {
        unit: DATA_UNIT.KILOBYTE,
        quantity: 100,
      },
      to: {
        unit: DATA_UNIT.MEGABYTE,
        quantity: 0.1,
      }
    },
    {
      from: {
        unit: DATA_UNIT.MEGABYTE,
        quantity: 1,
      },
      to: {
        unit: DATA_UNIT.GIGABYTE,
        quantity: 0.001
      }
    },
  ])('should convert "$from.quantity" $from.unit to to "$to.quantity" $to.unit', ({from, to}) => {
    const result = DataUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBe(to.quantity)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12345
    const originalUnit = DATA_UNIT.BIT
    const converted = DataUnitConverter.from(value, originalUnit).to(DATA_UNIT.BYTE).convert()
    const convertedBack = DataUnitConverter.from(converted, DATA_UNIT.BYTE).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle large number conversions', () => {
    const result = DataUnitConverter
      .from(1000000, DATA_UNIT.BIT)
      .to(DATA_UNIT.BYTE)
      .convert()

    expect(result).toBe(125000)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => DataUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => DataUnitConverter.from(1, DATA_UNIT.BIT).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = DataUnitConverter.from(0, DATA_UNIT.BIT).to(DATA_UNIT.BIT).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values', () => {
      const result = DataUnitConverter.from(-2, DATA_UNIT.BIT).to(DATA_UNIT.BIT).convert()

      expect(result).toBe(-2)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = DataUnitConverter.from(42, DATA_UNIT.BIT).to(DATA_UNIT.BIT).convert()

      expect(result).toBe(42)
    })
  }) 
})

