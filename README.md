# Date Time API

[![Atlassian license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@atlassian/date-time.svg?style=flat-square)](https://www.npmjs.com/package/@atlassian/date-time)
[![CI](https://github.com/atlassian/date-time-api/actions/workflows/ci.yml/badge.svg)](https://github.com/atlassian/date-time-api/actions/workflows/ci.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

A comprehensive library for date and time manipulation in JavaScript. Provides utilities for parsing, validating, and formatting dates and times.

## Installation

```bash
npm install @atlassian/date-time
```

## Usage

```javascript
import * as dateTime from "@atlassian/date-time";
```

### Parsing & Validation

```javascript
dateTime.parse("2024-01-01");
// → Mon Jan 01 2024 00:00:00 GMT+0000

dateTime.validate("2024-01-01");
// → true

dateTime.getDatePattern("en-US");
// → "mm/dd/yyyy"
```

### Formatting Dates & Times

```javascript
dateTime.formatPlainDate(new Date());
// → "2024-01-01"

dateTime.formatPlainTime(new Date());
// → "12:00:00"

dateTime.formatPlainDateTime(new Date());
// → "2024-01-01T12:00:00"
```

### Locale-aware Formatting

```javascript
dateTime.formatNumericDate(new Date(), "en-US");
// → "1/1/2024"

dateTime.formatDate(new Date(), "en-US");
// → "Jan 1, 2024"

dateTime.formatTime(new Date(), "en-US");
// → "12:00:00 PM"

dateTime.formatDateTime(new Date(), "en-US");
// → "Jan 1, 2024, 12:00:00 PM"

dateTime.formatDateTimeByOptions({ second: undefined }, new Date(), "en-US");
// → "Jan 1, 2024, 12:00 PM"
```

### Duration Formatting

```javascript
dateTime.formatDuration(new Date(2024, 0, 1), new Date(2024, 0, 2), "en-US");
// → "1 day 1 hour 1 minute 1 second"

dateTime.formatDurationByOptions({ unitDisplay: "narrow" }, new Date(2024, 0, 1), new Date(2024, 0, 2), "en-US");
// → "1d 1h 1m 1s"
```

## Development

```bash
npm run typecheck    # Type checking
npm run lint         # ESLint + Prettier check
npm run format       # Auto-fix lint + format
npm test             # Run unit tests
npm run build        # Build for production
npm run checks       # Run all checks
```

## Contributions

Contributions to Date Time API are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Copyright (c) 2024 Atlassian US., Inc.
Apache 2.0 licensed, see [LICENSE](LICENSE) file.

<br/>

[![With ❤️ from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-cheers.png)](https://www.atlassian.com)
