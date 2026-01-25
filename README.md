# BS-AD Calendar

A modern React calendar component for seamless conversion between **Bikram Sambat (BS)** and **Gregorian (AD)** calendars.

[![npm version](https://img.shields.io/npm/v/bs-ad-calendar-react.svg)](https://www.npmjs.com/package/bs-ad-calendar-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Live Demo

[View Demo](https://bibekamatya.github.io/bs-ad-calendar/)

## Key Feature

**Select any date → Get both BS and AD dates automatically**

When you click a date on either calendar, you instantly receive both the BS and AD equivalents with formatted output.

**Example Output:**
```
Input: Click on Poush 15, 2081 (BS Calendar)

Output:
{
  bs: "2081-09-15",
  ad: "2024-12-31",
  formatted: {
    bs: "Poush 15, 2081",
    ad: "December 31, 2024"
  }
}
```

## Features

- Automatic dual calendar conversion
- Single date and range selection modes
- Customizable themes (light/dark)
- Nepali localization support
- Full keyboard navigation
- Responsive design
- Complete TypeScript support
- Accessible (ARIA labels)

## Installation

```bash
npm install bs-ad-calendar-react
```

## Quick Start

### Basic Usage

```tsx
import { Calendar } from 'bs-ad-calendar-react'

export default function App() {
  return (
    <Calendar
      calendarType="BS"
      onDateSelect={(date) => {
        console.log(date.bs)           // "2081-09-15"
        console.log(date.ad)           // "2024-12-31"
        console.log(date.formatted.bs) // "Poush 15, 2081"
        console.log(date.formatted.ad) // "December 31, 2024"
      }}
    />
  )
}
```

### DatePicker Input

```tsx
import { DatePicker } from 'bs-ad-calendar-react'

export default function App() {
  return (
    <DatePicker
      calendarType="AD"
      placeholder="Select a date"
      onDateSelect={(date) => console.log(date)}
    />
  )
}
```

### Range Selection

```tsx
import { Calendar } from 'bs-ad-calendar-react'

export default function App() {
  return (
    <Calendar
      calendarType="BS"
      mode="range"
      showRangePresets
      onRangeSelect={(range) => console.log(range)}
    />
  )
}
```

## API Reference

### Calendar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `calendarType` | `'BS' \| 'AD'` | `'AD'` | Calendar type |
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `onDateSelect` | `(date: DateOutput) => void` | - | Date selection callback |
| `onRangeSelect` | `(range: DateRange) => void` | - | Range selection callback |
| `showToday` | `boolean` | `true` | Highlight today |
| `disabled` | `boolean` | `false` | Disable interaction |
| `minDate` | `string` | - | Min selectable date |
| `maxDate` | `string` | - | Max selectable date |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `colors` | `ColorConfig` | - | Custom colors |
| `showNepaliMonths` | `boolean` | `false` | Nepali month names |
| `showNepaliDays` | `boolean` | `false` | Nepali day names |
| `showNepaliNumbers` | `boolean` | `false` | Nepali numerals |
| `showRangePresets` | `boolean` | `false` | Show preset buttons |

### DatePicker Props

Extends Calendar props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Select date'` | Input placeholder |
| `inputClassName` | `string` | - | Input CSS class |
| `popupClassName` | `string` | - | Popup CSS class |

### Output Format

```tsx
{
  bs: "2081-09-15",
  ad: "2024-12-31",
  formatted: {
    bs: "Poush 15, 2081",
    ad: "December 31, 2024"
  }
}
```

## Examples

### Custom Theme

```tsx
<Calendar
  calendarType="BS"
  colors={{
    primary: '#10b981',
    selected: '#059669',
    today: '#d1fae5'
  }}
  onDateSelect={(date) => console.log(date)}
/>
```

### Nepali Localization

```tsx
<Calendar
  calendarType="BS"
  showNepaliMonths
  showNepaliDays
  showNepaliNumbers
  onDateSelect={(date) => console.log(date)}
/>
```

### Date Range

```tsx
<Calendar
  calendarType="BS"
  mode="range"
  minDate="2024-01-01"
  maxDate="2024-12-31"
  onRangeSelect={(range) => console.log(range)}
/>
```

## Keyboard Navigation

- Arrow Left/Right - Navigate months
- Arrow Up/Down - Navigate years
- PageUp/PageDown - Navigate months
- Shift + PageUp/PageDown - Navigate years

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## TypeScript

```tsx
import type { DateOutput, DateRange, CalendarProps } from 'bs-ad-calendar-react'
```

## License

MIT © [Bibek Amatya](https://github.com/bibekamatya)

## Links

- [GitHub](https://github.com/bibekamatya/bs-ad-calendar)
- [NPM](https://www.npmjs.com/package/bs-ad-calendar-react)
- [Demo](https://bibekamatya.github.io/bs-ad-calendar/)
