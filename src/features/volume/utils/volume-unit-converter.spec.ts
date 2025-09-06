import {describe, expect, it} from 'vitest'
import { VolumeUnitConverter } from './volume-unit-converter'
import { VOLUME_UNIT } from '../constants/volume-unit'

describe('VolumeUnitConverter', () => {
  it.each([
    {
      from: {
        unit: VOLUME_UNIT.CUBIC_MILLIMETER,
        quantity: 1000,
      },
      to: {
        unit: VOLUME_UNIT.CUBIC_CENTIMETER,
        quantity: 1,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.MILLILITER,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.CUBIC_CENTIMETER,
        quantity: 1,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.LITER,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.MILLILITER,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.KILOLITER,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.LITER,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.CUBIC_METER,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.LITER,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.TABLESPOON,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.TEASPOON,
        quantity: 3,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.FLUID_OUNCE,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.TABLESPOON,
        quantity: 2,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.CUP,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.FLUID_OUNCE,
        quantity: 8,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.PINT,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.CUP,
        quantity: 2,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.QUART,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.PINT,
        quantity: 2,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.GALLON,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.QUART,
        quantity: 4,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.CUBIC_FOOT,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.CUBIC_INCH,
        quantity: 1728,
      }
    },
    {
      from: {
        unit: VOLUME_UNIT.CUBIC_YARD,
        quantity: 1,
      },
      to: {
        unit: VOLUME_UNIT.CUBIC_FOOT,
        quantity: 27,
      }
    },
  ])('should convert "$from.quantity" $from.unit to "$to.quantity" $to.unit', ({from, to}) => {
    const result = VolumeUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBeCloseTo(to.quantity, 10)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12345
    const originalUnit = VOLUME_UNIT.CUBIC_MILLIMETER
    const converted = VolumeUnitConverter.from(value, originalUnit).to(VOLUME_UNIT.LITER).convert()
    const convertedBack = VolumeUnitConverter.from(converted, VOLUME_UNIT.LITER).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle large number conversions', () => {
    const result = VolumeUnitConverter
      .from(1000000, VOLUME_UNIT.CUBIC_MILLIMETER)
      .to(VOLUME_UNIT.LITER)
      .convert()

    expect(result).toBe(1)
  })

  it('should correctly convert between metric and imperial units', () => {
    // 1 liter ≈ 0.264172 gallons
    const result = VolumeUnitConverter
      .from(1, VOLUME_UNIT.LITER)
      .to(VOLUME_UNIT.GALLON)
      .convert()

    expect(result).toBeCloseTo(0.264172, 4)
  })

  it('should correctly convert gallons to liters', () => {
    // 1 gallon ≈ 3.78541 liters
    const result = VolumeUnitConverter
      .from(1, VOLUME_UNIT.GALLON)
      .to(VOLUME_UNIT.LITER)
      .convert()

    expect(result).toBeCloseTo(3.78541, 4)
  })

  it('should correctly convert teaspoons to milliliters', () => {
    // 1 tsp ≈ 4.929 ml
    const result = VolumeUnitConverter
      .from(1, VOLUME_UNIT.TEASPOON)
      .to(VOLUME_UNIT.MILLILITER)
      .convert()

    expect(result).toBeCloseTo(4.92892159375, 8)
  })

  it('should correctly convert cubic inches to cubic centimeters', () => {
    // 1 in³ ≈ 16.387 cm³
    const result = VolumeUnitConverter
      .from(1, VOLUME_UNIT.CUBIC_INCH)
      .to(VOLUME_UNIT.CUBIC_CENTIMETER)
      .convert()

    expect(result).toBeCloseTo(16.387064, 6)
  })

  it('should correctly convert cubic meters to cubic feet', () => {
    // 1 m³ ≈ 35.3147 ft³
    const result = VolumeUnitConverter
      .from(1, VOLUME_UNIT.CUBIC_METER)
      .to(VOLUME_UNIT.CUBIC_FOOT)
      .convert()

    expect(result).toBeCloseTo(35.3147, 3)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => VolumeUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => VolumeUnitConverter.from(1, VOLUME_UNIT.CUBIC_MILLIMETER).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = VolumeUnitConverter.from(0, VOLUME_UNIT.CUBIC_MILLIMETER).to(VOLUME_UNIT.LITER).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values', () => {
      const result = VolumeUnitConverter.from(-2, VOLUME_UNIT.LITER).to(VOLUME_UNIT.MILLILITER).convert()

      expect(result).toBe(-2000)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = VolumeUnitConverter.from(42, VOLUME_UNIT.LITER).to(VOLUME_UNIT.LITER).convert()

      expect(result).toBe(42)
    })
  }) 

  describe('cooking measurements', () => {
    it('should correctly convert cooking measurements', () => {
      // Common cooking conversions
      expect(
        VolumeUnitConverter.from(1, VOLUME_UNIT.CUP).to(VOLUME_UNIT.TABLESPOON).convert()
      ).toBeCloseTo(16, 10) // 1 cup = 16 tablespoons
      
      expect(
        VolumeUnitConverter.from(1, VOLUME_UNIT.TABLESPOON).to(VOLUME_UNIT.TEASPOON).convert()
      ).toBeCloseTo(3, 10) // 1 tablespoon = 3 teaspoons
      
      expect(
        VolumeUnitConverter.from(1, VOLUME_UNIT.PINT).to(VOLUME_UNIT.FLUID_OUNCE).convert()
      ).toBeCloseTo(16, 10) // 1 pint = 16 fluid ounces
    })
  })

  describe('large scale conversions', () => {
    it('should handle very large volumes', () => {
      const result = VolumeUnitConverter
        .from(1, VOLUME_UNIT.CUBIC_KILOMETER)
        .to(VOLUME_UNIT.GIGALITER)
        .convert()

      expect(result).toBeCloseTo(1000, 6) // 1 km³ = 1,000 Gl (1 km³ = 10^9 m³ = 10^12 L = 1,000 GL)
    })
  })
})
