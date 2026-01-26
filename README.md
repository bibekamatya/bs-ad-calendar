# BS-AD Calendar

A modern React calendar component for seamless conversion between **Bikram Sambat (BS)** and **Gregorian (AD)** calendars.

[![npm version](https://img.shields.io/npm/v/bs-ad-calendar-react.svg)](https://www.npmjs.com/package/bs-ad-calendar-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Live Demo

[View Demo](https://bibekamatya.github.io/bs-ad-calendar/)

## Key Feature

**Select any date → Get both BS and AD dates automatically**

```
Input: Click Poush 15, 2081 (BS)
Output: { bs: "2081-09-15", ad: "2024-12-31", formatted: {...} }
```

## Features

- Automatic dual calendar conversion
- Single date and range selection
- Customizable themes and colors
- Nepali localization
- Keyboard navigation
- Responsive design
- TypeScript support
- Accessible (ARIA labels)

## Installation

```bash
npm install bs-ad-calendar-react
```

## Examples

### Basic Calendar

```tsx
import { Calendar } from 'bs-ad-calendar-react'

export default function App() {
  return (
    <Calendar
      calendarType="BS"
      onDateSelect={(date) => console.log(date)}
    />
  )
}
```

**Output:**
```
{
  bs: "2081-09-15",
  ad: "2024-12-31",
  formatted: {
    bs: "Poush 15, 2081",
    ad: "December 31, 2024"
  }
}
```

### Range Selection

```tsx
<Calendar
  calendarType="BS"
  mode="range"
  showRangePresets
  onRangeSelect={(range) => console.log(range)}
/>
```

**Output:**
```
{
  start: { year: 2081, month: 8, day: 1 },
  end: { year: 2081, month: 8, day: 30 }
}
```

### Range Presets with Filtering

```tsx
import { Calendar, PRESET_KEYS } from 'bs-ad-calendar-react'

<Calendar
  calendarType="BS"
  mode="range"
  showRangePresets
  rangePresetsPosition="left"
  presetKeys={[
    PRESET_KEYS.LAST_7_DAYS,
    PRESET_KEYS.LAST_30_DAYS,
    PRESET_KEYS.THIS_MONTH,
    PRESET_KEYS.LAST_MONTH
  ]}
  onRangeSelect={(range) => console.log(range)}
/>
```

### Custom Preset Labels

```tsx
import { Calendar, PRESET_KEYS } from 'bs-ad-calendar-react'

<Calendar
  calendarType="AD"
  mode="range"
  showRangePresets
  presetKeys={[
    PRESET_KEYS.LAST_7_DAYS,
    PRESET_KEYS.LAST_30_DAYS,
    PRESET_KEYS.THIS_MONTH
  ]}
  presetLabels={{
    [PRESET_KEYS.LAST_7_DAYS]: 'Past Week',
    [PRESET_KEYS.LAST_30_DAYS]: 'Past Month',
    [PRESET_KEYS.THIS_MONTH]: 'Current Month'
  }}
  onRangeSelect={(range) => console.log(range)}
/>
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

### Custom Colors

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

### Dark Theme

```tsx
<Calendar
  calendarType="BS"
  theme="dark"
  onDateSelect={(date) => console.log(date)}
/>
```

### Date Constraints

```tsx
<Calendar
  calendarType="AD"
  minDate="2024-01-01"
  maxDate="2024-12-31"
  onDateSelect={(date) => console.log(date)}
/>
```

### Disabled State

```tsx
<Calendar
  calendarType="BS"
  disabled
  onDateSelect={(date) => console.log(date)}
/>
```

## API Reference

### Calendar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `calendarType` | `'BS' \| 'AD'` | `'AD'` | Calendar type |
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode |
| `onDateSelect` | `(date: DateOutput) => void` | - | Date callback |
| `onRangeSelect` | `(range: DateRange) => void` | - | Range callback |
| `showToday` | `boolean` | `true` | Highlight today |
| `disabled` | `boolean` | `false` | Disable interaction |
| `minDate` | `string` | - | Min selectable date |
| `maxDate` | `string` | - | Max selectable date |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme |
| `colors` | `ColorConfig` | - | Custom colors |
| `showNepaliMonths` | `boolean` | `false` | Nepali months |
| `showNepaliDays` | `boolean` | `false` | Nepali days |
| `showNepaliNumbers` | `boolean` | `false` | Nepali numbers |
| `showRangePresets` | `boolean` | `false` | Show presets |
| `rangePresetsPosition` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Preset position |
| `presetKeys` | `string[]` | - | Filter presets |
| `presetLabels` | `Record<string, string>` | - | Rename presets |
| `predefinedRanges` | `PredefinedRange[]` | - | Custom presets |

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
import { PRESET_KEYS } from 'bs-ad-calendar-react'
```

## Available Preset Keys

```tsx
PRESET_KEYS.TODAY           // Today
PRESET_KEYS.YESTERDAY       // Yesterday
PRESET_KEYS.THIS_WEEK       // This Week
PRESET_KEYS.LAST_7_DAYS     // Last 7 Days
PRESET_KEYS.LAST_30_DAYS    // Last 30 Days
PRESET_KEYS.THIS_MONTH      // This Month
PRESET_KEYS.LAST_MONTH      // Last Month
PRESET_KEYS.LAST_3_MONTHS   // Last 3 Months
PRESET_KEYS.LAST_6_MONTHS   // Last 6 Months
PRESET_KEYS.LAST_9_MONTHS   // Last 9 Months
PRESET_KEYS.LAST_180_DAYS   // Last 180 Days
PRESET_KEYS.LAST_YEAR       // Last Year (12 months)
```

## License

MIT © [Bibek Amatya](https://github.com/bibekamatya)

## Links

- [GitHub](https://github.com/bibekamatya/bs-ad-calendar)
- [NPM](https://www.npmjs.com/package/bs-ad-calendar-react)
- [Demo](https://bibekamatya.github.io/bs-ad-calendar/)
