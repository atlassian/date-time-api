import * as dateTime from './dateTime';

const dates = [
    {
        locale: 'cs-CZ',
        pattern: 'dd. mm. yyyy',
        shortDate: '3. 8. 2004',
        cldr39Date: '3. 8. 2004',
        duration: '1 den 1 hodina 1 minuta 1 sekunda',
    },
    {
        locale: 'da-DK',
        pattern: 'dd.mm.yyyy',
        shortDate: '3.8.2004',
        cldr39Date: '3. aug. 2004',
        duration: '1 dag 1 time 1 minut 1 sekund',
    },
    {
        locale: 'de-DE',
        pattern: 'dd.mm.yyyy',
        shortDate: '3.8.2004',
        cldr39Date: '03.08.2004',
        duration: '1 Tag 1 Stunde 1 Minute 1 Sekunde',
    },
    {
        locale: 'et-EE',
        pattern: 'dd.mm.yyyy',
        shortDate: '3.8.2004',
        cldr39Date: '3. aug 2004',
        duration: '1 ööpäev 1 tund 1 minut 1 sekund',
    },
    {
        locale: 'en-GB',
        pattern: 'dd/mm/yyyy',
        shortDate: '03/08/2004',
        cldr39Date: '3 Aug 2004',
        duration: '1 day 1 hour 1 minute 1 second',
    },
    {
        locale: 'en-US',
        pattern: 'mm/dd/yyyy',
        shortDate: '8/3/2004',
        cldr39Date: 'Aug 3, 2004',
        duration: '1 day 1 hour 1 minute 1 second',
    },
    {
        locale: 'es-ES',
        pattern: 'dd/mm/yyyy',
        shortDate: '3/8/2004',
        cldr39Date: '3 ago 2004',
        duration: '1 día 1 hora 1 minuto 1 segundo',
    },
    {
        locale: 'fr-FR',
        pattern: 'dd/mm/yyyy',
        shortDate: '03/08/2004',
        cldr39Date: '3 août 2004',
        duration: '1 jour 1 heure 1 minute 1 seconde',
    },
    {
        locale: 'is-IS',
        pattern: 'dd.mm.yyyy',
        shortDate: '3.8.2004',
        cldr39Date: '3. ágú. 2004',
        duration: '1 dagur 1 klukkustund 1 mínúta 1 sekúnda',
    },
    {
        locale: 'it-IT',
        pattern: 'dd/mm/yyyy',
        shortDate: '03/08/2004',
        cldr39Date: '3 ago 2004',
        duration: '1 giorno 1 ora 1 minuto 1 secondo',
    },
    {
        locale: 'hu-HU',
        pattern: 'yyyy. mm. dd.',
        shortDate: '2004. 08. 03.',
        cldr39Date: '2004. aug. 3.',
        duration: '1 nap 1 óra 1 perc 1 másodperc',
    },
    {
        locale: 'nl-NL',
        pattern: 'dd-mm-yyyy',
        shortDate: '3-8-2004',
        cldr39Date: '3 aug 2004',
        duration: '1 dag 1 uur 1 minuut 1 seconde',
    },
    {
        locale: 'no-NO',
        pattern: 'dd.mm.yyyy',
        shortDate: '3.8.2004',
        cldr39Date: '3. aug. 2004',
        duration: '1 døgn 1 time 1 minutt 1 sekund',
    },
    {
        locale: 'pl-PL',
        pattern: 'dd.mm.yyyy',
        shortDate: '3.08.2004',
        cldr39Date: '3 sie 2004',
        duration: '1 dzień 1 godzina 1 minuta 1 sekunda',
    },
    {
        locale: 'pt-BR',
        pattern: 'dd/mm/yyyy',
        shortDate: '03/08/2004',
        cldr39Date: '3 de ago. de 2004',
        duration: '1 dia 1 hora 1 minuto 1 segundo',
    },
    {
        locale: 'ro-RO',
        pattern: 'dd.mm.yyyy',
        shortDate: '03.08.2004',
        cldr39Date: '3 aug. 2004',
        duration: '1 zi 1 oră 1 minut 1 secundă',
    },
    {
        locale: 'sk-SK',
        pattern: 'dd. mm. yyyy',
        shortDate: '3. 8. 2004',
        cldr39Date: '3. 8. 2004',
        duration: '1 deň 1 hodina 1 minúta 1 sekunda',
    },
    {
        locale: 'fi-FI',
        pattern: 'dd.mm.yyyy',
        shortDate: '3.8.2004',
        cldr39Date: '3.8.2004',
        duration: '1 päivä 1 tunti 1 minuutti 1 sekunti',
    },
    {
        locale: 'sv-SE',
        pattern: 'yyyy-mm-dd',
        shortDate: '2004-08-03',
        cldr39Date: '3 aug. 2004',
        duration: '1 dygn 1 timme 1 minut 1 sekund',
    },
    {
        locale: 'ru-RU',
        pattern: 'dd.mm.yyyy',
        shortDate: '03.08.2004',
        cldr39Date: '3 авг. 2004 г.',
        duration: '1 день 1 час 1 минута 1 секунда',
    },
    {
        locale: 'zh-CN',
        pattern: 'yyyy/mm/dd',
        shortDate: '2004/8/3',
        cldr39Date: '2004年8月3日',
        duration: '1天 1小时 1分钟 1秒钟',
    },
    {
        locale: 'ja-JP',
        pattern: 'yyyy/mm/dd',
        shortDate: '2004/8/3',
        cldr39Date: '2004/08/03',
        duration: '1 日 1 時間 1 分 1 秒',
    },
    {
        locale: 'ko-KR',
        pattern: 'yyyy. mm. dd.',
        shortDate: '2004. 8. 3.',
        cldr39Date: '2004. 8. 3.',
        duration: '1일 1시간 1분 1초',
    },
];

describe('date-time', () => {
    test('should skip parse and return date', () => {
        const now = new Date('1986-01-15');
        expect(dateTime.parse(now)).toStrictEqual((dateTime.parse(now)));
    });

    test('should parse plain date string', () => {
        expect(dateTime.parse('2004-13-03')).toBe(null);
        expect(dateTime.parse('2004-8-32')).toBe(null);
        expect(dateTime.parse('2001-2-29')).toBe(null);
        expect(dateTime.parse('Zac Xu')).toBe(null);

        const date = new Date('2004-08-03');
        expect((dateTime.parse(date.getTime()) as Date).toISOString()).toBe('2004-08-03T00:00:00.000Z');
        expect(date.toISOString()).toStrictEqual(date.toISOString());
        expect(date.toISOString()).toStrictEqual('2004-08-03T00:00:00.000Z');
        date.setHours(date.getHours() + date.getTimezoneOffset() / 60);
        expect((dateTime.parse('2004-08-03') as Date).toISOString()).toStrictEqual(date.toISOString());
    });

    test('should validate ISO date string', () => {
        expect(dateTime.validate('2004-8-3')).toBeTruthy();
        expect(dateTime.validate('2000-2-29')).toBeTruthy();
        expect(dateTime.validate('2004-08-03')).toBeTruthy();
        expect(dateTime.validate('2001-2-29')).toBe(false);
        expect(dateTime.validate('2004-13-03')).toBe(false);
        expect(dateTime.validate('2004-8-32')).toBe(false);
        expect(dateTime.validate('Zac Xu')).toBe(false);
    });

    test('should validate date string by locale', () => {
        dates.forEach((d) => {
            try {
                expect(dateTime.validate(d.shortDate, d.locale)).toBeTruthy();
            } catch (e) {
                throw new Error(`Expected: ${d.shortDate} is valid ${d.pattern} in: ${d.locale}`);
            }
        });
        expect(dateTime.validate('31/12/2022', 'en-GB')).toBeTruthy();
        expect(dateTime.validate('12/31/2022', 'en-GB')).toBe(false);
        expect(dateTime.validate('12/31/2022', 'en-US')).toBeTruthy();
        expect(dateTime.validate('31/12/2022', 'en-US')).toBe(false);
        expect(dateTime.validate('2022/12/31', 'zh-CN')).toBeTruthy();
        expect(dateTime.validate('31/12/2022', 'zh-CN')).toBe(false);
    });

    test('should get date pattern by locale', () => {
        dates.forEach((d) => {
            try {
                expect(dateTime.getDatePattern(d.locale)).toBe(d.pattern);
            } catch (e) {
                throw new Error(
                    `Expected: ${d.pattern} Received: ${dateTime.getDatePattern(d.locale)} in: ${d.locale}`
                );
            }
        });
    });

    test('should format short date by locale', () => {
        const date = new Date('2004-08-03');
        dates.forEach((d) => {
            try {
                expect(dateTime.formatNumericDate(date, d.locale)).toStrictEqual(d.shortDate);
            } catch (e) {
                throw new Error(
                    `Expected: ${d.shortDate} Received: ${dateTime.formatNumericDate(date, d.locale)} in: ${d.locale}`
                );
            }
        });
    });

    test('should format plain date', () => {
        const date = new Date('2024-02-12T14:30:00');
        expect(dateTime.formatPlainDate(date)).toBe('2024-02-12');
    });

    test('should format plain time', () => {
        const date = new Date('2024-02-12T14:30:00');
        expect(dateTime.formatPlainTime(date)).toBe('14:30:00');
    });

    test('should format plain date time', () => {
        const date = new Date('2024-02-12T14:30:00');
        expect(dateTime.formatPlainDateTime(date)).toBe('2024-02-12T14:30:00');
    });

    test('should format CLDR 39 date by locale', () => {
        const date = new Date('2004-08-03');
        dates.forEach((d) => {
            try {
                // Todo: Chrome_Headless_104_0_518_79_(Linux_x86_64) generates an incorrect format
                // remove Icelandic is-IS locale below once Chrome fixed Google Closure translation
                if (d.locale === 'is-IS') {
                    expect(dateTime.formatDate(date, d.locale)).toStrictEqual(d.shortDate);
                } else {
                    expect(dateTime.formatDate(date, d.locale)).toStrictEqual(d.cldr39Date);
                }
            } catch (e) {
                throw new Error(
                    `Expected: ${d.cldr39Date} Received: ${dateTime.formatDate(date, d.locale)} in: ${d.locale}`
                );
            }
        });
    });

    test('should format time by locale', () => {
        expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'en-GB')).toStrictEqual('04:00:00');
        expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'en-US')).toStrictEqual('4:00:00 AM');
        expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'cs-CZ')).toStrictEqual('4:00:00');
        expect(dateTime.formatTime(new Date(2004, 7, 3, 4), 'zh-CN')).toStrictEqual('04:00:00');
    });

    test('should format date time by locale', () => {
        expect(dateTime.formatDateTime(new Date(2004, 7, 3, 4), 'en-GB')).toStrictEqual('3 Aug 2004, 04:00:00');
        expect(dateTime.formatDateTime(new Date(2004, 7, 3, 4), 'en-US')).toStrictEqual('Aug 3, 2004, 4:00:00 AM');
        expect(dateTime.formatDateTime(new Date(2004, 7, 3, 4), 'cs-CZ')).toStrictEqual('3. 8. 2004 4:00:00');
        expect(dateTime.formatDateTime(new Date(2004, 7, 3, 4), 'zh-CN')).toStrictEqual('2004年8月3日 04:00:00');
    });

    test('should format date time by options', () => {
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'en-GB')).toStrictEqual(
            '3 Aug 2004, 04:00',
        );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'en-US')).toStrictEqual(
            'Aug 3, 2004, 4:00 AM',
        );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'cs-CZ')).toStrictEqual(
            '3. 8. 2004 4:00',
        );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'is-IS')).toStrictEqual(
            '3.8.2004, 04:00',
            );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'de-DE')).toStrictEqual(
            '03.08.2004, 04:00',
        );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'zh-CN')).toStrictEqual(
            '2004年8月3日 04:00',
        );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'ja-JP')).toStrictEqual(
            '2004/08/03 4:00',
        );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'ko-KR')).toStrictEqual(
            '2004. 8. 3. 오전 4:00',
        );
        expect(dateTime.formatDateTimeByOptions({second: undefined}, new Date(2004, 7, 3, 4), 'fi-FI')).toStrictEqual(
            '3.8.2004 klo 4.00',
        );
    });

    test('should format duration', () => {
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 2, 1, 1, 1, 1), 'en-US')).toStrictEqual(
            '1 day 1 hour 1 minute 1 second'
        );
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 3, 2, 2, 2, 2), 'en-GB')).toStrictEqual(
            '2 days 2 hours 2 minutes 2 seconds'
        );
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 1, 2, 2, 2, 2), 'en-GB')).toStrictEqual(
            '2 hours 2 minutes 2 seconds'
        );
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 1, 0, 2, 2, 2), 'en-GB')).toStrictEqual(
            '2 minutes 2 seconds'
        );
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 1, 0, 0, 2, 2), 'en-GB')).toStrictEqual(
            '2 seconds'
        );
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 1, 0, 0, 0, 2), 'en-GB')).toStrictEqual(
            '0 seconds'
        );
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 1, 0, 0, 0, 0), 'en-GB')).toStrictEqual(
            '0 seconds'
        );
        expect(dateTime.formatDuration(new Date(2000, 0, 1), new Date(2000, 0, 2, 1, 1, 1, 1), 'zh-CN')).toStrictEqual(
            '1天 1小时 1分钟 1秒钟'
        );
    });

    test('should format duration by locale', () => {
        const fromDate = new Date(2000, 0, 2);
        const toDate = new Date(2000, 0, 3, 1, 1, 1, 1);
        dates.forEach((d) => {
            try {
                expect(dateTime.formatDuration(fromDate, toDate, d.locale)).toStrictEqual(d.duration);
            } catch (e) {
                throw new Error(
                    `Expected: ${d.duration} Received: ${dateTime.formatDuration(fromDate, toDate, d.locale)} in: ${
                        d.locale
                    }`
                );
            }
        });
    });

    test('should not format duration', () => {
        expect(dateTime.formatDuration(new Date(2000, 0, 2), new Date(2000, 0, 1), 'en-US')).toStrictEqual('');
    });
});
