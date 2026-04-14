import { useContext, useMemo } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  CircularProgress,
} from "@mui/material";

import Chart from "react-apexcharts";

export default function StatusDistribution() {
  const { statusDistribution, dashboardLoading } = useContext(DataContext);

  // =========================
  // PREPARE DATA
  // =========================
  const series = useMemo(() => {
    if (!statusDistribution || statusDistribution.length === 0) return [];
    return statusDistribution.map((item) => item.value);
  }, [statusDistribution]);

  const labels = useMemo(() => {
    if (!statusDistribution || statusDistribution.length === 0) return [];
    return statusDistribution.map(
      (item) => item.name.charAt(0).toUpperCase() + item.name.slice(1),
    );
  }, [statusDistribution]);

  const colors = ["#FFB020", "#36B37E", "#FF5630", "#6C757D"];

  // =========================
  // CHECK STATES
  // =========================
  const isLoading = dashboardLoading || series.length === 0;

  const hasData = series.some((val) => val > 0);

  // =========================
  // CHART OPTIONS
  // =========================
  const options = {
    chart: {
      type: "pie",
      fontFamily: "Public Sans, sans-serif",
    },
    labels,
    colors,
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(0)}%`,
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#fff"], // better visibility on colored slices
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} Requests`,
      },
    },
  };

  // =========================
  // CUSTOM LEGEND
  // =========================
  const chartLabels = labels.map((label, index) => (
    <Box
      key={label}
      display="flex"
      gap={1}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: colors[index],
        }}
      />
      <Typography variant="subtitle2">
        {label}: {series[index] || 0}
      </Typography>
    </Box>
  ));

  return (
    <Card
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: 3,
      }}
    >
      <CardContent>
        {/* TITLE */}
        <Typography variant="h6" fontWeight={600} mb={2}>
          Status Distribution
        </Typography>

        {/* CHART AREA */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={320}
        >
          {isLoading ? (
            // 🔄 Loading State (Circular Skeleton)
            <CircularProgress />
          ) : !hasData ? (
            // 🚫 No Data State
            <Typography variant="body2" color="text.secondary">
              No Data Available
            </Typography>
          ) : (
            // ✅ Chart
            <Chart
              key={series.join("-")} // 🔥 force rerender fix
              options={options}
              series={series}
              type="pie"
              height={320}
            />
          )}
        </Box>

        {/* LEGEND */}
        {!isLoading && hasData && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            gap={3}
            mt={3}
            sx={{
              borderTop: "1px solid rgba(145, 158, 171, 0.24)",
              pt: 2,
            }}
          >
            {chartLabels}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
