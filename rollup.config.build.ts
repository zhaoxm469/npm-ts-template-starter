import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';
import path from 'path';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

const resolve = (...args) => path.resolve(__dirname, ...args);

export default defineConfig({
    input: resolve('./src/main.ts'),
    output: [
        {
            file: resolve('./', pkg.main),
            format: 'umd',
            name: 'AppCache',
            sourcemap: true
        },
        {
            file: resolve('./', pkg.module),
            format: 'es',
            name: pkg.name,
            sourcemap: true
        }
    ],
    plugins: [
        typescript({
            declarationDir: path.join(__dirname, './dist/'),
            declaration: true
        }),
        nodeResolve({
            extensions,
            modulesOnly: true
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions
        }),
        terser()
    ]
});
