import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { getThemeColors, DEFAULT_COLORS } from "../hooks/useChartTheme";
import type { BaseChartProps, ChartSeries } from "../types";

interface BarChartProps extends BaseChartProps {
  series: ChartSeries[];
  categories?: string[];
  stacked?: boolean;
  horizontal?: boolean;
}

export function BarChart({
  series,
  categories,
  height = 300,
  theme,
  className,
  stacked = false,
  horizontal = false,
  overrides,
}: BarChartProps) {
  const { ref, width } = useResizeObserver<HTMLDivElement>();
  const colors = getThemeColors(theme);
  const chartType = horizontal ? "bar" : "column";

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: chartType,
        height,
        width: width || undefined,
        backgroundColor: "transparent",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
      },
      title: { text: undefined },
      credits: { enabled: false },
      accessibility: { enabled: false },
      colors: DEFAULT_COLORS,
      xAxis: {
        categories,
        lineColor: colors.line,
        labels: { style: { fontSize: "11px", color: colors.textMuted } },
      },
      yAxis: {
        title: { text: undefined },
        gridLineColor: colors.grid,
        labels: { style: { fontSize: "11px", color: colors.textMuted } },
      },
      plotOptions: {
        [chartType]: {
          borderRadius: 4,
          borderWidth: 0,
          stacking: stacked ? "normal" : undefined,
        },
      },
      tooltip: {
        shared: true,
        borderWidth: 0,
        borderRadius: 8,
        style: { fontSize: "12px" },
      },
      legend: {
        itemStyle: { fontSize: "12px", fontWeight: "400", color: colors.text },
      },
      series: series.map((s, i) => ({
        type: chartType as "column",
        name: s.name,
        data: s.data,
        color: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      })),
      ...overrides,
    }),
    [series, categories, height, width, stacked, horizontal, overrides, colors, chartType]
  );

  return (
    <div ref={ref} className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
