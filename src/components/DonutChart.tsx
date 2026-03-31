import { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { getThemeColors, DEFAULT_COLORS } from "../hooks/useChartTheme";
import type { BaseChartProps, PieSlice } from "../types";

interface DonutChartProps extends BaseChartProps {
  data: PieSlice[];
  innerSize?: string;
  centerLabel?: string;
}

export function DonutChart({
  data,
  height = 300,
  theme,
  className,
  innerSize = "60%",
  centerLabel,
  overrides,
}: DonutChartProps) {
  const { ref, width } = useResizeObserver<HTMLDivElement>();
  const colors = getThemeColors(theme);

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "pie",
        height,
        width: width || undefined,
        backgroundColor: "transparent",
        style: { fontFamily: "Inter, system-ui, sans-serif" },
        events: centerLabel
          ? {
              render(this: Highcharts.Chart) {
                const chart = this;
                const centerX = chart.plotLeft + chart.plotWidth / 2;
                const centerY = chart.plotTop + chart.plotHeight / 2;

                if ((chart as unknown as { customLabel?: Highcharts.SVGElement }).customLabel) {
                  (chart as unknown as { customLabel: Highcharts.SVGElement }).customLabel.destroy();
                }

                (chart as unknown as { customLabel: Highcharts.SVGElement }).customLabel = chart.renderer
                  .text(centerLabel, centerX, centerY + 5)
                  .attr({ align: "center" })
                  .css({ fontSize: "14px", fontWeight: "600", color: colors.text })
                  .add();
              },
            }
          : undefined,
      },
      title: { text: undefined },
      credits: { enabled: false },
      accessibility: { enabled: false },
      tooltip: {
        pointFormat: "<b>{point.percentage:.1f}%</b> ({point.y})",
        borderWidth: 0,
        borderRadius: 8,
        style: { fontSize: "12px" },
      },
      plotOptions: {
        pie: {
          innerSize,
          borderRadius: 4,
          borderWidth: 2,
          dataLabels: { enabled: false },
          showInLegend: true,
        },
      },
      legend: {
        itemStyle: { fontSize: "12px", fontWeight: "400", color: colors.text },
      },
      series: [
        {
          type: "pie",
          name: "Data",
          data: data.map((d, i) => ({
            name: d.name,
            y: d.value,
            color: d.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
          })),
        },
      ],
      ...overrides,
    }),
    [data, height, width, innerSize, centerLabel, overrides, colors]
  );

  return (
    <div ref={ref} className={className}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
