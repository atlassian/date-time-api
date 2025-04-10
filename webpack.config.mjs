import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseConfig = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    optimization: {
        minimize: true,
    },
};

export default [
    {
        ...baseConfig,
        output: {
            filename: 'bundle.mjs',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'module',
            environment: { module: true },
        },
        experiments: {
            outputModule: true,
        },
    },
    {
        ...baseConfig,
        output: {
            filename: 'bundle.cjs',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'commonjs2',
        },
    },
    {
        ...baseConfig,
        output: {
            filename: 'bundle.amd.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
        },
    },
    {
        ...baseConfig,
        output: {
            filename: 'bundle.global.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'window',
            library: 'DateTime',
        },
    },
];
