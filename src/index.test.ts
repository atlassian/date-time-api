import './global.d.ts';
import dates from './test-dates.json';
import {
    formatDate,
    formatDateTime,
    formatDateTimeByOptions,
    formatDuration,
    formatDurationByOptions,
    formatNumericDate,
    formatPlainDate,
    formatPlainDateTime,
    formatPlainTime,
    formatTime,
    getDatePattern,
    parse,
    parseByLocale,
} from './index';

describe('date-time', () => {
    describe('parse', () => {
        test('should clone the date object', () => {
            const now = new Date('1986-01-15');
            expect(parse(now)).not.toBe(parse(now));
            expect(parse(now)).toStrictEqual(parse(now));
        });

        test('should parse plain date string', () => {
            expect(parse('2004-13-03')).toBe(null);
            expect(parse('2004-8-32')).toBe(null);
            expect(parse('2001-2-29')).toBe(null);
            expect(parse('2014-04-08-dump')).toBe(null);
            expect(parse('Zac Xu')).toBe(null);

            const date = new Date('2004-08-03');
            expect((parse(date.getTime()) as Date).toISOString()).toBe('2004-08-03T00:00:00.000Z');
            expect(date.toISOString()).toStrictEqual(date.toISOString());
            expect(date.toISOString()).toStrictEqual('2004-08-03T00:00:00.000Z');
            date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
            expect((parse('2004-08-03') as Date).toISOString()).toStrictEqual(date.toISOString());
        });

        test('should parse ISO date string', () => {
            expect(parse('2004-8-3')).toStrictEqual(new Date(2004, 7, 3));
            expect(parse('2000-2-29')).toStrictEqual(new Date(2000, 1, 29));
            expect(parse('2004-08-03')).toStrictEqual(new Date(2004, 7, 3));
            expect(parse('2001-2-29')).toBe(null);
            expect(parse('2004-13-03')).toBe(null);
            expect(parse('2004-8-32')).toBe(null);
            expect(parse('Zac Xu')).toBe(null);
            expect(parse(undefined as unknown as string)).toBe(null);
            expect(parse('2014-04-08-dump')).toBe(null);
        });

        test('should parse date string by locale', () => {
            expect(parseByLocale('31/12/2022', 'en-GB')).toStrictEqual(parse('2022-12-31'));
            expect(parseByLocale('12/31/2022', 'en-GB')).toBe(null);
            expect(parseByLocale('12/31/2022', 'en-US')).toStrictEqual(parse('2022-12-31'));
            expect(parseByLocale('31/12/2022', 'en-US')).toBe(null);
            expect(parseByLocale('2022/12/31', 'zh-CN')).toStrictEqual(parse('2022-12-31'));
            expect(parseByLocale('31/12/2022', 'zh-CN')).toBe(null);
        });

        dates.forEach((d) => {
            test(`should validate ${d.locale} date string`, () => {
                expect(parseByLocale(d.numericDate, d.locale)).toBeTruthy();
            });
        });
    });

    describe('format plain date and time', () => {
        test('should format plain date', () => {
            const date = new Date('2025-09-01');
            expect(formatPlainDate(date)).toBe('2025-09-01');
        });

        test('should format plain date by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(formatPlainDate(date, 'Asia/Shanghai')).toBe('2025-09-01');
            expect(formatPlainDate(date, 'Australia/Sydney')).toBe('2025-09-02');
        });

        test('should format plain time', () => {
            const date = new Date('2025-09-01T15:05:01');
            expect(formatPlainTime(date)).toBe('15:05:01');
        });

        test('should format plain time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(formatPlainTime(date, 'Asia/Shanghai')).toBe('23:05:01');
            expect(formatPlainTime(date, 'Australia/Sydney')).toBe('01:05:01');
        });

        test('should format plain date time', () => {
            const date = new Date('2024-02-12T14:30:00');
            expect(formatPlainDateTime(date)).toBe('2024-02-12T14:30:00');
        });

        test('should format plain date time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(formatPlainDateTime(date, 'Asia/Shanghai')).toBe('2025-09-01T23:05:01');
            expect(formatPlainDateTime(date, 'Australia/Sydney')).toBe('2025-09-02T01:05:01');
        });
    });

    describe('getDatePattern', () => {
        dates.forEach((d) =>
            test(`should get ${d.locale} date pattern`, () => expect(getDatePattern(d.locale)).toBe(d.pattern)),
        );
    });

    describe('formatNumericDate by locale', () => {
        const date = new Date('2004-08-03');

        dates.forEach((d) => {
            test(`should format ${d.locale} numeric date`, () =>
                expect(formatNumericDate(date, d.locale)).toStrictEqual(d.numericDate));
        });

        test('should format numeric date by time zone', () => {
            const date = new Date('2025-09-01T15:05:05Z');
            expect(formatNumericDate(date, 'en-GB', 'Asia/Shanghai')).toBe('01/09/2025');
            expect(formatNumericDate(date, 'en-US', 'Australia/Sydney')).toBe('9/2/2025');
        });
    });

    describe('format CLDR date and time by locale', () => {
        const date = new Date('2004-08-03');
        dates.forEach((d) => {
            test(`should format ${d.locale} CLDR date`, () => {
                // todo: Chrome_Headless_104_0_518_79_(Linux_x86_64) generates an incorrect format
                // remove Icelandic is-IS locale below once Chrome fixed Google Closure translation
                if (d.locale === 'is-IS') {
                    expect(formatDate(date, d.locale)).toStrictEqual(d.numericDate);
                } else {
                    expect(formatDate(date, d.locale)).toStrictEqual(d.cldrDate);
                }
            });
        });

        const time = new Date('2004-08-03T01:02:03');
        dates.forEach((d) => {
            test(`should format ${d.locale} CLDR time`, () => {
                expect(formatTime(time, d.locale)).toStrictEqual(d.cldrTime);
            });
        });
    });

    describe('format by time zone', () => {
        test('should format date by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(formatDate(date, 'en-GB', 'Asia/Shanghai')).toBe('1 Sept 2025');
            expect(formatDate(date, 'en-US', 'Australia/Sydney')).toBe('Sep 2, 2025');
        });

        test('should format time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(formatTime(date, 'en-GB', 'Asia/Shanghai')).toBe('23:05:01');
            expect(formatTime(date, 'en-US', 'Australia/Sydney')).toBe('1:05:01 AM');
        });

        test('should format time by locale and time zone', () => {
            expect(formatTime(new Date('2025-09-01T14:05:05Z'), 'en-GB', 'Australia/Sydney')).toBe('00:05:05');
            expect(formatTime(new Date('2025-09-01T14:05:05Z'), 'en-US', 'Australia/Sydney')).toBe('12:05:05 AM');
            expect(formatTime(new Date('2025-09-01T14:05:05Z'), 'cs-CZ', 'Australia/Sydney')).toBe('0:05:05');
            expect(formatTime(new Date('2025-09-01T14:05:05Z'), 'zh-CN', 'Australia/Sydney')).toBe('00:05:05');
        });

        test('should format date time by locale', () => {
            expect(formatDateTime(new Date('2025-09-01T14:05:05Z'), 'en-GB', 'Australia/Sydney')).toBe(
                '2 Sept 2025, 00:05:05',
            );
            expect(formatDateTime(new Date('2025-09-01T14:05:05Z'), 'en-US', 'Australia/Sydney')).toBe(
                'Sep 2, 2025, 12:05:05 AM',
            );
            expect(formatDateTime(new Date('2025-09-01T14:05:05Z'), 'cs-CZ', 'Australia/Sydney')).toBe(
                '2. 9. 2025 0:05:05',
            );
            expect(formatDateTime(new Date('2025-09-01T14:05:05Z'), 'zh-CN', 'Australia/Sydney')).toBe(
                '2025年9月2日 00:05:05',
            );
        });

        test('should format date time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(formatDateTime(date, 'en-GB', 'Asia/Shanghai')).toBe('1 Sept 2025, 23:05:01');
            expect(formatDateTime(date, 'en-US', 'Australia/Sydney')).toBe('Sep 2, 2025, 1:05:01 AM');
        });
    });

    describe('formatDateTimeByOptions', () => {
        const option = { second: undefined };
        test('should format date time by options', () => {
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'en-GB')).toBe('3 Aug 2004, 04:00');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'en-US')).toBe('Aug 3, 2004, 4:00 AM');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'cs-CZ')).toBe('3. 8. 2004 4:00');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'is-IS')).toBe('3.8.2004, 04:00');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'de-DE')).toBe('03.08.2004, 04:00');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'zh-CN')).toBe('2004年8月3日 04:00');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'ja-JP')).toBe('2004/08/03 4:00');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'ko-KR')).toBe('2004. 8. 3. 오전 4:00');
            expect(formatDateTimeByOptions(option, new Date(2004, 7, 3, 4), 'fi-FI')).toBe('3.8.2004 klo 4.00');
        });

        test('should format date time by options and time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(formatDateTimeByOptions(option, date, 'en-GB', 'Asia/Shanghai')).toBe('1 Sept 2025, 23:05');
            expect(formatDateTimeByOptions(option, date, 'en-US', 'Australia/Sydney')).toBe('Sep 2, 2025, 1:05 AM');
        });
    });

    describe('formatDuration', () => {
        const from = new Date(2000, 0, 0);
        test('auto hide zero values', () => {
            expect(formatDuration(from, new Date(2000, 0, 1, 1, 1, 1, 1), 'en-US')).toBe('1 day, 1 hr, 1 min, 1 sec');
            expect(formatDuration(from, new Date(2000, 0, 2, 2, 2, 2, 2), 'en-US')).toBe('2 days, 2 hr, 2 min, 2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 2, 2, 2, 2), 'en-US')).toBe('2 hr, 2 min, 2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 2, 2, 2), 'en-US')).toBe('2 min, 2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 0, 2, 2), 'en-US')).toBe('2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 0, 0, 0), 'en-US')).toBe('0 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 0, 0, 1), 'en-US')).toBe('0 sec');
            const longDuration = formatDurationByOptions({ style: 'long' }, from, from);
            expect(longDuration).toBe('0 seconds');
        });

        test('should format negative duration', () => {
            expect(formatDuration(from, new Date(1999, 0, 0), 'en-US')).toStrictEqual('-365 days');
        });

        const to = new Date(2000, 0, 1, 2, 3, 4, 5);
        dates.forEach((d) => {
            test(`should format ${d.locale} duration`, () => {
                const dateString = formatDurationByOptions({ style: 'narrow' }, from, to, d.locale);
                expect(dateString).toStrictEqual(d.narrowDuration);
            });
        });
    });

    describe('formatDurationByOptions', () => {
        test('throws error with null options', () => {
            expect(() => {
                // @ts-expect-error - Deliberately testing invalid input
                formatDurationByOptions(null, from, to);
            }).toThrow('Please use formatDuration instead');
        });

        test('0 seconds duration', () => {
            const from = new Date(2000, 0, 0);
            const to = new Date(2000, 0, 0, 0, 0, 0, 1);

            let options: Intl.DurationFormatOptions = { style: 'long' };
            expect(formatDurationByOptions(options, from, to, 'en-US')).toBe('0 seconds');
            options = { style: 'narrow' };
            expect(formatDurationByOptions(options, from, to, 'en-US')).toBe('0s');
            options = { style: 'narrow', minutesDisplay: 'always' };
            expect(formatDurationByOptions(options, from, to, 'en-US')).toBe('0m');
        });

        const from = new Date(2000, 0, 2);
        const to = new Date(2000, 0, 3, 2, 3, 4, 5);

        dates.forEach((d) => {
            test(`should format ${d.locale} narrow duration`, () => {
                const dateString = formatDurationByOptions({ style: 'narrow' }, from, to, d.locale);
                expect(dateString).toStrictEqual(d.narrowDuration);
            });

            test(`should format ${d.locale} long duration`, () => {
                const dateString = formatDurationByOptions({ style: 'long' }, from, to, d.locale);
                expect(dateString).toStrictEqual(d.longDuration);
            });
        });

        test('Japanese style override', () => {
            // For Japanese locale, short and narrow return wrong in English. Override to use long instead.
            const shortDate = formatDuration(from, to, 'ja-JP');
            expect(shortDate).toStrictEqual('1日2時間3分4秒');
            const longDate = formatDurationByOptions({ style: 'long' }, from, to, 'ja-JP');
            expect(longDate).toStrictEqual('1日2時間3分4秒');
            const narrowDate = formatDurationByOptions({ style: 'narrow' }, from, to, 'ja-JP');
            expect(narrowDate).toStrictEqual('1日2時間3分4秒');
        });
    });

    describe('formatDurationFallback', () => {
        const originalDurationFormat = Intl.DurationFormat;

        beforeAll(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (Intl as any).DurationFormat;
        });

        afterAll(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (Intl as any).DurationFormat = originalDurationFormat;
        });

        const from = new Date(2000, 0, 0);
        test('auto hide zero values', () => {
            expect(formatDuration(from, new Date(2000, 0, 1, 1, 1, 1, 1), 'en-US')).toBe('1 day 1 hr 1 min 1 sec');
            expect(formatDuration(from, new Date(2000, 0, 2, 2, 2, 2, 2), 'en-US')).toBe('2 days 2 hr 2 min 2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 2, 2, 2, 2), 'en-US')).toBe('2 hr 2 min 2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 2, 2, 2), 'en-US')).toBe('2 min 2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 0, 2, 2), 'en-US')).toBe('2 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 0, 0, 0), 'en-US')).toBe('0 sec');
            expect(formatDuration(from, new Date(2000, 0, 0, 0, 0, 0, 1), 'en-US')).toBe('0 sec');
        });

        test('0 seconds duration', () => {
            const shortDuration = formatDuration(from, from);
            expect(shortDuration).toStrictEqual('0 sec');
            const longDuration = formatDurationByOptions({ style: 'long' }, from, from, 'en-US');
            expect(longDuration).toStrictEqual('0 seconds');
        });

        const to = new Date(2000, 0, 1, 2, 3, 4, 5);
        test('formatDuration', () => {
            const result = formatDuration(from, to);
            // fallback to Intl.NumberFormat, there are no commas in the string
            expect(result).toStrictEqual('1 day 2 hr 3 min 4 sec');
        });

        test('with US locale', () => {
            const longDate = formatDurationByOptions({ style: 'long' }, from, to, 'en-US');
            expect(longDate).toStrictEqual('1 day 2 hours 3 minutes 4 seconds');

            const narrowDate = formatDurationByOptions({ style: 'narrow' }, from, to, 'en-US');
            expect(narrowDate).toStrictEqual('1d 2h 3m 4s');
        });

        test('with CN locale', () => {
            const longDuration = formatDurationByOptions({ style: 'long' }, from, to, 'zh-CN');
            expect(longDuration).toStrictEqual('1天2小时3分钟4秒钟');

            const narrowDuration = formatDurationByOptions({ style: 'narrow' }, from, to, 'zh-CN');
            expect(narrowDuration).toStrictEqual('1天2小时3分钟4秒');
        });
    });
});
