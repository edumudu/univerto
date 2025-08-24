import {describe, expect, it} from 'vitest'
import { TimeUnitConverter } from './time-unit-converter'
import { TIME_UNIT } from '../constants/time-unit'

describe('TimeUnitConverter', () => {
  it.each([
    {
      from: {
        unit: TIME_UNIT.DECADE,
        quantity: 1,
      },
      to: {
        unit: TIME_UNIT.YEAR,
        quantity: 10,
      }
    },
    {
      from: {
        unit: TIME_UNIT.HOUR,
        quantity: 1,
      },
      to: {
        unit: TIME_UNIT.MILLISECOND,
        quantity: 1000 * 60 * 60,
      }
    },
    {
      from: {
        unit: TIME_UNIT.MILLISECOND,
        quantity: 1000 * 60 * 60,
      },
      to: {
        unit: TIME_UNIT.HOUR,
        quantity: 1,
      }
    },
    {
      from: {
        unit: TIME_UNIT.SECOND,
        quantity: 1,
      },
      to: {
        unit: TIME_UNIT.HOUR,
        quantity: 0.0002777777777777778
      }
    },
  ])('should convert "$from.quantity" $from.unit to to "$to.quantity" $to.unit', ({from, to}) => {
    const result = TimeUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBe(to.quantity)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12345
    const originalUnit = TIME_UNIT.SECOND
    const converted = TimeUnitConverter.from(value, originalUnit).to(TIME_UNIT.MILLISECOND).convert()
    const convertedBack = TimeUnitConverter.from(converted, TIME_UNIT.MILLISECOND).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle transitional overflow during conversion', () => {
    const result = TimeUnitConverter
      .from(Number.MAX_SAFE_INTEGER / 10, TIME_UNIT.DECADE)
      .to(TIME_UNIT.YEAR)
      .convert()

    expect(result).toBeCloseTo(Number.MAX_SAFE_INTEGER, 2)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => TimeUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => TimeUnitConverter.from(1, TIME_UNIT.SECOND).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = TimeUnitConverter.from(0, TIME_UNIT.HOUR).to(TIME_UNIT.SECOND).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values', () => {
      const result = TimeUnitConverter.from(-2, TIME_UNIT.MINUTE).to(TIME_UNIT.SECOND).convert()

      expect(result).toBe(-120)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = TimeUnitConverter.from(42, TIME_UNIT.DAY).to(TIME_UNIT.DAY).convert()

      expect(result).toBe(42)
    })
  }) 
})

