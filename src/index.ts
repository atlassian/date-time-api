import { Duration } from './global';

const getLocale = () => Intl.DateTimeFormat().resolvedOptions().locale;
const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export function parse(input: string | number | Date): Date | null {
    const date = new Date(input);

    if (new Date(input).toString() === 'Invalid Date' || Number.isNaN(new Date(input))) {
        return null;
    }

    if (typeof input === 'number' || input instanceof Date) {
        return date;
    }

    const dateParts = input.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const dateParsed = new Date(year, month, day);

    return dateParsed.getDate() === day ? dateParsed : null;
}

export function getDatePattern(locale = getLocale()) {
    const formatterInput = new Intl.DateTimeFormat(locale);
    let pattern = '';
    formatterInput.formatToParts().forEach((p) => {
        if (p.type === 'literal') {
            pattern += p.value;
        } else if (p.type === 'year') {
            pattern += 'yyyy';
        } else {
            pattern = pattern + p.type[0] + p.type[0];
        }
    });
    return pattern;
}

// todo: remove this and export validateIso8601 and validateByLocale instead
export function validate(dateString: string, locale = 'sv-SE') {
    if (typeof dateString !== 'string') {
        return false;
    }
    const dateNumbers = dateString.match(/\d+/g);
    if (!dateNumbers || dateNumbers.length < 3) {
        return false;
    }
    const dateLetters = getDatePattern(locale).match(/[dmy]+/g);
    if (!dateLetters || dateLetters.length < 3) {
        return false;
    }
    let year;
    let month;
    let day;
    dateLetters.forEach((d, index) => {
        if (dateLetters.includes('m')) {
            year = dateNumbers[index];
        }
        switch (d) {
            case 'mm':
                month = dateNumbers[index];
                break;
            case 'dd':
                day = dateNumbers[index];
                break;
            default:
                year = dateNumbers[index];
                break;
        }
    });

    return parse(`${year}-${month}-${day}`) || false;
}

export function validateIso8601(dateString: string) {
    return validate(dateString);
}

export function validateByLocale(dateString: string, locale = getLocale()) {
    return validate(dateString, locale);
}

export function formatPlainDate(date = new Date(), timeZone = getTimeZone()) {
    const [month, day, year] = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone,
    })
        .format(date)
        .split('/');

    return `${year}-${month}-${day}`;
}

export function formatPlainTime(date = new Date(), timeZone = getTimeZone()) {
    const timeZonedDate = new Date(date.toLocaleString(undefined, { timeZone }));
    const hours = timeZonedDate.getHours().toString().padStart(2, '0');
    const minutes = timeZonedDate.getMinutes().toString().padStart(2, '0');
    const seconds = timeZonedDate.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function formatPlainDateTime(date = new Date(), timeZone = getTimeZone()) {
    const formattedDate = formatPlainDate(date, timeZone);
    const formattedTime = formatPlainTime(date, timeZone);

    return `${formattedDate}T${formattedTime}`;
}

export function formatNumericDate(date = new Date(), locale = getLocale(), timeZone = getTimeZone()) {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timeZone,
    }).format(date);
}

function getDateOptionByLocal(locale: string, timeZone: string) {
    const twoDigitLocales = ['de-DE', 'ja-JP'];
    const numericLocales = ['fi-FI', 'ko-KR'];
    // todo: Chrome_Headless_104_0_518_79_(Linux_x86_64) generates an incorrect format
    // remove Icelandic is-IS locale below once Chrome fixed Google Closure translations
    numericLocales.push('is-IS');
    const year: 'numeric' | '2-digit' = 'numeric';
    let month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' = 'short';
    let day: 'numeric' | '2-digit' = 'numeric';
    if (numericLocales.includes(locale)) {
        month = 'numeric';
    } else if (twoDigitLocales.includes(locale)) {
        month = '2-digit';
        day = '2-digit';
    }
    return {
        year,
        month,
        day,
        timeZone,
    };
}

export function formatDate(date = new Date(), locale = getLocale(), timeZone = getTimeZone()) {
    const options = getDateOptionByLocal(locale, timeZone);
    return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatTime(date = new Date(), locale = getLocale(), timeZone = getTimeZone()) {
    return new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone,
    }).format(date);
}

export function formatDateTime(date = new Date(), locale = getLocale(), timeZone = getTimeZone()) {
    const options = getDateOptionByLocal(locale, timeZone);
    return new Intl.DateTimeFormat(locale, {
        ...options,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone,
    }).format(date);
}

export function formatDateTimeByOptions(
    options: Intl.DateTimeFormatOptions,
    date = new Date(),
    locale = getLocale(),
    timeZone = getTimeZone(),
) {
    if (!options) {
        throw new Error('Please use formatDateTime instead');
    }

    return new Intl.DateTimeFormat(locale, {
        ...getDateOptionByLocal(locale, timeZone),
        hour: 'numeric',
        minute: 'numeric',
        timeZone,
        ...options,
    }).format(date);
}

export function formatDuration(from: Date, to = new Date(), locale = getLocale()) {
    const options: Intl.DurationFormatOptions = { style: 'short' };
    return formatDurationByOptions(options, from, to, locale);
}

function isCjLocale(locale = getLocale()) {
    return locale.startsWith('zh') || locale.startsWith('ja');
}

function getNumberFormat(
    number: number,
    unit: string,
    unitDisplay: Intl.DurationFormatOptions['style'],
    locale = getLocale(),
) {
    return new Intl.NumberFormat(locale, {
        style: 'unit',
        unit,
        unitDisplay: unitDisplay === 'digital' ? 'short' : unitDisplay,
    }).format(number);
}

/**
 * todo: this implementation will be replaced by `Temporal.Duration` in future versions of JavaScript.
 * - Chromium & Edge 138 ❌ (Not supported)
 * - Safari TP ✅ (Supported)
 * - Firefox 140 Nightly ✅ (Supported)
 */
function getDuration(from: Date, to: Date): Duration {
    const secondInMs = 1000;
    const minuteInMs = 60 * secondInMs;
    const hourInMs = 60 * minuteInMs;
    const dayInMs = 24 * hourInMs;
    const diffMs = to.getTime() - from.getTime();

    return {
        days: Math.floor(diffMs / dayInMs),
        hours: Math.floor((diffMs % dayInMs) / hourInMs),
        minutes: Math.floor((diffMs % hourInMs) / minuteInMs),
        seconds: Math.floor((diffMs % minuteInMs) / secondInMs),
    };
}

function formatDurationFallback(duration: Duration, style: Intl.DurationFormatOptions['style'], locale = getLocale()) {
    const { days, hours, minutes, seconds } = duration;
    const unitDisplay = style === 'digital' ? 'short' : style;
    const parts = [];

    if (days) {
        parts.push(getNumberFormat(days, 'day', unitDisplay, locale));
    }
    if (hours) {
        parts.push(getNumberFormat(hours, 'hour', unitDisplay, locale));
    }
    if (minutes) {
        parts.push(getNumberFormat(minutes, 'minute', unitDisplay, locale));
    }
    if (seconds) {
        parts.push(getNumberFormat(seconds, 'second', unitDisplay, locale));
    }

    return parts.join(' ');
}

export function formatDurationByOptions(
    options: Intl.DurationFormatOptions,
    from: Date,
    to = new Date(),
    locale = getLocale(),
) {
    if (!options) {
        throw new Error('Please use formatDuration instead');
    }

    // Japanese locale needs to display unit as long, as narrow is wrong, returns english
    // "narrow" returns english on Chrome 134.0.6998.166 and Firefox 136.0.4, remove this once fixed
    if (locale === 'ja-JP') {
        options.style = 'long';
    }

    let durationString = '';
    const duration = getDuration(from, to);

    // Feature detection for Intl.DurationFormat, not supported in older browsers
    if ('DurationFormat' in Intl) {
        durationString = new Intl.DurationFormat(locale, options).format(duration);
        if (durationString == '' && duration.seconds !== undefined) {
            // Use legacy implementation if Intl.DurationFormat returns empty string (duration less than 1 second)
            // todo: remove this once smallestUnit/largestUnit and hideZeroValued is implemented
            // tc39/proposal-intl-duration-format#32
            durationString = getNumberFormat(duration.seconds, 'second', options.style, locale);
        }
    } else {
        durationString = formatDurationFallback(duration, options.style, locale);
    }

    // todo: remove CJK overrides once browsers removed wrong spaces. eg, '1 時間 1 秒'
    // Chrome 134.0.6998.166
    // Firefox 136.0.4
    // Safari 18.3.1
    if (isCjLocale(locale)) {
        return durationString.replace(/\s+/g, '');
    }
    return durationString;
}
