declare global {
  type Duration = {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  };

  namespace Intl {
    interface DurationFormatOptions {
      style?: "long" | "short" | "narrow" | "digital";
      notation?: "standard" | "scientific" | "engineering" | "compact";
      localeMatcher?: "lookup" | "best fit";
      numberingSystem?: string;
      unitDisplay?: "long" | "short" | "narrow";
      fractionalDigits?: number;
    }

    var DurationFormat: {
      new (locales?: string | string[], options?: Intl.DurationFormatOptions): Intl.DurationFormat;
      supportedLocalesOf(locales: string | string[]): string[];
    };

    interface DurationFormat {
      format(duration: Duration): string;
      formatToParts(duration: Duration): Array<{ type: string; value: string }>;
      resolvedOptions(): {
        locale: string;
        style: string;
        notation: string;
        numberingSystem: string;
        [key: string]: any;
      };
    }
  }
}

export {};
