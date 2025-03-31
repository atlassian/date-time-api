// TypeScript does not yet have types for Intl.DurationFormat, so we need to add them manually
declare global {
  // Add declaration for globalThis to fix the error
  interface GlobalThis {
    document?: any;
  }
  
  namespace Intl {
    interface DurationFormatOptions {
      /**
       * The locale matching algorithm to use.
       */
      localeMatcher?: 'lookup' | 'best fit';
      
      /**
       * The length of the internationalized message.
       */
      style?: 'long' | 'short' | 'narrow' | 'digital';

      /**
       * The display style of the units.
       */
      unitDisplay?: 'long' | 'short' | 'narrow';
      
      /**
       * The numbering system to use.
       */
      numberingSystem?: string;
      
      /**
       * Options for formatting numeric values in the duration components.
       */
      numberFormat?: Intl.NumberFormatOptions;

      /**
       * The style of the formatted years.
       */
      years?: 'long' | 'short' | 'narrow';
      
      /**
       * Whether to always display years, or only if nonzero.
       */
      yearsDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted months.
       */
      months?: 'long' | 'short' | 'narrow';
      
      /**
       * Whether to always display months, or only if nonzero.
       */
      monthsDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted weeks.
       */
      weeks?: 'long' | 'short' | 'narrow';
      
      /**
       * Whether to always display weeks, or only if nonzero.
       */
      weeksDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted days.
       */
      days?: 'long' | 'short' | 'narrow';
      
      /**
       * Whether to always display days, or only if nonzero.
       */
      daysDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted hours.
       */
      hours?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
      
      /**
       * Whether to always display hours, or only if nonzero.
       */
      hoursDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted minutes.
       */
      minutes?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
      
      /**
       * Whether to always display minutes, or only if nonzero.
       */
      minutesDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted seconds.
       */
      seconds?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
      
      /**
       * Whether to always display seconds, or only if nonzero.
       */
      secondsDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted milliseconds.
       */
      milliseconds?: 'long' | 'short' | 'narrow' | 'numeric';
      
      /**
       * Whether to always display milliseconds, or only if nonzero.
       */
      millisecondsDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted microseconds.
       */
      microseconds?: 'long' | 'short' | 'narrow' | 'numeric';
      
      /**
       * Whether to always display microseconds, or only if nonzero.
       */
      microsecondsDisplay?: 'always' | 'auto';
      
      /**
       * The style of the formatted nanoseconds.
       */
      nanoseconds?: 'long' | 'short' | 'narrow' | 'numeric';
      
      /**
       * Whether to always display nanoseconds, or only if nonzero.
       */
      nanosecondsDisplay?: 'always' | 'auto';
      
      /**
       * Number of how many fractional second digits to display in the output.
       * Possible values are from 0 to 9.
       */
      fractionalDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    }

    interface Duration {
      years?: number;
      months?: number;
      weeks?: number;
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
      milliseconds?: number;
      microseconds?: number;
      nanoseconds?: number;
    }
    
    class DurationFormat {
      constructor(locales?: string | string[], options?: DurationFormatOptions);
      
      /**
       * Formats a duration according to the locale and formatting options.
       */
      format(duration: Duration): string;
      
      /**
       * Returns an array of objects containing the formatted duration in parts.
       */
      formatToParts(duration: Duration): Array<{
        type: string;
        value: string;
      }>;
      
      /**
       * Returns a language-sensitive string representation of the duration.
       */
      resolvedOptions(): Readonly<DurationFormatOptions>;
      
      static supportedLocalesOf(
        locales: string | string[], 
        options?: { localeMatcher?: 'lookup' | 'best fit' }
      ): string[];
    }
  }
}

// This empty export makes this file a module, which is required for the global augmentation to work
export {};

// export interface DurationFormatOptions {
//     localeMatcher?: 'lookup' | 'best fit';
//     style?: 'long' | 'short' | 'narrow' | 'digital';
//     unitDisplay?: 'long' | 'short' | 'narrow';
//     numberingSystem?: string;
//     numberFormat?: Intl.NumberFormatOptions;
//     years?: 'long' | 'short' | 'narrow';
//     yearsDisplay?: 'always' | 'auto';
//     months?: 'long' | 'short' | 'narrow';
//     monthsDisplay?: 'always' | 'auto';
//     weeks?: 'long' | 'short' | 'narrow';
//     weeksDisplay?: 'always' | 'auto';
//     days?: 'long' | 'short' | 'narrow';
//     daysDisplay?: 'always' | 'auto';
//     hours?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
//     hoursDisplay?: 'always' | 'auto';
//     minutes?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
//     minutesDisplay?: 'always' | 'auto';
//     seconds?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
//     secondsDisplay?: 'always' | 'auto';
//     milliseconds?: 'long' | 'short' | 'narrow' | 'numeric';
//     millisecondsDisplay?: 'always' | 'auto';
//     microseconds?: 'long' | 'short' | 'narrow' | 'numeric';
//     microsecondsDisplay?: 'always' | 'auto';
//     nanoseconds?: 'long' | 'short' | 'narrow' | 'numeric';
//     nanosecondsDisplay?: 'always' | 'auto';
//     fractionalDigits?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
// }

// export interface Duration {
//     years?: number;
//     months?: number;
//     weeks?: number;
//     days?: number;
//     hours?: number;
//     minutes?: number;
//     seconds?: number;
//     milliseconds?: number;
//     microseconds?: number;
//     nanoseconds?: number;
// }

// declare global {
//     namespace Intl {
//         interface DurationFormatOptions extends DurationFormatOptions {}
//         interface Duration extends Duration {}
//     }
// } 