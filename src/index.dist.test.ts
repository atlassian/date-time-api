import fs from 'fs';

const EXPECTED_EXPORTS = [
    'parse',
    'parseByLocale',
    'getDatePattern',
    'validate',
    'formatPlainDate',
    'formatPlainTime',
    'formatPlainDateTime',
    'formatNumericDate',
    'formatDate',
    'formatTime',
    'formatDateTime',
    'formatDateTimeByOptions',
    'formatDuration',
    'formatDurationByOptions',
];

describe('dist bundle smoke tests', () => {
    test('CJS exports all APIs as functions', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const dateTimeCjs = require('../dist/bundle.cjs');

        EXPECTED_EXPORTS.forEach((name) => {
            expect(typeof dateTimeCjs[name]).toBe('function');
        });
    });

    test('ESM bundle exists and is non-empty', () => {
        expect(fs.statSync('./dist/bundle.mjs').size).toBeGreaterThan(0);
    });

    test('AMD bundle exists and is non-empty', () => {
        expect(fs.statSync('./dist/bundle.amd.js').size).toBeGreaterThan(0);
    });

    test('Global bundle exists and is non-empty', () => {
        expect(fs.statSync('./dist/bundle.global.js').size).toBeGreaterThan(0);
    });
});
