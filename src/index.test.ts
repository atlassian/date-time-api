import './global.d.ts';
import * as dateTime from './index';
import dates from './test-dates.json';

describe('date-time', () => {
    describe('parse', () => {
        test('should clone the date object', () => {
            const now = new Date('1986-01-15');
            expect(dateTime.parse(now)).not.toBe(dateTime.parse(now));
            expect(dateTime.parse(now)).toStrictEqual(dateTime.parse(now));
        });

        test('should parse plain date string', () => {
            expect(dateTime.parse('2004-13-03')).toBe(null);
            expect(dateTime.parse('2004-8-32')).toBe(null);
            expect(dateTime.parse('2001-2-29')).toBe(null);
            expect(dateTime.parse('2014-04-08-dump')).toBe(null);
            expect(dateTime.parse('Zac Xu')).toBe(null);

            const date = new Date('2004-08-03');
            expect((dateTime.parse(date.getTime()) as Date).toISOString()).toBe('2004-08-03T00:00:00.000Z');
            expect(date.toISOString()).toStrictEqual(date.toISOString());
            expect(date.toISOString()).toStrictEqual('2004-08-03T00:00:00.000Z');
            date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
            expect((dateTime.parse('2004-08-03') as Date).toISOString()).toStrictEqual(date.toISOString());
        });
    });

    describe('validate', () => {
        test('should validate ISO date string', () => {
            expect(dateTime.validateIso8601('2004-8-3')).toBeTruthy();
            expect(dateTime.validateIso8601('2000-2-29')).toBeTruthy();
            expect(dateTime.validateIso8601('2004-08-03')).toBeTruthy();
            expect(dateTime.validateIso8601(undefined as unknown as string)).toBe(false);
            expect(dateTime.validateIso8601('2014-04-08-dump')).toStrictEqual(dateTime.parse('2014-04-08'));
            expect(dateTime.validateIso8601('2001-2-29')).toBe(false);
            expect(dateTime.validateIso8601('2004-13-03')).toBe(false);
            expect(dateTime.validateIso8601('2004-8-32')).toBe(false);
            expect(dateTime.validateIso8601('Zac Xu')).toBe(false);
        });

        test('should validate date string by locale', () => {
            expect(dateTime.validateByLocale('31/12/2022', 'en-GB')).toBeTruthy();
            expect(dateTime.validateByLocale('12/31/2022', 'en-GB')).toBe(false);
            expect(dateTime.validateByLocale('12/31/2022', 'en-US')).toBeTruthy();
            expect(dateTime.validateByLocale('31/12/2022', 'en-US')).toBe(false);
            expect(dateTime.validateByLocale('2022/12/31', 'zh-CN')).toBeTruthy();
            expect(dateTime.validateByLocale('31/12/2022', 'zh-CN')).toBe(false);
        });

        dates.forEach((d) => {
            test(`should validate ${d.locale} date string`, () => {
                expect(dateTime.validateByLocale(d.numericDate, d.locale)).toBeTruthy();
            });
        });
    });

    describe('getDatePattern', () => {
        dates.forEach((d) =>
            test(`should get ${d.locale} date pattern`, () => {
                expect(dateTime.getDatePattern(d.locale)).toBe(d.pattern);
            }),
        );
    });

    describe('formatNumericDate', () => {
        const date = new Date('2004-08-03');

        dates.forEach((d) => {
            test(`should format ${d.locale} numeric date`, () => {
                expect(dateTime.formatNumericDate(date, d.locale)).toStrictEqual(d.numericDate);
            });
        });

        test('should format numeric date by time zone', () => {
            const date = new Date('2025-09-01T15:05:05Z');
            expect(dateTime.formatNumericDate(date, 'en-GB', 'Asia/Shanghai')).toBe('01/09/2025');
            expect(dateTime.formatNumericDate(date, 'en-US', 'Australia/Sydney')).toBe('9/2/2025');
        });
    });

    describe('format plain date and time', () => {
        test('should format plain date', () => {
            const date = new Date('2025-09-01');
            expect(dateTime.formatPlainDate(date)).toBe('2025-09-01');
        });

        test('should format plain date by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(dateTime.formatPlainDate(date, 'Asia/Shanghai')).toBe('2025-09-01');
            expect(dateTime.formatPlainDate(date, 'Australia/Sydney')).toBe('2025-09-02');
        });

        test('should format plain time', () => {
            const date = new Date('2025-09-01T15:05:01');
            expect(dateTime.formatPlainTime(date)).toBe('15:05:01');
        });

        test('should format plain time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(dateTime.formatPlainTime(date, 'Asia/Shanghai')).toBe('23:05:01');
            expect(dateTime.formatPlainTime(date, 'Australia/Sydney')).toBe('01:05:01');
        });

        test('should format plain date time', () => {
            const date = new Date('2024-02-12T14:30:00');
            expect(dateTime.formatPlainDateTime(date)).toBe('2024-02-12T14:30:00');
        });

        test('should format plain date time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(dateTime.formatPlainDateTime(date, 'Asia/Shanghai')).toBe('2025-09-01T23:05:01');
            expect(dateTime.formatPlainDateTime(date, 'Australia/Sydney')).toBe('2025-09-02T01:05:01');
        });
    });

    describe('format CLDR date and time', () => {
        const date = new Date('2004-08-03');
        dates.forEach((d) => {
            test(`should format ${d.locale} CLDR date`, () => {
                // todo: Chrome_Headless_104_0_518_79_(Linux_x86_64) generates an incorrect format
                // remove Icelandic is-IS locale below once Chrome fixed Google Closure translation
                if (d.locale === 'is-IS') {
                    expect(dateTime.formatDate(date, d.locale)).toStrictEqual(d.numericDate);
                } else {
                    expect(dateTime.formatDate(date, d.locale)).toStrictEqual(d.cldrDate);
                }
            });
        });
    });

    describe('format by time zone', () => {
        test('should format date by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(dateTime.formatDate(date, 'en-GB', 'Asia/Shanghai')).toBe('1 Sept 2025');
            expect(dateTime.formatDate(date, 'en-US', 'Australia/Sydney')).toBe('Sep 2, 2025');
        });

        test('should format time by locale', () => {
            expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'en-GB')).toStrictEqual('04:00:00');
            expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'en-US')).toStrictEqual('4:00:00 AM');
            expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'cs-CZ')).toStrictEqual('4:00:00');
            expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'zh-CN')).toStrictEqual('04:00:00');
        });

        test('should format time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(dateTime.formatTime(date, 'en-GB', 'Asia/Shanghai')).toBe('23:05:01');
            expect(dateTime.formatTime(date, 'en-US', 'Australia/Sydney')).toBe('1:05:01 AM');
        });

        test('should format time by locale and time zone', () => {
            expect(dateTime.formatTime(new Date('2025-09-01T14:05:05Z'), 'en-GB', 'Australia/Sydney')).toStrictEqual(
                '00:05:05',
            );
            expect(dateTime.formatTime(new Date('2025-09-01T14:05:05Z'), 'en-US', 'Australia/Sydney')).toStrictEqual(
                '12:05:05 AM',
            );
            expect(dateTime.formatTime(new Date('2025-09-01T14:05:05Z'), 'cs-CZ', 'Australia/Sydney')).toStrictEqual(
                '0:05:05',
            );
            expect(dateTime.formatTime(new Date('2025-09-01T14:05:05Z'), 'zh-CN', 'Australia/Sydney')).toStrictEqual(
                '00:05:05',
            );
        });

        test('should format date time by locale', () => {
            expect(
                dateTime.formatDateTime(new Date('2025-09-01T14:05:05Z'), 'en-GB', 'Australia/Sydney'),
            ).toStrictEqual('2 Sept 2025, 00:05:05');
            expect(
                dateTime.formatDateTime(new Date('2025-09-01T14:05:05Z'), 'en-US', 'Australia/Sydney'),
            ).toStrictEqual('Sep 2, 2025, 12:05:05 AM');
            expect(
                dateTime.formatDateTime(new Date('2025-09-01T14:05:05Z'), 'cs-CZ', 'Australia/Sydney'),
            ).toStrictEqual('2. 9. 2025 0:05:05');
            expect(
                dateTime.formatDateTime(new Date('2025-09-01T14:05:05Z'), 'zh-CN', 'Australia/Sydney'),
            ).toStrictEqual('2025年9月2日 00:05:05');
        });

        test('should format date time by time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(dateTime.formatDateTime(date, 'en-GB', 'Asia/Shanghai')).toBe('1 Sept 2025, 23:05:01');
            expect(dateTime.formatDateTime(date, 'en-US', 'Australia/Sydney')).toBe('Sep 2, 2025, 1:05:01 AM');
        });
    });

    describe('formatDateTimeByOptions', () => {
        test('should format date time by options', () => {
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'en-GB'),
            ).toStrictEqual('3 Aug 2004, 04:00');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'en-US'),
            ).toStrictEqual('Aug 3, 2004, 4:00 AM');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'cs-CZ'),
            ).toStrictEqual('3. 8. 2004 4:00');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'is-IS'),
            ).toStrictEqual('3.8.2004, 04:00');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'de-DE'),
            ).toStrictEqual('03.08.2004, 04:00');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'zh-CN'),
            ).toStrictEqual('2004年8月3日 04:00');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'ja-JP'),
            ).toStrictEqual('2004/08/03 4:00');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'ko-KR'),
            ).toStrictEqual('2004. 8. 3. 오전 4:00');
            expect(
                dateTime.formatDateTimeByOptions({ second: undefined }, new Date(2004, 7, 3, 4), 'fi-FI'),
            ).toStrictEqual('3.8.2004 klo 4.00');
        });

        test('should format date time by options and time zone', () => {
            const date = new Date('2025-09-01T15:05:01Z');
            expect(dateTime.formatDateTimeByOptions({ second: undefined }, date, 'en-GB', 'Asia/Shanghai')).toBe(
                '1 Sept 2025, 23:05',
            );
            expect(dateTime.formatDateTimeByOptions({ second: undefined }, date, 'en-US', 'Australia/Sydney')).toBe(
                'Sep 2, 2025, 1:05 AM',
            );
        });
    });

    describe('formatDuration', () => {
        const from = new Date(2000, 0, 0);
        test('auto hide zero values', () => {
            expect(dateTime.formatDuration(from, new Date(2000, 0, 1, 1, 1, 1, 1), 'en-US')).toStrictEqual(
                '1 day, 1 hr, 1 min, 1 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 2, 2, 2, 2, 2), 'en-US')).toStrictEqual(
                '2 days, 2 hr, 2 min, 2 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 2, 2, 2, 2), 'en-US')).toStrictEqual(
                '2 hr, 2 min, 2 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 0, 2, 2, 2), 'en-US')).toStrictEqual(
                '2 min, 2 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 0, 0, 2, 2), 'en-US')).toStrictEqual('2 sec');
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 0, 0, 0, 0), 'en-US')).toStrictEqual('0 sec');
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 0, 0, 0, 1), 'en-US')).toStrictEqual('0 sec');
            const longDuration = dateTime.formatDurationByOptions({ style: 'long' }, from, from);
            expect(longDuration).toStrictEqual('0 seconds');
        });

        test('should format negative duration', () => {
            expect(dateTime.formatDuration(from, new Date(1999, 0, 0), 'en-US')).toStrictEqual('-365 days');
        });

        const to = new Date(2000, 0, 1, 2, 3, 4, 5);
        dates.forEach((d) => {
            test(`should format ${d.locale} duration`, () => {
                const dateString = dateTime.formatDurationByOptions({ style: 'narrow' }, from, to, d.locale);
                expect(dateString).toStrictEqual(d.narrowDuration);
            });
        });
    });

    describe('formatDurationByOptions', () => {
        test('throws error with null options', () => {
            expect(() => {
                // @ts-expect-error - Deliberately testing invalid input
                dateTime.formatDurationByOptions(null, from, to);
            }).toThrow('Please use formatDuration instead');
        });

        test('0 seconds duration', () => {
            const from = new Date(2000, 0, 0);
            const to = new Date(2000, 0, 0, 0, 0, 0, 1);

            let options: Intl.DurationFormatOptions = { style: 'long' };
            expect(dateTime.formatDurationByOptions(options, from, to, 'en-US')).toBe('0 seconds');
            options = { style: 'narrow' };
            expect(dateTime.formatDurationByOptions(options, from, to, 'en-US')).toBe('0s');
            options = { style: 'narrow', minutesDisplay: 'always' };
            expect(dateTime.formatDurationByOptions(options, from, to, 'en-US')).toBe('0m');
        });

        const from = new Date(2000, 0, 2);
        const to = new Date(2000, 0, 3, 2, 3, 4, 5);

        dates.forEach((d) => {
            test(`should format ${d.locale} narrow duration`, () => {
                const dateString = dateTime.formatDurationByOptions({ style: 'narrow' }, from, to, d.locale);
                expect(dateString).toStrictEqual(d.narrowDuration);
            });

            test(`should format ${d.locale} long duration`, () => {
                const dateString = dateTime.formatDurationByOptions({ style: 'long' }, from, to, d.locale);
                expect(dateString).toStrictEqual(d.longDuration);
            });
        });

        test('Japanese style override', () => {
            // For Japanese locale, short and narrow return wrong in English. Override to use long instead.
            const shortDate = dateTime.formatDuration(from, to, 'ja-JP');
            expect(shortDate).toStrictEqual('1日2時間3分4秒');
            const longDate = dateTime.formatDurationByOptions({ style: 'long' }, from, to, 'ja-JP');
            expect(longDate).toStrictEqual('1日2時間3分4秒');
            const narrowDate = dateTime.formatDurationByOptions({ style: 'narrow' }, from, to, 'ja-JP');
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
            expect(dateTime.formatDuration(from, new Date(2000, 0, 1, 1, 1, 1, 1), 'en-US')).toStrictEqual(
                '1 day 1 hr 1 min 1 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 2, 2, 2, 2, 2), 'en-US')).toStrictEqual(
                '2 days 2 hr 2 min 2 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 2, 2, 2, 2), 'en-US')).toStrictEqual(
                '2 hr 2 min 2 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 0, 2, 2, 2), 'en-US')).toStrictEqual(
                '2 min 2 sec',
            );
            expect(dateTime.formatDuration(from, new Date(2000, 0, 0, 0, 0, 2, 2), 'en-US')).toStrictEqual('2 sec');
        });

        test('0 seconds duration', () => {
            const shortDuration = dateTime.formatDuration(from, from);
            expect(shortDuration).toStrictEqual('0 sec');
            const longDuration = dateTime.formatDurationByOptions({ style: 'long' }, from, from, 'en-US');
            expect(longDuration).toStrictEqual('0 seconds');
        });

        const to = new Date(2000, 0, 1, 2, 3, 4, 5);
        test('formatDuration', () => {
            const result = dateTime.formatDuration(from, to);
            // fallback to Intl.NumberFormat, there are no commas in the string
            expect(result).toStrictEqual('1 day 2 hr 3 min 4 sec');
        });

        test('with US locale', () => {
            const longDate = dateTime.formatDurationByOptions({ style: 'long' }, from, to, 'en-US');
            expect(longDate).toStrictEqual('1 day 2 hours 3 minutes 4 seconds');

            const narrowDate = dateTime.formatDurationByOptions({ style: 'narrow' }, from, to, 'en-US');
            expect(narrowDate).toStrictEqual('1d 2h 3m 4s');
        });

        test('with CN locale', () => {
            const longDuration = dateTime.formatDurationByOptions({ style: 'long' }, from, to, 'zh-CN');
            expect(longDuration).toStrictEqual('1天2小时3分钟4秒钟');

            const narrowDuration = dateTime.formatDurationByOptions({ style: 'narrow' }, from, to, 'zh-CN');
            expect(narrowDuration).toStrictEqual('1天2小时3分钟4秒');
        });
    });
});
