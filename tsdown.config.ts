import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  clean: true,
  tsconfig: 'tsconfig.lib.json', 
  format: ['cjs', 'esm'],
  platform: 'neutral',

  // Experimental
  exports: true,
  unbundle: true,

  entry: [
    'src/time.ts',
    'src/index.ts',
  ]
})
