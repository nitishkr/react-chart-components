import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { getThemeColors, DEFAULT_COLORS } from "../hooks/useChartTheme";
import type { BaseChartProps, ChartSeries } from "../types";

interface LineChartProps extends BaseChartProps {
  series: ChartSeries[];
  categories?: string[];
  smooth?: boolean;
  showArea?: boolean;
  gradient?: boolean;
}

export function LineChart({
  series,
  categories,
  height = 300,
  theme,
  className,
  smooth = true,
  showArea = true,
  gradient = true,
  overrides,
}: LineChartProps) {
  const { ref, width } = useResizeObserver<HTMLDivElement>();
  const colors = getThemeColors(theme);

  const options: Highcharts.Options = useMemo(() => {
    const chartType = smooth ? "areaspline" : "area";
    return {
      chart: {
        type: showArea ? chartType : (smooth ? "spline" : "line"),
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
        tickColor: colors.line,
        labels: { style: { fontSize: "11px", color: colors.textMuted } },
      },
      yAxis: {
        title: { text: undefined },
        gridLineColor: colors.grid,
        labels: { style: { fontSize: "11px", color: colors.textMuted } },
      },
      tooltip: {
        shared: true,
        borderWidth: 0,
        borderRadius: 8,
        shadow: { color: "rgba(0,0,0,0.08)", offsetX: 0, offsetY: 2, width: 10 },
        style: { fontSize: "12px" },
      },
      plotOptions: {
        [showArea ? chartType : (smooth ? "spline" : "line")]: {
          fillOpacity: showArea ? (gradient ? 0.15 : 0.08) : 0,
          lineWidth: 2.5,
          marker: { radius: 3, symbol: "circle" },
        },
      },
      legend: {
        itemStyle: { fontSize: "12px", fontWeight: "400", color: colors.text },
      },
      series: series.map((s, i) => ({
        type: (showArea ? chartType : (smooth ? "spline" : "line")) as "areaspline",
        name: s.name,
        data: s.data,
        color: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      })),
      ...overrides,
    };
  }, [series, categories, height, width, theme, smooth, showArea, gradient, overrides, colors]);

  return (
    <div ref={ref} className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
