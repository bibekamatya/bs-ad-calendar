# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-01-XX

### Added
- **Preset Filtering**: New `presetKeys` prop to filter which range presets to display
- **Preset Label Customization**: New `presetLabels` prop to rename preset labels
- **PRESET_KEYS Constant**: Exported constant for easy discovery of available preset keys
- **4-Position Support**: Range presets can now be positioned on all 4 sides (top, right, bottom, left)
- **Auto-Navigation**: Calendar automatically navigates to show the selected month when a preset is clicked
- **New Presets**: Added "Last 9 Months" and "Last Year" (12 months) presets

### Changed
- Enhanced `rangePresetsPosition` prop to support 'top' | 'right' | 'bottom' | 'left'
- Improved demo with 4 examples showcasing different preset features

### Example
```tsx
import { Calendar, PRESET_KEYS } from 'bs-ad-calendar-react'

<Calendar
  mode="range"
  showRangePresets
  rangePresetsPosition="right"
  presetKeys={[
    PRESET_KEYS.LAST_7_DAYS,
    PRESET_KEYS.LAST_30_DAYS,
    PRESET_KEYS.THIS_MONTH
  ]}
  presetLabels={{
    [PRESET_KEYS.LAST_7_DAYS]: 'Past Week'
  }}
/>
```

## [1.0.0] - 2024-12-31

### Added
- Initial release
- BS (Bikram Sambat) and AD (Gregorian) calendar support
- Single date and range selection modes
- DatePicker component with input field
- Year/month picker for quick navigation
- Customizable colors and themes
- Nepali localization (months, days, numbers)
- Range presets functionality
- Keyboard navigation support
- Accessibility features (ARIA labels)
- Min/max date constraints
- Dark theme support
- TypeScript support with full type definitions
- Comprehensive documentation

### Features
- 📅 Dual calendar system (BS/AD)
- 🎨 Customizable themes and colors
- 📱 Responsive design
- ⌨️ Full keyboard navigation
- ♿ Accessibility compliant
- 🌏 Nepali localization
- 📦 Tree-shakeable exports
- 🔧 TypeScript support
