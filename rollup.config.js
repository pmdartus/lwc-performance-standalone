'use strict';

const replace = require('rollup-plugin-replace');
const lwcCompiler = require('@lwc/rollup-plugin');

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'iife',
  },
  plugins: [
    lwcCompiler(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
}
