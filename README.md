# BS-AD Calendar

A modern, feature-rich React calendar component supporting both **Bikram Sambat (BS)** and **Gregorian (AD)** calendars with full TypeScript support.

[![npm version](https://img.shields.io/npm/v/bs-ad-calendar-react.svg)](https://www.npmjs.com/package/bs-ad-calendar-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎯 [Live Demo](https://bibekamatya.github.io/bs-ad-calendar/)

## Features

✨ **Dual Calendar Support** - Switch between BS (Nepali) and AD (Gregorian) calendars  
🎨 **Customizable Themes** - Light/dark themes with custom color support  
📅 **Date & Range Selection** - Single date or date range selection modes  
🌏 **Localization** - Nepali months, days, and number support  
⌨️ **Keyboard Navigation** - Full keyboard accessibility  
📱 **Responsive Design** - Works on all screen sizes  
🎯 **DatePicker Component** - Input field with popup calendar  
🔧 **TypeScript** - Full type definitions included  
♿ **Accessible** - ARIA labels and keyboard navigation

## Installation

```bash
npm install bs-ad-calendar-react
```

```bash
yarn add bs-ad-calendar-react
```

```bash
pnpm add bs-ad-calendar-react
```

## Quick Start

### Basic Calendar

```tsx
import { Calendar } from 'bs-ad-calendar-react'

function App() {
  return (
    <Calendar
      calendarType="BS"
      onDateSelect={(date) => console.log(date)}
    />
  )
}
```

### DatePicker with Input

```tsx
import { DatePicker } from 'bs-ad-calendar-react'

function App() {
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

function App() {
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
| `onDateSelect` | `(date: DateOutput) => void` | - | Single date selection callback |
| `onRangeSelect` | `(range: DateRange) => void` | - | Range selection callback |
| `showToday` | `boolean` | `true` | Highlight today's date |
| `disabled` | `boolean` | `false` | Disable calendar interaction |
| `minDate` | `string` | - | Minimum selectable date (ISO format) |
| `maxDate` | `string` | - | Maximum selectable date (ISO format) |
| `theme` | `'light' \| 'dark' \| 'custom'` | `'light'` | Theme variant |
| `colors` | `ColorConfig` | - | Custom color configuration |
| `showNepaliMonths` | `boolean` | `false` | Show Nepali month names |
| `showNepaliDays` | `boolean` | `false` | Show Nepali day names |
| `showNepaliNumbers` | `boolean` | `false` | Show Nepali numerals |
| `showRangePresets` | `boolean` | `false` | Show range preset buttons |
| `predefinedRanges` | `PredefinedRange[]` | - | Custom range presets (replaces defaults) |
| `rangePresetsPosition` | `'top' \| 'left'` | `'top'` | Position of range presets |
| `className` | `string` | - | Additional CSS class |

### DatePicker Props

Extends all Calendar props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Select date'` | Input placeholder text |
| `inputClassName` | `string` | - | Input container CSS class |
| `popupClassName` | `string` | - | Popup calendar CSS class |

### Color Configuration

```tsx
colors={{
  primary: '#3b82f6',      // Primary accent color
  selected: '#3b82f6',     // Selected date background
  today: '#dbeafe',        // Today's date background
  hover: '#eff6ff',        // Hover state background
  background: '#ffffff',   // Calendar background
  text: '#1f2937',        // Text color
  border: '#e5e7eb',      // Border color
  disabled: '#d1d5db'     // Disabled date color
}}
```

### Date Output Format

```tsx
{
  bs: "2081-09-15",           // BS date (ISO format)
  ad: "2024-12-31",           // AD date (ISO format)
  formatted: {
    bs: "Poush 15, 2081",     // Formatted BS date
    ad: "December 31, 2024"   // Formatted AD date
  }
}
```

### Range Output Format

```tsx
{
  start: { year: 2081, month: 8, day: 1 },
  end: { year: 2081, month: 8, day: 30 }
}
```

## Examples

### Custom Colors

```tsx
<Calendar
  calendarType="BS"
  colors={{
    primary: '#10b981',
    selected: '#059669',
    today: '#d1fae5',
    hover: '#ecfdf5'
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

### Date Constraints

```tsx
<Calendar
  calendarType="AD"
  minDate="2024-01-01"
  maxDate="2024-12-31"
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

### Custom Range Presets

```tsx
<Calendar
  calendarType="BS"
  mode="range"
  showRangePresets
  predefinedRanges={[
    {
      label: 'Last 30 Days',
      key: 'last-30-days',
      getValue: (type) => ({
        start: { year: 2081, month: 8, day: 1 },
        end: { year: 2081, month: 8, day: 30 }
      })
    },
    {
      label: 'Last 180 Days',
      key: 'last-180-days',
      getValue: (type) => ({
        start: { year: 2081, month: 2, day: 1 },
        end: { year: 2081, month: 8, day: 30 }
      })
    }
  ]}
  onRangeSelect={(range) => console.log(range)}
/>
```

**Note:** Pass `predefinedRanges` to replace default presets. If not provided, default presets (Today, Yesterday, Last 7 Days, Last 30 Days, etc.) will be used.

## Keyboard Navigation

- **Arrow Left/Right**: Navigate months
- **Arrow Up/Down**: Navigate years
- **PageUp/PageDown**: Navigate months
- **Shift + PageUp/PageDown**: Navigate years
- **Tab**: Navigate between interactive elements

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { 
  DateInfo, 
  DateRange, 
  DateOutput, 
  CalendarProps 
} from 'bs-ad-calendar-react'
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Bibek Amatya](https://github.com/bibekamatya)

## Links

- [GitHub Repository](https://github.com/bibekamatya/bs-ad-calendar)
- [NPM Package](https://www.npmjs.com/package/bs-ad-calendar-react)
- [Live Demo](https://bibekamatya.github.io/bs-ad-calendar/)
- [Report Issues](https://github.com/bibekamatya/bs-ad-calendar/issues)
