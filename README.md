## Univert

**Univert** is a lightweight, zero-dependency, type-safe library for converting units in JavaScript/TypeScript. It provides a fluent API for precise and readable unit conversions.

### Installation

Install via your preferred package manager:

```bash
# npm
npm install univert

# yarn
yarn add univert

# pnpm
pnpm add univert
```

### Usage

```ts
import { TIME_UNIT, TimeUnitConverter } from 'univert/time'

// Convert 1 hour to milliseconds
const milliseconds = TimeUnitConverter.from(1, TIME_UNIT.HOUR)
  .to(TIME_UNIT.MILLISECOND)
  .convert()

console.log(milliseconds) // 3_600_000
```

### Features

* **Type-safe**: Ensures only valid units are used.
* **Fluent API**: Chainable methods for easy conversion.
* **Zero dependencies**: Lightweight and easy to include in any project.

### Inspiration

Made with ❤️ and Inspired by [convert-units](https://github.com/convert-units/convert-units)
