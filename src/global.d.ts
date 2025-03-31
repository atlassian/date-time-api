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
    microseconds?: number;
    nanoseconds?: number;
  };

  namespace Intl {
    interface DurationFormatOptions {
      style?: "long" | "short" | "narrow" | "digital";
      fractionalDigits?: number;
      years?: "long" | "short" | "narrow";
      yearsDisplay?: "auto" | "always";
      months?: "long" | "short" | "narrow";
      monthsDisplay?: "auto" | "always";
      weeks?: "long" | "short" | "narrow";
      weeksDisplay?: "auto" | "always";
      days?: "long" | "short" | "narrow";
      daysDisplay?: "auto" | "always";
      hours?: "long" | "short" | "narrow";
      hoursDisplay?: "auto" | "always";
      minutes?: "long" | "short" | "narrow";
      minutesDisplay?: "auto" | "always";
      seconds?: "long" | "short" | "narrow";
      secondsDisplay?: "auto" | "always";
      milliseconds?: "long" | "short" | "narrow";
      millisecondsDisplay?: "auto" | "always";
      microseconds?: "long" | "short" | "narrow";
      microsecondsDisplay?: "auto" | "always";
      nanoseconds?: "long" | "short" | "narrow";
      nanosecondsDisplay?: "auto" | "always";
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
        numberingSystem: string;
        style: "long" | "short" | "narrow" | "digital";
        years?: "long" | "short" | "narrow";
        yearsDisplay?: "auto" | "always";
        months?: "long" | "short" | "narrow";
        monthsDisplay?: "auto" | "always";
        weeks?: "long" | "short" | "narrow";
        weeksDisplay?: "auto" | "always";
        days?: "long" | "short" | "narrow";
        daysDisplay?: "auto" | "always";
        hours?: "long" | "short" | "narrow";
        hoursDisplay?: "auto" | "always";
        minutes?: "long" | "short" | "narrow";
        minutesDisplay?: "auto" | "always";
        seconds?: "long" | "short" | "narrow";
        secondsDisplay?: "auto" | "always";
        milliseconds?: "long" | "short" | "narrow";
        millisecondsDisplay?: "auto" | "always";
        microseconds?: "long" | "short" | "narrow";
        microsecondsDisplay?: "auto" | "always";
        nanoseconds?: "long" | "short" | "narrow";
        nanosecondsDisplay?: "auto" | "always";
      };
    }
  }
}

export {};
