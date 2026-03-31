import type { BaseChartProps } from "../types";

const LIGHT = {
  text: "#374151",
  textMuted: "#9ca3af",
  grid: "#f3f4f6",
  line: "#e5e7eb",
};

const DARK = {
  text: "#e5e7eb",
  textMuted: "#6b7280",
  grid: "#1f2937",
  line: "#374151",
};

export function getThemeColors(theme?: BaseChartProps["theme"]) {
  if (theme === "dark") return DARK;
  if (theme === "light") return LIGHT;
  // Auto-detect
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return DARK;
  }
  return LIGHT;
}

export const DEFAULT_COLORS = [
  "#1a56db", "#6366f1", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#06b6d4",
];
