import { execSync } from 'child_process';

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

const EXPECTED_PACK_FILES = [
    'LICENSE',
    'README.md',
    'dist/bundle.amd.js',
    'dist/bundle.cjs',
    'dist/bundle.global.js',
    'dist/bundle.mjs',
    'dist/index.d.ts',
    'package.json',
];

const EXPECTED_NON_EMPTY_DIST_PACK_FILES = [
    'dist/bundle.amd.js',
    'dist/bundle.cjs',
    'dist/bundle.global.js',
    'dist/bundle.mjs',
    'dist/index.d.ts',
];

describe('dist bundle smoke tests', () => {
    test('exports all APIs as functions', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const dateTimeCjs = require('../dist/bundle.cjs');

        EXPECTED_EXPORTS.forEach((name) => {
            expect(typeof dateTimeCjs[name]).toBe('function');
        });
    });

    test('npm pack dry run matches published file whitelist exactly', () => {
        const output = execSync('npm pack --dry-run --json', { encoding: 'utf8' });
        const [packResult] = JSON.parse(output) as {
            files: Array<{ path: string; size: number }>;
        }[];
        const actualPackFiles = packResult.files.map((file) => file.path).sort();
        const distPackFiles = packResult.files.filter((file) => EXPECTED_NON_EMPTY_DIST_PACK_FILES.includes(file.path));

        expect(actualPackFiles).toEqual(EXPECTED_PACK_FILES.slice().sort());
        expect(distPackFiles.map((file) => file.path).sort()).toEqual(
            EXPECTED_NON_EMPTY_DIST_PACK_FILES.slice().sort(),
        );

        distPackFiles.forEach((file) => {
            expect(file.size).toBeGreaterThan(0);
        });
    });
});
