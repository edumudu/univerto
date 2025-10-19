import {describe, expect, it} from 'vitest'
import { FrequencyUnitConverter } from './frequency-unit-converter'
import { FREQUENCY_UNIT } from '../constants/frequency-unit'

describe('FrequencyUnitConverter', () => {
  it.each([
    {
      from: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1,
      },
      to: {
        unit: FREQUENCY_UNIT.MILLIHERTZ,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.MILLIHERTZ,
        quantity: 1000,
      },
      to: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1000,
      },
      to: {
        unit: FREQUENCY_UNIT.KILOHERTZ,
        quantity: 1,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.KILOHERTZ,
        quantity: 1,
      },
      to: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1000,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.KILOHERTZ,
        quantity: 1000,
      },
      to: {
        unit: FREQUENCY_UNIT.MEGAHERTZ,
        quantity: 1,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.MEGAHERTZ,
        quantity: 1000,
      },
      to: {
        unit: FREQUENCY_UNIT.GIGAHERTZ,
        quantity: 1,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.GIGAHERTZ,
        quantity: 1000,
      },
      to: {
        unit: FREQUENCY_UNIT.TERAHERTZ,
        quantity: 1,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.RPM,
        quantity: 60,
      },
      to: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1,
      },
      to: {
        unit: FREQUENCY_UNIT.RPM,
        quantity: 60,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.DEGREE_PER_SECOND,
        quantity: 360,
      },
      to: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1,
      }
    },
    {
      from: {
        unit: FREQUENCY_UNIT.HERTZ,
        quantity: 1,
      },
      to: {
        unit: FREQUENCY_UNIT.DEGREE_PER_SECOND,
        quantity: 360,
      }
    },
  ])('should convert "$from.quantity" $from.unit to "$to.quantity" $to.unit', ({from, to}) => {
    const result = FrequencyUnitConverter.from(from.quantity, from.unit).to(to.unit).convert()

    expect(result).toBeCloseTo(to.quantity, 10)
  })
  
  it('should return the original value when converting there and back', () => {
    const value = 12.5
    const originalUnit = FREQUENCY_UNIT.HERTZ
    const converted = FrequencyUnitConverter.from(value, originalUnit).to(FREQUENCY_UNIT.KILOHERTZ).convert()
    const convertedBack = FrequencyUnitConverter.from(converted, FREQUENCY_UNIT.KILOHERTZ).to(originalUnit).convert()

    expect(convertedBack).toBeCloseTo(value, 10) 
  })
  
  it('should correctly handle audio frequency conversions', () => {
    const result = FrequencyUnitConverter
      .from(440, FREQUENCY_UNIT.HERTZ)
      .to(FREQUENCY_UNIT.KILOHERTZ)
      .convert()

    expect(result).toBe(0.44)
  })

  it('should correctly handle radio frequency conversions', () => {
    const result = FrequencyUnitConverter
      .from(100, FREQUENCY_UNIT.MEGAHERTZ)
      .to(FREQUENCY_UNIT.KILOHERTZ)
      .convert()

    expect(result).toBe(100000)
  })

  it('should correctly handle CPU frequency conversions', () => {
    const result = FrequencyUnitConverter
      .from(3.5, FREQUENCY_UNIT.GIGAHERTZ)
      .to(FREQUENCY_UNIT.MEGAHERTZ)
      .convert()

    expect(result).toBe(3500)
  })

  it('should correctly handle motor speed conversions', () => {
    const result = FrequencyUnitConverter
      .from(3000, FREQUENCY_UNIT.RPM)
      .to(FREQUENCY_UNIT.HERTZ)
      .convert()

    expect(result).toBe(50)
  })
  
  it('should correctly handle angular velocity conversions', () => {
    const result = FrequencyUnitConverter
      .from(180, FREQUENCY_UNIT.DEGREE_PER_SECOND)
      .to(FREQUENCY_UNIT.HERTZ)
      .convert()

    expect(result).toBe(0.5)
  })

  describe('from', () => {
    it('should throw for invalid unit', () => {
      expect(() => FrequencyUnitConverter.from(1, 'INVALID' as any)).toThrow()
    })
  })

  describe('to', () => {
    it('should throw for invalid unit', () => {
      expect(() => FrequencyUnitConverter.from(1, FREQUENCY_UNIT.HERTZ).to('INVALID' as any)).toThrow()
    })
  })
  
  describe('edge cases', () => {
    it('should return 0 when converting 0 of any unit', () => {
      const result = FrequencyUnitConverter.from(0, FREQUENCY_UNIT.HERTZ).to(FREQUENCY_UNIT.KILOHERTZ).convert()

      expect(result).toBe(0)
    })
    
    it('should return the same value when converting to the same unit', () => {
      const result = FrequencyUnitConverter.from(42, FREQUENCY_UNIT.HERTZ).to(FREQUENCY_UNIT.HERTZ).convert()

      expect(result).toBe(42)
    })
  }) 

  describe('real world conversions', () => {
    it('should correctly convert musical note A4', () => {
      const result = FrequencyUnitConverter
        .from(440, FREQUENCY_UNIT.HERTZ)
        .to(FREQUENCY_UNIT.MILLIHERTZ)
        .convert()

      expect(result).toBe(440000)
    })

    it('should correctly convert FM radio frequency', () => {
      const result = FrequencyUnitConverter
        .from(101.1, FREQUENCY_UNIT.MEGAHERTZ)
        .to(FREQUENCY_UNIT.HERTZ)
        .convert()

      expect(result).toBe(101100000)
    })

    it('should correctly convert WiFi 2.4GHz frequency', () => {
      const result = FrequencyUnitConverter
        .from(2.4, FREQUENCY_UNIT.GIGAHERTZ)
        .to(FREQUENCY_UNIT.MEGAHERTZ)
        .convert()

      expect(result).toBe(2400)
    })

    it('should correctly convert car engine RPM', () => {
      const result = FrequencyUnitConverter
        .from(6000, FREQUENCY_UNIT.RPM)
        .to(FREQUENCY_UNIT.HERTZ)
        .convert()

      expect(result).toBe(100)
    })

    it('should correctly convert hard drive speed', () => {
      const result = FrequencyUnitConverter
        .from(7200, FREQUENCY_UNIT.RPM)
        .to(FREQUENCY_UNIT.HERTZ)
        .convert()

      expect(result).toBe(120)
    })

    it('should correctly convert power line frequency', () => {
      const result = FrequencyUnitConverter
        .from(60, FREQUENCY_UNIT.HERTZ)
        .to(FREQUENCY_UNIT.MILLIHERTZ)
        .convert()

      expect(result).toBe(60000)
    })

    it('should correctly convert light frequency', () => {
      const result = FrequencyUnitConverter
        .from(500, FREQUENCY_UNIT.TERAHERTZ)
        .to(FREQUENCY_UNIT.GIGAHERTZ)
        .convert()

      expect(result).toBe(500000)
    })

    it('should correctly convert turntable speed', () => {
      const result = FrequencyUnitConverter
        .from(33.33, FREQUENCY_UNIT.RPM)
        .to(FREQUENCY_UNIT.HERTZ)
        .convert()

      expect(result).toBeCloseTo(0.5555, 4)
    })

    it('should correctly convert processor clock speed', () => {
      const result = FrequencyUnitConverter
        .from(4.2, FREQUENCY_UNIT.GIGAHERTZ)
        .to(FREQUENCY_UNIT.HERTZ)
        .convert()

      expect(result).toBe(4200000000)
    })

    it('should correctly convert AM radio frequency', () => {
      const result = FrequencyUnitConverter
        .from(1000, FREQUENCY_UNIT.KILOHERTZ)
        .to(FREQUENCY_UNIT.HERTZ)
        .convert()

      expect(result).toBe(1000000)
    })

    it('should correctly convert rotation from degrees per second', () => {
      const result = FrequencyUnitConverter
        .from(90, FREQUENCY_UNIT.DEGREE_PER_SECOND)
        .to(FREQUENCY_UNIT.RPM)
        .convert()

      expect(result).toBe(15)
    })

    it('should correctly convert RPM to degrees per second', () => {
      const result = FrequencyUnitConverter
        .from(10, FREQUENCY_UNIT.RPM)
        .to(FREQUENCY_UNIT.DEGREE_PER_SECOND)
        .convert()

      expect(result).toBe(60)
    })

    it('should correctly convert microwave oven frequency', () => {
      const result = FrequencyUnitConverter
        .from(2.45, FREQUENCY_UNIT.GIGAHERTZ)
        .to(FREQUENCY_UNIT.MEGAHERTZ)
        .convert()

      expect(result).toBe(2450)
    })

    it('should correctly convert Bluetooth frequency', () => {
      const result = FrequencyUnitConverter
        .from(2.402, FREQUENCY_UNIT.GIGAHERTZ)
        .to(FREQUENCY_UNIT.HERTZ)
        .convert()

      expect(result).toBe(2402000000)
    })
  })
})

