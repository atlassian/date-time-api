// TypeScript does not yet have types for Intl.DurationFormat, so we need to add them manually
declare global {
  
  namespace Intl {
    interface DurationFormatOptions {
      localeMatcher?: 'lookup' | 'best fit';
      
      style?: 'long' | 'short' | 'narrow' | 'digital';

      unitDisplay?: 'long' | 'short' | 'narrow';
      
      numberingSystem?: string;
      
      numberFormat?: Intl.NumberFormatOptions;

      years?: 'long' | 'short' | 'narrow';
      
      yearsDisplay?: 'always' | 'auto';
      
      months?: 'long' | 'short' | 'narrow';
      
      monthsDisplay?: 'always' | 'auto';
      
      weeks?: 'long' | 'short' | 'narrow';
      
      weeksDisplay?: 'always' | 'auto';
      
      days?: 'long' | 'short' | 'narrow';
      
      daysDisplay?: 'always' | 'auto';
      
      hours?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
      
      hoursDisplay?: 'always' | 'auto';
      
      minutes?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
      
      minutesDisplay?: 'always' | 'auto';
      
      seconds?: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit';
      
      secondsDisplay?: 'always' | 'auto';
      
      milliseconds?: 'long' | 'short' | 'narrow' | 'numeric';
      
      millisecondsDisplay?: 'always' | 'auto';
      
      microseconds?: 'long' | 'short' | 'narrow' | 'numeric';
      
      microsecondsDisplay?: 'always' | 'auto';
      
      nanoseconds?: 'long' | 'short' | 'narrow' | 'numeric';
      
      nanosecondsDisplay?: 'always' | 'auto';
      
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
      
      format(duration: Duration): string;
      
      formatToParts(duration: Duration): Array<{
        type: string;
        value: string;
      }>;
      
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