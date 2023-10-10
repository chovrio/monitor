import path from 'path';
import ts from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
const __filenameNew = fileURLToPath(import.meta.url);
const __dirnameNew = path.dirname(__filenameNew);

export default defineConfig({
  input: './src/core/index.ts',
  output: {
    file: path.resolve(__dirnameNew, '../server/src/track-sdk/hm.js'),
    format: 'iife',
  },
  plugins: [ts(), terser()],
});
