# Date Time API

[![Atlassian license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square)](LICENSE) [![npm version](https://img.shields.io/npm/v/@atlassian/date-time.svg?style=flat-square)](https://www.npmjs.com/package/@atlassian/date-time) [![workflow status](https://github.com/atlassian/date-time-api/actions/workflows/release.yml/badge.svg?event=push)](https://github.com/atlassian/date-time-api/actions/workflows/release.yml?query=event%3Apush) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

## Introduction

The Date Time API is a comprehensive library designed to simplify date and time manipulation in JavaScript. It provides a wide range of utilities for parsing, validating and formatting dates and times, making it easier for developers to handle date-time operations in their applications.

## Usage

```javascript
import * as dateTime from '@atlassian/date-time';

// Parse a date string
const date = dateTime.parse('2024-01-01');
console.log(date); // Outputs: "Mon Jan 01 2024 00:00:00 GMT+0000 (Coordinated Universal Time)"

// Get date pattern
const pattern = dateTime.getDatePattern('en-US');
console.log(pattern); // Outputs: "mm/dd/yyyy"

// Validate a date string
const isValid = dateTime.validate('2024-01-01');
console.log(isValid); // Outputs: true

// Format a plain date
const plainDate = dateTime.formatPlainDate(new Date());
console.log(plainDate); // Outputs: "2024-01-01"

// Format a plain time
const plainTime = dateTime.formatPlainTime(new Date());
console.log(plainTime); // Outputs: "12:00:00"

// Format a plain date-time
const plainDateTime = dateTime.formatPlainDateTime(new Date());
console.log(plainDateTime); // Outputs: "2024-01-01T12:00:00"

// Format a numeric date
const numericDate = dateTime.formatNumericDate(new Date(), 'en-US');
console.log(numericDate); // Outputs: "1/1/2024"

// Format a date
const formattedDate = dateTime.formatDate(new Date(), 'en-US');
console.log(formattedDate); // Outputs: "Jan 1, 2024"

// Format a time
const formattedTime = dateTime.formatTime(new Date(), 'en-US');
console.log(formattedTime); // Outputs: "12:00:00 PM"

// Format a date-time
const formattedDateTime = dateTime.formatDateTime(new Date(), 'en-US');
console.log(formattedDateTime); // Outputs: "Jan 1, 2024, 12:00:00 PM"

// Format a date-time with options
const formattedDateTimeWithOptions = dateTime.formatDateTimeByOptions({ second: undefined }, new Date(), 'en-US');
console.log(formattedDateTimeWithOptions); // Outputs: "Jan 1, 2024, 12:00 PM"

// Format a duration
const duration = dateTime.formatDuration(new Date(2024, 0, 1), new Date(2024, 0, 2), 'en-US');
console.log(duration); // Outputs: "1 day 1 hour 1 minute 1 second"
```

## Installation

To install the Date Time API, use npm:

```bash
npm install @atlassian/date-time
```

## Build

To build the Date Time API, use npm:

```bash
npm run build
```

## Tests

To run the tests, use the following command:

```bash
npm test
```

## Contributions

Contributions to Date Time API are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Copyright (c) 2024 Atlassian US., Inc.
Apache 2.0 licensed, see [LICENSE](LICENSE) file.

<br/>

[![With ❤️ from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-cheers.png)](https://www.atlassian.com)
