import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
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
            format: 'amd',
            name: 'AppCache'
        },
        {
            file: resolve('./', pkg.module),
            format: 'es',
            name: pkg.name
        }
    ],
    plugins: [
        typescript({
            sourceMap: false
        }),
        nodeResolve({
            extensions,
            modulesOnly: true
        }),
        babel({
            exclude: 'node_modules/**',
            extensions
        }),
        terser()
    ]
});
