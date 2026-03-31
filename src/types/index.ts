export interface ChartSeries {
  name: string;
  data: number[];
  color?: string;
}

export interface PieSlice {
  name: string;
  value: number;
  color?: string;
}

export interface Threshold {
  from: number;
  to: number;
  color: string;
}

export interface BaseChartProps {
  height?: number;
  theme?: "light" | "dark";
  className?: string;
  overrides?: Record<string, unknown>;
}
