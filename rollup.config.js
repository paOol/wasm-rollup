import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import html from '@rollup/plugin-html';
import scss from 'rollup-plugin-scss';
import { wasm } from '@rollup/plugin-wasm';

import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.ts', '.tsx'];

export default {
  input: 'src/index.tsx',
  output: {
    file: 'public/index.js',
    format: 'iife'
  },
  plugins: [
    wasm(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        isProd ? 'production' : 'development'
      )
    }),
    resolve({
      extensions
    }),
    commonjs({
      include: /node_modules/
    }),
    babel({
      extensions,
      exclude: /node_modules/,
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ],
      plugins: [
        'react-require',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        [
          '@babel/plugin-proposal-object-rest-spread',
          {
            useBuiltIns: true
          }
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: false
          }
        ]
      ]
    }),
    html({
      fileName: 'index.html',
      title: 'Rollup + WASM',
      template: ({ title }) => {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
        </head>
        <body>
          <div id="app"></div>
          <script src="index.js"></script>
          <script src="hello.js"></script>
          <script src="wasm_exec.js"></script>
          <script>
            const go = new Go();
            WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
              go.run(result.instance);});
          </script>

        </body>
        </html>
        `;
      }
    }),
    isProd && terser(),
    !isProd &&
      serve({
        host: 'localhost',
        port: 3000,
        open: true,
        contentBase: ['public']
      }),
    !isProd &&
      livereload({
        watch: 'public'
      })
  ]
};
