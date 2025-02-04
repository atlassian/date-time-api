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

export function formatPlainDate(date = new Date()) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function formatPlainTime(date = new Date()) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function formatPlainDateTime(date = new Date()) {
    const formattedDate = formatPlainDate(date);
    const formattedTime = formatPlainTime(date);

    return `${formattedDate}T${formattedTime}`;
}

export function formatNumericDate(date = new Date(), locale = getLocale()) {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(date);
}

function getDateOptionByLocal(locale: string) {
    const twoDigitLocales = ['de-DE', 'ja-JP'];
    const numericLocales = ['fi-FI', 'ko-KR'];
    // Todo: Chrome_Headless_104_0_518_79_(Linux_x86_64) generates an incorrect format
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
    };
}

export function formatDate(date = new Date(), locale = getLocale()) {
    const options = getDateOptionByLocal(locale);
    return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatTime(date = new Date(), locale = getLocale()) {
    return new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(date);
}

export function formatDateTime(date = new Date(), locale = getLocale()) {
    const options = getDateOptionByLocal(locale);
    return new Intl.DateTimeFormat(locale, {
        ...options,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(date);
}

export function formatDateTimeByOptions(options: Intl.DateTimeFormatOptions, date = new Date(), locale = getLocale()) {
    if (!options) {
        throw new Error('Please use formatDateTime instead');
    }

    return new Intl.DateTimeFormat(locale, {
        ...getDateOptionByLocal(locale),
        hour: 'numeric',
        minute: 'numeric',
        ...options,
    }).format(date);
}

export function formatDuration(from: Date, to = new Date(), locale = getLocale()) {
    const milliseconds = to.getTime() - from.getTime();
    if (milliseconds < 0) {
        return '';
    }
    const dayInMs = 24 * 60 * 60 * 1000;
    const hourInMs = 60 * 60 * 1000;
    const minuteInMs = 60 * 1000;
    const secondInMs = 1000;

    const days = Math.floor(milliseconds / dayInMs);
    const hours = Math.floor((milliseconds - days * dayInMs) / hourInMs);
    const minutes = Math.floor((milliseconds - days * dayInMs - hours * hourInMs) / minuteInMs);
    const seconds = Math.floor((milliseconds - days * dayInMs - hours * hourInMs - minutes * minuteInMs) / secondInMs);

    const getNumberFormat = (unit: string, number: number | bigint) =>
        new Intl.NumberFormat(locale, {
            style: 'unit',
            unitDisplay: 'long',
            unit,
        }).format(number);

    let result = '';
    if (days) {
        result = getNumberFormat('day', days);
    }
    if (hours) {
        result = `${result ? `${result} ` : ''}${getNumberFormat('hour', hours)}`;
    }
    if (minutes) {
        result = `${result ? `${result} ` : ''}${getNumberFormat('minute', minutes)}`;
    }

    result = `${result ? `${result} ` : ''}${getNumberFormat('second', seconds)}`;
    return result;
}
