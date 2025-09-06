import {describe, expect, it} from 'vitest'
import { VoltageUnitConverter } from './voltage-unit-converter'
import { VOLTAGE_UNIT } from '../constants/voltage-unit'

describe('VoltageUnitConverter', () => {
  it.each([
    {
      from: {
        unit: VOLTAGE_UNIT.VOLT,
        quantity: 1,
      },
      to: {
        unit: VOLTAGE_UNIT.MILLIVOLT,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: VOLTAGE_UNIT.MILLIVOLT,
        quantity: 1000,
      },
      to: {
        unit: VOLTAGE_UNIT.VOLT,
        quantity: 1,
      }
    },
    {
      from: {
        unit: VOLTAGE_UNIT.VOLT,
        quantity: 1000,
      },
      to: {
        unit: VOLTAGE_UNIT.KILOVOLT,
        quantity: 1,
      }
    },
    {
      from: {
        unit: VOLTAGE_UNIT.KILOVOLT,
        quantity: 1,
      },
      to: {
        unit: VOLTAGE_UNIT.VOLT,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: VOLTAGE_UNIT.KILOVOLT,
        quantity: 1,
      },
      to: {
        unit: VOLTAGE_UNIT.MILLIVOLT,
        quantity: 1000000,
      }
    },
    {
      from: {
        unit: VOLTAGE_UNIT.MEGAVOLT,
        quantity: 1,
      },
      to: {
        unit: VOLTAGE_UNIT.VOLT,
        quantity: 1000000,
      }
    },
    {
      from: {
        unit: VOLTAGE_UNIT.VOLT,
        quantity: 1000000,
      },
      to: {
        unit: VOLTAGE_UNIT.MEGAVOLT,
        quantity: 1,
      }
    },
    {
      from: {
        unit: VOLTAGE_UNIT.MEGAVOLT,
        quantity: 1,
      },
      to: {
        unit: VOLTAGE_UNIT.MILLIVOLT,
        quantity: 1000000000,
      }
    },
  ])('should convert "$from.quantity" $from.unit to "$to.quantity" $to.unit', ({from, to}) => {
    const result = VoltageUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBeCloseTo(to.quantity, 10)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12.5
    const originalUnit = VOLTAGE_UNIT.VOLT
    const converted = VoltageUnitConverter.from(value, originalUnit).to(VOLTAGE_UNIT.MILLIVOLT).convert()
    const convertedBack = VoltageUnitConverter.from(converted, VOLTAGE_UNIT.MILLIVOLT).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle household voltage conversions', () => {
    // US household voltage: 120V
    const result = VoltageUnitConverter
      .from(120, VOLTAGE_UNIT.VOLT)
      .to(VOLTAGE_UNIT.MILLIVOLT)
      .convert()

    expect(result).toBe(120000)
  })

  it('should correctly handle high voltage conversions', () => {
    // Power transmission line: 500kV
    const result = VoltageUnitConverter
      .from(500, VOLTAGE_UNIT.KILOVOLT)
      .to(VOLTAGE_UNIT.VOLT)
      .convert()

    expect(result).toBe(500000)
  })

  it('should correctly handle small signal voltages', () => {
    // Microphone signal: 2mV
    const result = VoltageUnitConverter
      .from(2, VOLTAGE_UNIT.MILLIVOLT)
      .to(VOLTAGE_UNIT.VOLT)
      .convert()

    expect(result).toBe(0.002)
  })

  it('should correctly handle battery voltages', () => {
    // Car battery: 12V to mV
    const result = VoltageUnitConverter
      .from(12, VOLTAGE_UNIT.VOLT)
      .to(VOLTAGE_UNIT.MILLIVOLT)
      .convert()

    expect(result).toBe(12000)
  })
  
  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => VoltageUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => VoltageUnitConverter.from(1, VOLTAGE_UNIT.VOLT).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = VoltageUnitConverter.from(0, VOLTAGE_UNIT.VOLT).to(VOLTAGE_UNIT.MILLIVOLT).convert()

      expect(result).toBe(0)
    })
    
    it('should handle negative values (indicating polarity)', () => {
      const result = VoltageUnitConverter.from(-5, VOLTAGE_UNIT.VOLT).to(VOLTAGE_UNIT.MILLIVOLT).convert()

      expect(result).toBe(-5000)
    }) 
    
    it('should return the same value when converting to the same unit', () => {
      const result = VoltageUnitConverter.from(42, VOLTAGE_UNIT.VOLT).to(VOLTAGE_UNIT.VOLT).convert()

      expect(result).toBe(42)
    })
  }) 

  describe('real world conversions', () => {
    it('should correctly convert common household voltages', () => {
      // European household voltage: 230V
      const result = VoltageUnitConverter
        .from(230, VOLTAGE_UNIT.VOLT)
        .to(VOLTAGE_UNIT.KILOVOLT)
        .convert()

      expect(result).toBe(0.23)
    })

    it('should correctly convert electronic component voltages', () => {
      // Logic level: 3.3V to mV
      const result = VoltageUnitConverter
        .from(3.3, VOLTAGE_UNIT.VOLT)
        .to(VOLTAGE_UNIT.MILLIVOLT)
        .convert()

      expect(result).toBeCloseTo(3300, 10)
    })

    it('should correctly convert power grid voltages', () => {
      // Distribution voltage: 11kV to V
      const result = VoltageUnitConverter
        .from(11, VOLTAGE_UNIT.KILOVOLT)
        .to(VOLTAGE_UNIT.VOLT)
        .convert()

      expect(result).toBe(11000)
    })

    it('should correctly convert lightning voltages', () => {
      // Lightning bolt: ~100MV
      const result = VoltageUnitConverter
        .from(100, VOLTAGE_UNIT.MEGAVOLT)
        .to(VOLTAGE_UNIT.VOLT)
        .convert()

      expect(result).toBe(100000000) // 100 million volts
    })

    it('should correctly convert precision measurements', () => {
      // Precision measurement: 1.234V to mV
      const result = VoltageUnitConverter
        .from(1.234, VOLTAGE_UNIT.VOLT)
        .to(VOLTAGE_UNIT.MILLIVOLT)
        .convert()

      expect(result).toBe(1234)
    })

    it('should correctly convert very high voltages', () => {
      // Van de Graaff generator: 10MV to kV
      const result = VoltageUnitConverter
        .from(10, VOLTAGE_UNIT.MEGAVOLT)
        .to(VOLTAGE_UNIT.KILOVOLT)
        .convert()

      expect(result).toBe(10000)
    })
  })
})
