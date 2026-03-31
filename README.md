# React Chart Components

A lightweight, reusable Highcharts component library for React + TypeScript. Drop-in chart components with sensible defaults, auto-resize, dark mode support, and full customization.

![React](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Highcharts](https://img.shields.io/badge/Highcharts-11-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Live Demo

> **[View Live Demo](https://react-chart-components.vercel.app)**

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnitishkr%2Freact-chart-components)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nitishkr/react-chart-components)

## Components

| Component | Description |
|---|---|
| `<LineChart />` | Area spline chart with gradient fills |
| `<BarChart />` | Column chart with optional stacking |
| `<DonutChart />` | Pie/donut with inner label support |
| `<AreaChart />` | Stacked area chart |
| `<GaugeChart />` | Semi-circle gauge for KPIs |
| `<SparkLine />` | Tiny inline chart for tables/cards |

## Features

- **Auto-resize** — Uses `ResizeObserver`, no fixed pixel sizes
- **Dark mode** — Reads `prefers-color-scheme` or explicit `theme` prop
- **Memoized** — Chart options wrapped in `useMemo` for performance
- **Type-safe** — Full TypeScript props with IntelliSense
- **Zero config** — Sensible defaults: transparent BG, no title, no credits
- **Customizable** — All Highcharts options accessible via `overrides` prop

## Quick Start

```bash
npm install @nitishkr/react-chart-components highcharts highcharts-react-official
```

```tsx
import { LineChart } from "@nitishkr/react-chart-components";

<LineChart
  series={[{ name: "Revenue", data: [30, 40, 35, 50, 49, 60] }]}
  categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
/>
```

## Props API

### Common Props (all charts)

| Prop | Type | Default | Description |
|---|---|---|---|
| `height` | `number` | `300` | Chart height in px |
| `theme` | `"light" \| "dark"` | `auto` | Color scheme |
| `className` | `string` | — | Container class |
| `overrides` | `Highcharts.Options` | — | Merge with generated options |

### LineChart / AreaChart

| Prop | Type | Description |
|---|---|---|
| `series` | `ChartSeries[]` | Data series array |
| `categories` | `string[]` | X-axis labels |
| `smooth` | `boolean` | Spline vs line |
| `showArea` | `boolean` | Fill under line |
| `gradient` | `boolean` | Gradient fill |

### BarChart

| Prop | Type | Description |
|---|---|---|
| `series` | `ChartSeries[]` | Data series array |
| `categories` | `string[]` | X-axis labels |
| `stacked` | `boolean` | Stack series |
| `horizontal` | `boolean` | Bar vs column |

### DonutChart

| Prop | Type | Description |
|---|---|---|
| `data` | `PieSlice[]` | `{ name, value, color? }[]` |
| `innerSize` | `string` | Donut hole (`"0%"` = pie) |
| `centerLabel` | `string` | Text in donut center |

### GaugeChart

| Prop | Type | Description |
|---|---|---|
| `value` | `number` | Current value |
| `min` / `max` | `number` | Scale range |
| `label` | `string` | Center text |
| `thresholds` | `Threshold[]` | Color bands |

### SparkLine

| Prop | Type | Description |
|---|---|---|
| `data` | `number[]` | Data points |
| `color` | `string` | Line color |
| `width` / `height` | `number` | Dimensions |

## License

MIT
