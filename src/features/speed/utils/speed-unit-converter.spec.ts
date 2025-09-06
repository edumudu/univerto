import {describe, expect, it} from 'vitest'
import { SpeedUnitConverter } from './speed-unit-converter'
import { SPEED_UNIT } from '../constants/speed-unit'

describe('SpeedUnitConverter', () => {
  it.each([
    {
      from: {
        unit: SPEED_UNIT.METER_PER_SECOND,
        quantity: 1,
      },
      to: {
        unit: SPEED_UNIT.KILOMETER_PER_HOUR,
        quantity: 3.6,
      }
    },
    {
      from: {
        unit: SPEED_UNIT.KILOMETER_PER_HOUR,
        quantity: 100,
      },
      to: {
        unit: SPEED_UNIT.METER_PER_SECOND,
        quantity: 27.777777777777775,
      }
    },
    {
      from: {
        unit: SPEED_UNIT.MILE_PER_HOUR,
        quantity: 60,
      },
      to: {
        unit: SPEED_UNIT.KILOMETER_PER_HOUR,
        quantity: 96.56064,
      }
    },
    {
      from: {
        unit: SPEED_UNIT.KNOT,
        quantity: 1,
      },
      to: {
        unit: SPEED_UNIT.KILOMETER_PER_HOUR,
        quantity: 1.852,
      }
    },
    {
      from: {
        unit: SPEED_UNIT.FOOT_PER_SECOND,
        quantity: 1,
      },
      to: {
        unit: SPEED_UNIT.METER_PER_SECOND,
        quantity: 0.3048,
      }
    },
    {
      from: {
        unit: SPEED_UNIT.INCH_PER_HOUR,
        quantity: 3600,
      },
      to: {
        unit: SPEED_UNIT.INCH_PER_HOUR,
        quantity: 3600,
      }
    },
    {
      from: {
        unit: SPEED_UNIT.MILLIMETER_PER_HOUR,
        quantity: 1000,
      },
      to: {
        unit: SPEED_UNIT.METER_PER_SECOND,
        quantity: 0.000277778,
      }
    },
  ])('should convert "$from.quantity" $from.unit to "$to.quantity" $to.unit', ({from, to}) => {
    const result = SpeedUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBeCloseTo(to.quantity, 5)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 25.5
    const originalUnit = SPEED_UNIT.METER_PER_SECOND
    const converted = SpeedUnitConverter.from(value, originalUnit).to(SPEED_UNIT.KILOMETER_PER_HOUR).convert()
    const convertedBack = SpeedUnitConverter.from(converted, SPEED_UNIT.KILOMETER_PER_HOUR).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle common speed conversions', () => {
    // Speed limit: 55 mph ≈ 88.5 km/h
    const result = SpeedUnitConverter
      .from(55, SPEED_UNIT.MILE_PER_HOUR)
      .to(SPEED_UNIT.KILOMETER_PER_HOUR)
      .convert()

    expect(result).toBeCloseTo(88.5139, 3)
  })

  it('should correctly convert wind speeds', () => {
    // Hurricane force wind: 74 mph ≈ 64.3 knots
    const result = SpeedUnitConverter
      .from(74, SPEED_UNIT.MILE_PER_HOUR)
      .to(SPEED_UNIT.KNOT)
      .convert()

    expect(result).toBeCloseTo(64.3, 1)
  })

  it('should correctly convert running speeds', () => {
    // Marathon world record pace: ~5.69 m/s ≈ 20.5 km/h
    const result = SpeedUnitConverter
      .from(5.69, SPEED_UNIT.METER_PER_SECOND)
      .to(SPEED_UNIT.KILOMETER_PER_HOUR)
      .convert()

    expect(result).toBeCloseTo(20.484, 3)
  })

  it('should correctly convert very slow speeds', () => {
    // Snail speed: ~1 mm/h
    const result = SpeedUnitConverter
      .from(1, SPEED_UNIT.MILLIMETER_PER_HOUR)
      .to(SPEED_UNIT.METER_PER_SECOND)
      .convert()

    expect(result).toBeCloseTo(0.000000277778, 12)
  })

  it('should correctly convert aircraft speeds', () => {
    // Commercial aircraft cruise: ~250 m/s ≈ 900 km/h
    const result = SpeedUnitConverter
      .from(250, SPEED_UNIT.METER_PER_SECOND)
      .to(SPEED_UNIT.KILOMETER_PER_HOUR)
      .convert()

    expect(result).toBeCloseTo(900, 10)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => SpeedUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => SpeedUnitConverter.from(1, SPEED_UNIT.METER_PER_SECOND).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = SpeedUnitConverter.from(0, SPEED_UNIT.METER_PER_SECOND).to(SPEED_UNIT.KILOMETER_PER_HOUR).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values (indicating direction)', () => {
      const result = SpeedUnitConverter.from(-10, SPEED_UNIT.METER_PER_SECOND).to(SPEED_UNIT.KILOMETER_PER_HOUR).convert()

      expect(result).toBe(-36)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = SpeedUnitConverter.from(42, SPEED_UNIT.METER_PER_SECOND).to(SPEED_UNIT.METER_PER_SECOND).convert()

      expect(result).toBe(42)
    })
  }) 

  describe('real world conversions', () => {
    it('should correctly convert highway speeds', () => {
      // Highway speed: 70 mph ≈ 112.7 km/h
      const result = SpeedUnitConverter
        .from(70, SPEED_UNIT.MILE_PER_HOUR)
        .to(SPEED_UNIT.KILOMETER_PER_HOUR)
        .convert()

      expect(result).toBeCloseTo(112.654, 3)
    })

    it('should correctly convert sailing speeds', () => {
      // Good sailing wind: 15 knots ≈ 27.78 km/h
      const result = SpeedUnitConverter
        .from(15, SPEED_UNIT.KNOT)
        .to(SPEED_UNIT.KILOMETER_PER_HOUR)
        .convert()

      expect(result).toBeCloseTo(27.78, 2)
    })

    it('should correctly convert walking speeds', () => {
      // Average walking speed: 1.4 m/s ≈ 3.1 mph
      const result = SpeedUnitConverter
        .from(1.4, SPEED_UNIT.METER_PER_SECOND)
        .to(SPEED_UNIT.MILE_PER_HOUR)
        .convert()

      expect(result).toBeCloseTo(3.13, 2)
    })

    it('should correctly convert sound speed', () => {
      // Speed of sound: ~343 m/s ≈ 1235 km/h
      const result = SpeedUnitConverter
        .from(343, SPEED_UNIT.METER_PER_SECOND)
        .to(SPEED_UNIT.KILOMETER_PER_HOUR)
        .convert()

      expect(result).toBeCloseTo(1234.8, 1)
    })

    it('should correctly convert very precise measurements', () => {
      // Scientific measurement: 1 ft/s to mm/h
      const result = SpeedUnitConverter
        .from(1, SPEED_UNIT.FOOT_PER_SECOND)
        .to(SPEED_UNIT.MILLIMETER_PER_HOUR)
        .convert()

      expect(result).toBeCloseTo(1097279, 0) // 1 ft/s ≈ 1,097,279 mm/h
    })
  })
})
