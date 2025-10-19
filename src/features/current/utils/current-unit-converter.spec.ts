import {describe, expect, it} from 'vitest'
import { CurrentUnitConverter } from './current-unit-converter'
import { CURRENT_UNIT } from '../constants/current-unit'

describe('CurrentUnitConverter', () => {
  it.each([
    {
      from: {
        unit: CURRENT_UNIT.AMPERE,
        quantity: 1,
      },
      to: {
        unit: CURRENT_UNIT.MILLIAMPERE,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: CURRENT_UNIT.MILLIAMPERE,
        quantity: 1000,
      },
      to: {
        unit: CURRENT_UNIT.AMPERE,
        quantity: 1,
      }
    },
    {
      from: {
        unit: CURRENT_UNIT.AMPERE,
        quantity: 1000,
      },
      to: {
        unit: CURRENT_UNIT.KILOAMPERE,
        quantity: 1,
      }
    },
    {
      from: {
        unit: CURRENT_UNIT.KILOAMPERE,
        quantity: 1,
      },
      to: {
        unit: CURRENT_UNIT.AMPERE,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: CURRENT_UNIT.KILOAMPERE,
        quantity: 1,
      },
      to: {
        unit: CURRENT_UNIT.MILLIAMPERE,
        quantity: 1000000,
      }
    },
  ])('should convert "$from.quantity" $from.unit to "$to.quantity" $to.unit', ({from, to}) => {
    const result = CurrentUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBeCloseTo(to.quantity, 10)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12.5
    const originalUnit = CURRENT_UNIT.AMPERE
    const converted = CurrentUnitConverter.from(value, originalUnit).to(CURRENT_UNIT.MILLIAMPERE).convert()
    const convertedBack = CurrentUnitConverter.from(converted, CURRENT_UNIT.MILLIAMPERE).to(originalUnit).convert()

    expect(convertedBack).toBe(value) 
  })
  
  it('should correctly handle household current conversions', () => {
    const result = CurrentUnitConverter
      .from(15, CURRENT_UNIT.AMPERE)
      .to(CURRENT_UNIT.MILLIAMPERE)
      .convert()

    expect(result).toBe(15000)
  })

  it('should correctly handle LED current', () => {
    const result = CurrentUnitConverter
      .from(20, CURRENT_UNIT.MILLIAMPERE)
      .to(CURRENT_UNIT.AMPERE)
      .convert()

    expect(result).toBe(0.02)
  })

  it('should correctly handle battery charge current', () => {
    const result = CurrentUnitConverter
      .from(2, CURRENT_UNIT.AMPERE)
      .to(CURRENT_UNIT.MILLIAMPERE)
      .convert()

    expect(result).toBe(2000)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => CurrentUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => CurrentUnitConverter.from(1, CURRENT_UNIT.AMPERE).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = CurrentUnitConverter.from(0, CURRENT_UNIT.AMPERE).to(CURRENT_UNIT.MILLIAMPERE).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values (indicating direction)', () => {
      const result = CurrentUnitConverter.from(-5, CURRENT_UNIT.AMPERE).to(CURRENT_UNIT.MILLIAMPERE).convert()

      expect(result).toBe(-5000)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = CurrentUnitConverter.from(42, CURRENT_UNIT.AMPERE).to(CURRENT_UNIT.AMPERE).convert()

      expect(result).toBe(42)
    })
  }) 

  describe('real world conversions', () => {
    it('should correctly convert smartphone charging current', () => {
      const result = CurrentUnitConverter
        .from(3, CURRENT_UNIT.AMPERE)
        .to(CURRENT_UNIT.MILLIAMPERE)
        .convert()

      expect(result).toBe(3000)
    })


    it('should correctly convert electric motor current', () => {
      const result = CurrentUnitConverter
        .from(500, CURRENT_UNIT.MILLIAMPERE)
        .to(CURRENT_UNIT.AMPERE)
        .convert()

      expect(result).toBe(0.5)
    })

    it('should correctly convert industrial current', () => {
      const result = CurrentUnitConverter
        .from(2, CURRENT_UNIT.KILOAMPERE)
        .to(CURRENT_UNIT.AMPERE)
        .convert()

      expect(result).toBe(2000)
    })

    it('should correctly convert precision measurements', () => {
      const result = CurrentUnitConverter
        .from(1.234, CURRENT_UNIT.AMPERE)
        .to(CURRENT_UNIT.MILLIAMPERE)
        .convert()

      expect(result).toBe(1234)
    })

    it('should correctly convert car starter motor current', () => {
      const result = CurrentUnitConverter
        .from(200, CURRENT_UNIT.AMPERE)
        .to(CURRENT_UNIT.KILOAMPERE)
        .convert()

      expect(result).toBe(0.2)
    })

    it('should correctly convert laptop charging current', () => {
      const result = CurrentUnitConverter
        .from(3.25, CURRENT_UNIT.AMPERE)
        .to(CURRENT_UNIT.MILLIAMPERE)
        .convert()

      expect(result).toBe(3250)
    })

    it('should correctly convert welding machine current', () => {
      const result = CurrentUnitConverter
        .from(150, CURRENT_UNIT.AMPERE)
        .to(CURRENT_UNIT.KILOAMPERE)
        .convert()

      expect(result).toBe(0.15)
    })

  })
})

