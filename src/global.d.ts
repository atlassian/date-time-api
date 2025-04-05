
/**
 * Represents the shape of a duration for use with Intl.DurationFormat.
 * All fields are optional and represent their respective time units.
 *
 * todo: remove Intl.DurationFormat types after this is closed
 * https://github.com/microsoft/TypeScript/issues/60608
 */
export type Duration = {
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

type DurationUnits = keyof Duration;

type DurationOptionUnits = {
  [K in DurationUnits as `${K}`]?: "long" | "short" | "narrow";
} & {
  [K in DurationUnits as `${K}Display`]?: "auto" | "always";
};

declare global {
  namespace Intl {
    interface DurationFormatOptions extends DurationOptionUnits {
      style?: "long" | "short" | "narrow" | "digital";
      fractionalDigits?: number;
    }

    const DurationFormat: {
      new (locales?: string | string[], options?: DurationFormatOptions): DurationFormat;
      supportedLocalesOf(locales: string | string[]): string[];
    };

    interface DurationFormat {
      format(duration: Duration): string;
      formatToParts(duration: Duration): Array<{ type: string; value: string }>;
      resolvedOptions(): {
        locale: string;
        numberingSystem: string;
        style: "long" | "short" | "narrow" | "digital";
        [K in DurationUnits as `${K}`]?: "long" | "short" | "narrow";
        [K in DurationUnits as `${K}Display`]?: "auto" | "always";
      };
    }
  }
}

export {};
