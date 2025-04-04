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

export function formatPlainDate(date = new Date(), timeZone = getTimeZone()) {
    const [month, day, year] = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone,
    }).format(date).split('/');

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

export function formatDateTimeByOptions(options: Intl.DateTimeFormatOptions, date = new Date(), locale = getLocale(), timeZone = getTimeZone()) {
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
    const options: Intl.DurationFormatOptions = { style: 'long' };
    return formatDurationByOptions(options, from, to, locale);
}

export function formatDurationByOptions(options: Intl.DurationFormatOptions, from: Date, to = new Date(), locale = getLocale()) {
    if (!options) {
        throw new Error('Please use formatDuration instead');
    }

    // Legacy implementation
    const getNumberFormat = (unit: string, number: number | bigint) => {
        return new Intl.NumberFormat(locale, {
            style: "unit",
            unit,
            unitDisplay: options.style === 'long' ? 'long' : 'narrow'
        }).format(number);
    }

    const milliseconds = to.getTime() - from.getTime();

    const isCJKLocale = locale.startsWith('zh') || locale.startsWith('ja') || locale.startsWith('ko');
    // Japanese locale needs to display unit as long, as narrow is wrong, returns english
    // "narrow" returns english on Chrome 134.0.6998.166 and Firefox 136.0.4, remove this once fixed
    if (locale === 'ja-JP') {
        options.style = 'long';
    }

    const dayInMs = 24 * 60 * 60 * 1000;
    const hourInMs = 60 * 60 * 1000;
    const minuteInMs = 60 * 1000;
    const secondInMs = 1000;
   

    const days = Math.floor(milliseconds / dayInMs);
    const hours = Math.floor((milliseconds - days * dayInMs) / hourInMs);
    const minutes = Math.floor((milliseconds - days * dayInMs - hours * hourInMs) / minuteInMs);
    const seconds = Math.floor((milliseconds - days * dayInMs - hours * hourInMs - minutes * minuteInMs) / secondInMs);

    // Feature detection for Intl.DurationFormat, not supported in older browsers
    if ('DurationFormat' in Intl) {
        try {
            const duration = {
                days,
                hours,
                minutes,
                seconds
            };
            let durationString = new Intl.DurationFormat(locale, options).format(duration);
            if (durationString === '') {
                // Use legacy implementation if Intl.DurationFormat returns empty string (duration less than 1 second)
                durationString = getNumberFormat('second', seconds);
            }
            if (isCJKLocale) {
                durationString = durationString.normalize('NFD').replace(/\s+/g, '');
            }
            return durationString;
        } catch (error) {
            console.warn('Intl.DurationFormat failed, falling back to custom implementation', error);
            // Fall through to legacy implementation
        }
    }

    const parts = [];
    
    if (days) {
        parts.push(getNumberFormat('day', days));
    }
    if (hours) {
        parts.push(getNumberFormat('hour', hours));
    }
    if (minutes) {
        parts.push(getNumberFormat('minute', minutes));
    } 
    parts.push(getNumberFormat('second', seconds));

    // Normalize and replace spaces
    let result = parts.join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ');

    if (isCJKLocale) {
        return result.replace(/\s+/g, '');
    }
    
    return result;
}
