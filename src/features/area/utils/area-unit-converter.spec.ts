import {describe, expect, it} from 'vitest'
import { AreaUnitConverter } from './area-unit-converter'
import { AREA_UNIT } from '../constants/area-unit'

describe('AreaUnitConverter', () => {
  it.each([
    {
      from: {
        unit: AREA_UNIT.SQUARE_MILLIMETER,
        quantity: 100,
      },
      to: {
        unit: AREA_UNIT.SQUARE_CENTIMETER,
        quantity: 1,
      }
    },
    {
      from: {
        unit: AREA_UNIT.SQUARE_CENTIMETER,
        quantity: 10000,
      },
      to: {
        unit: AREA_UNIT.SQUARE_METER,
        quantity: 1,
      }
    },
    {
      from: {
        unit: AREA_UNIT.SQUARE_METER,
        quantity: 10000,
      },
      to: {
        unit: AREA_UNIT.HECTARE,
        quantity: 1,
      }
    },
    {
      from: {
        unit: AREA_UNIT.SQUARE_METER,
        quantity: 1000000,
      },
      to: {
        unit: AREA_UNIT.SQUARE_KILOMETER,
        quantity: 1,
      }
    },
    {
      from: {
        unit: AREA_UNIT.SQUARE_FOOT,
        quantity: 144,
      },
      to: {
        unit: AREA_UNIT.SQUARE_INCH,
        quantity: 20736,
      }
    },
    {
      from: {
        unit: AREA_UNIT.ACRE,
        quantity: 1,
      },
      to: {
        unit: AREA_UNIT.SQUARE_FOOT,
        quantity: 43560,
      }
    },
    {
      from: {
        unit: AREA_UNIT.SQUARE_MILE,
        quantity: 1,
      },
      to: {
        unit: AREA_UNIT.ACRE,
        quantity: 640,
      }
    },
  ])('should convert "$from.quantity" $from.unit to "$to.quantity" $to.unit', ({from, to}) => {
    const result = AreaUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBeCloseTo(to.quantity, 10)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12345
    const originalUnit = AREA_UNIT.SQUARE_MILLIMETER
    const converted = AreaUnitConverter.from(value, originalUnit).to(AREA_UNIT.SQUARE_METER).convert()
    const convertedBack = AreaUnitConverter.from(converted, AREA_UNIT.SQUARE_METER).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle large number conversions', () => {
    const result = AreaUnitConverter
      .from(1000000, AREA_UNIT.SQUARE_MILLIMETER)
      .to(AREA_UNIT.SQUARE_METER)
      .convert()

    expect(result).toBeCloseTo(1, 10) // 1,000,000 mm² = 1 m²
  })

  it('should correctly convert between metric and imperial units', () => {
    // 1 square meter ≈ 10.7639 square feet
    const result = AreaUnitConverter
      .from(1, AREA_UNIT.SQUARE_METER)
      .to(AREA_UNIT.SQUARE_FOOT)
      .convert()

    expect(result).toBeCloseTo(10.7639, 3)
  })

  it('should correctly convert square inches to square centimeters', () => {
    // 1 square inch = 6.4516 square centimeters
    const result = AreaUnitConverter
      .from(1, AREA_UNIT.SQUARE_INCH)
      .to(AREA_UNIT.SQUARE_CENTIMETER)
      .convert()

    expect(result).toBeCloseTo(6.4516, 4)
  })

  it('should correctly convert hectares to acres', () => {
    // 1 hectare ≈ 2.47105 acres
    const result = AreaUnitConverter
      .from(1, AREA_UNIT.HECTARE)
      .to(AREA_UNIT.ACRE)
      .convert()

    expect(result).toBeCloseTo(2.47105, 4)
  })

  it('should correctly convert square kilometers to square miles', () => {
    // 1 square kilometer ≈ 0.386102 square miles
    const result = AreaUnitConverter
      .from(1, AREA_UNIT.SQUARE_KILOMETER)
      .to(AREA_UNIT.SQUARE_MILE)
      .convert()

    expect(result).toBeCloseTo(0.386102, 5)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => AreaUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => AreaUnitConverter.from(1, AREA_UNIT.SQUARE_MILLIMETER).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = AreaUnitConverter.from(0, AREA_UNIT.SQUARE_MILLIMETER).to(AREA_UNIT.SQUARE_METER).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values', () => {
      const result = AreaUnitConverter.from(-2, AREA_UNIT.SQUARE_METER).to(AREA_UNIT.SQUARE_CENTIMETER).convert()

      expect(result).toBe(-20000)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = AreaUnitConverter.from(42, AREA_UNIT.SQUARE_METER).to(AREA_UNIT.SQUARE_METER).convert()

      expect(result).toBe(42)
    })
  }) 

  describe('real world conversions', () => {
    it('should correctly convert common area measurements', () => {
      // A standard football field is about 1.32 acres
      const footballFieldInSqFt = 57600 // 120 yards × 53.33 yards × 9 sq ft/sq yard
      const result = AreaUnitConverter
        .from(footballFieldInSqFt, AREA_UNIT.SQUARE_FOOT)
        .to(AREA_UNIT.ACRE)
        .convert()

      expect(result).toBeCloseTo(1.32, 2)
    })

    it('should convert property sizes correctly', () => {
      // A quarter acre lot
      const result = AreaUnitConverter
        .from(0.25, AREA_UNIT.ACRE)
        .to(AREA_UNIT.SQUARE_FOOT)
        .convert()

      expect(result).toBeCloseTo(10890, 0) // 43,560 / 4
    })

    it('should convert large areas correctly', () => {
      // Rhode Island is about 1,214 square miles
      const result = AreaUnitConverter
        .from(1214, AREA_UNIT.SQUARE_MILE)
        .to(AREA_UNIT.SQUARE_KILOMETER)
        .convert()

      expect(result).toBeCloseTo(3144, 0)
    })
  })
})
