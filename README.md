## Univerto

**Univerto** is a lightweight, zero-dependency, type-safe library for converting units in JavaScript/TypeScript. It provides a fluent API for precise and readable unit conversions.

### Installation

Install via your preferred package manager:

```bash
# npm
npm install univerto

# yarn
yarn add univerto

# pnpm
pnpm add univerto
```

### Usage

```ts
import { TIME_UNIT, TimeUnitConverter } from 'univerto/time'

// Convert 1 hour to milliseconds
const milliseconds = TimeUnitConverter.from(1, TIME_UNIT.HOUR)
  .to(TIME_UNIT.MILLISECOND)
  .convert()

console.log(milliseconds) // 3_600_000
```

Or you can get the fraction to be able to pass it to your lib of choice do the final math

```ts
import { TIME_UNIT, TimeUnitConverter } from 'univerto/time'

// Convert 1 hour to milliseconds
const fraction = TimeUnitConverter.from(1, TIME_UNIT.HOUR)
  .to(TIME_UNIT.MILLISECOND)
  .convertToFraction() // or .convertToRational()
```

Using with decimal.js for high precision arithmetic:

```ts
import { TIME_UNIT, TimeUnitConverter } from 'univerto/time'
import { Decimal } from 'decimal.js'

// Convert 1 hour to milliseconds using decimal.js
const fraction = TimeUnitConverter.from(1, TIME_UNIT.HOUR)
  .to(TIME_UNIT.MILLISECOND)
  .convertToFraction()

const result = new Decimal(fraction.numerator).div(fraction.denominator)

console.log(result.toString()) // "3_600_000"
```

### Features

* **Type-safe**: Ensures only valid units are used.
* **Fluent API**: Chainable methods for easy conversion.
* **Zero dependencies**: Lightweight and easy to include in any project.
* **Precise calculations**: The lib represents the numbers as fractions internally to avoid floating point insistencies

### Supported Units

**Length**
```ts
import { LENGTH_UNIT, LengthUnitConverter } from 'univerto/length'
```
Nanometer, Micrometer, Millimeter, Centimeter, Meter, Kilometer, Inch, Hand, Foot, Yard, Chain, Furlong, Mile, League

**Area**
```ts
import { AREA_UNIT, AreaUnitConverter } from 'univerto/area'
```
Square millimeter, Square centimeter, Square meter, Hectare, Square kilometer, Square inch, Square foot, Acre, Square mile

**Volume**
```ts
import { VOLUME_UNIT, VolumeUnitConverter } from 'univerto/volume'
```
Cubic millimeter, Cubic centimeter, Cubic meter, Cubic kilometer, Milliliter, Liter, Kiloliter, Megaliter, Gigaliter, Cubic inch, Cubic foot, Cubic yard, Teaspoon, Tablespoon, Fluid ounce, Cup, Pint, Quart, Gallon

**Mass**
```ts
import { MASS_UNIT, MassUnitConverter } from 'univerto/mass'
```
Microgram, Milligram, Gram, Kilogram, Metric ton, Ounce, Pound, Stone, Short ton, Long ton

**Time**
```ts
import { TIME_UNIT, TimeUnitConverter } from 'univerto/time'
```
Nanosecond, Microsecond, Millisecond, Second, Minute, Hour, Day, Week, Month, Year, Decade

**Speed**
```ts
import { SPEED_UNIT, SpeedUnitConverter } from 'univerto/speed'
```
Meter per second, Millimeter per hour, Kilometer per hour, Mile per hour, Knot, Foot per second, Inch per hour

**Data Storage**
```ts
import { DATA_UNIT, DataUnitConverter } from 'univerto/data'
```
Bit, Byte, Kilobyte, Megabyte, Gigabyte, Terabyte, Petabyte, Exabyte, Kibibyte, Mebibyte, Gibibyte, Tebibyte, Pebibyte, Exbibyte

**Voltage**
```ts
import { VOLTAGE_UNIT, VoltageUnitConverter } from 'univerto/voltage'
```
Millivolt, Volt, Kilovolt, Megavolt

### Inspiration

Made with ❤️ and Inspired by [convert-units](https://github.com/convert-units/convert-units)
