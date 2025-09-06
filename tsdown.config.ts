import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  clean: true,
  tsconfig: 'tsconfig.lib.json', 
  format: ['cjs', 'esm'],
  platform: 'neutral',

  unbundle: true,

  // Experimental
  exports: {
    customExports(exports) {
      const entries = Object.entries(exports)
        .map(([key, value]) => [key.replace('units/', ''), value])

      return Object.fromEntries(entries)
    },
  },

  entry: [
    'src/units/*.ts',
    'src/index.ts',
  ]
})
