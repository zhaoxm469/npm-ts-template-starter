import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import path from 'path';

import pkg from './package.json';

const extensions = ['.js', '.ts'];

const resolve = (...args) => path.resolve(__dirname, ...args);

export default defineConfig([
    {
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
    },
    {
        // 生成 .d.ts 类型声明文件
        input: resolve('./src/main.ts'),
        output: {
            file: resolve('./dist/' + pkg.name + '.d.ts'),
            format: 'es'
        },
        plugins: [dts()]
    }
]);
