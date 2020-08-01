import babel from '@rollup/plugin-babel';

const pkg = require('./package.json');
const year = new Date().getFullYear();

export default {
    input: './index.js',
    output: {
        banner: `/*!
 * Gentle Guide v${pkg.version}
 * Copyright (c) ${year} ${pkg.author}
 * Licensed under ISC (https://github.com/devmanextensions/gentle-guide/blob/master/LICENSE)
 */`,
        file: 'dist/js/gentleguide.js',
        format: 'umd',
        name: 'gentleguide',
    },
    plugins: [
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
        }),
    ],
};
