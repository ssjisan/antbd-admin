import { useContext, useMemo, useState, useEffect } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import Chart from "react-apexcharts";

export default function MonthlyData() {
  const { monthlyTrend } = useContext(DataContext);

  const currentYear = new Date().getFullYear();

  // =========================
  // UNIQUE YEARS
  // =========================
  const years = useMemo(() => {
    if (!monthlyTrend) return [];
    return [...new Set(monthlyTrend.map((item) => item.year))];
  }, [monthlyTrend]);

  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    if (years.length && !years.includes(currentYear)) {
      setYear(years[0]);
    }
  }, [years, currentYear]);

  // =========================
  // FILTER DATA
  // =========================
  const filteredData = useMemo(() => {
    if (!monthlyTrend) return [];
    return monthlyTrend.filter((item) => item.year === Number(year));
  }, [monthlyTrend, year]);

  // =========================
  // COLORS (SINGLE SOURCE OF TRUTH)
  // =========================
  const colors = ["#FFB020", "#36B37E", "#FF5630"];

  // =========================
  // SERIES
  // =========================
  const series = [
    {
      name: "Pending",
      data: filteredData.map((d) => d.pending),
    },
    {
      name: "Connected",
      data: filteredData.map((d) => d.connected),
    },
    {
      name: "Cancelled",
      data: filteredData.map((d) => d.cancelled),
    },
  ];

  // =========================
  // OPTIONS
  // =========================
  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      fontFamily: "Public Sans, sans-serif",
    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
      },
    },

    xaxis: {
      categories: filteredData.map((d) => d.month.substring(0, 3)),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },

    colors,

    legend: {
      show: false, // ❌ IMPORTANT: disable default legend
    },

    dataLabels: {
      enabled: false,
    },
  };

  // =========================
  // CUSTOM LEGEND
  // =========================
  const legendItems = series.map((item, index) => (
    <Stack key={item.name} flexDirection="row" gap="6px" alignItems="center">
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: colors[index],
        }}
      />
      <Typography variant="body2">{item.name}</Typography>
    </Stack>
  ));

  return (
    <Card
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Monthly Requests Trend
          </Typography>

          <Select
            size="small"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* CUSTOM LEGEND */}
        <Stack
          direction="row"
          gap={3}
          mb={1}
          flexWrap="wrap"
          sx={{ padding: "8px 0px" }}
        >
          {legendItems}
        </Stack>

        {/* CHART */}
        <Chart options={options} series={series} type="bar" height={350} />
      </CardContent>
    </Card>
  );
}
