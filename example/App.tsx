import { BarChart, LineChart, DonutChart, GaugeChart, SparkLine } from "../src";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>React Chart Components</h1>

      <h2>Bar Chart</h2>
      <BarChart
        categories={["Jan", "Feb", "Mar", "Apr"]}
        series={[
          { name: "Revenue", data: [120, 200, 150, 280] },
          { name: "Expense", data: [90, 140, 110, 180] },
        ]}
      />

      <h2>Line Chart</h2>
      <LineChart
        categories={["Mon", "Tue", "Wed", "Thu", "Fri"]}
        series={[
          { name: "Users", data: [30, 45, 60, 42, 70] },
          { name: "Sessions", data: [50, 65, 80, 55, 90] },
        ]}
      />

      <h2>Donut Chart</h2>
      <DonutChart
        data={[
          { name: "Desktop", value: 60 },
          { name: "Mobile", value: 30 },
          { name: "Tablet", value: 10 },
        ]}
      />

      <h2>Gauge Chart</h2>
      <GaugeChart value={72} min={0} max={100} />

      <h2>Spark Line</h2>
      <SparkLine data={[5, 10, 8, 15, 12, 18, 14, 20]} />
    </div>
  );
}
