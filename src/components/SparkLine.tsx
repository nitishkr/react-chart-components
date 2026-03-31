import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { BaseChartProps } from "../types";

interface SparkLineProps extends Omit<BaseChartProps, "height"> {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function SparkLine({
  data,
  color = "#1a56db",
  width = 120,
  height = 32,
  theme,
  className,
}: SparkLineProps) {
  const isDark = theme === "dark" ||
    (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "areaspline",
        width,
        height,
        backgroundColor: "transparent",
        margin: [2, 0, 2, 0],
        spacing: [0, 0, 0, 0],
      },
      title: { text: undefined },
      credits: { enabled: false },
      accessibility: { enabled: false },
      xAxis: { visible: false },
      yAxis: { visible: false },
      legend: { enabled: false },
      tooltip: { enabled: false },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.12,
          lineWidth: 1.5,
          marker: { enabled: false },
          states: { hover: { enabled: false } },
          color,
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, Highcharts.color(color).setOpacity(0.2).get("rgba") as string],
              [1, Highcharts.color(color).setOpacity(0).get("rgba") as string],
            ],
          },
        },
      },
      series: [{ type: "areaspline", data }],
    }),
    [data, color, width, height, isDark]
  );

  return (
    <div className={className} style={{ display: "inline-block" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
