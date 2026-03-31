import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { getThemeColors, DEFAULT_COLORS } from "../hooks/useChartTheme";
import type { BaseChartProps, Threshold } from "../types";

interface GaugeChartProps extends BaseChartProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  thresholds?: Threshold[];
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  height = 200,
  theme,
  className,
  label,
  thresholds,
  overrides,
}: GaugeChartProps) {
  const colors = getThemeColors(theme);

  const defaultThresholds: Threshold[] = thresholds ?? [
    { from: min, to: max * 0.5, color: "#ef4444" },
    { from: max * 0.5, to: max * 0.75, color: "#f59e0b" },
    { from: max * 0.75, to: max, color: "#10b981" },
  ];

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "solidgauge",
        height,
        backgroundColor: "transparent",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
      },
      title: { text: undefined },
      credits: { enabled: false },
      accessibility: { enabled: false },
      pane: {
        startAngle: -130,
        endAngle: 130,
        background: [
          {
            outerRadius: "100%",
            innerRadius: "70%",
            backgroundColor: colors.grid,
            borderWidth: 0,
            shape: "arc",
          },
        ],
      },
      yAxis: {
        min,
        max,
        lineWidth: 0,
        tickWidth: 0,
        minorTickLength: 0,
        labels: { enabled: false },
        stops: defaultThresholds.map((t) => [
          t.to / max,
          t.color,
        ]) as Array<[number, string]>,
      },
      plotOptions: {
        solidgauge: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            borderWidth: 0,
            y: -20,
            format: `<div style="text-align:center"><span style="font-size:24px;font-weight:700;color:${colors.text}">{y}</span><br/><span style="font-size:12px;color:${colors.textMuted}">${label ?? ""}</span></div>`,
            useHTML: true,
          },
          rounded: true,
        },
      },
      series: [
        {
          type: "solidgauge" as const,
          name: label ?? "Value",
          data: [value],
          color: DEFAULT_COLORS[0],
          innerRadius: "70%",
        },
      ],
      ...overrides,
    }),
    [value, min, max, height, label, defaultThresholds, overrides, colors]
  );

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
