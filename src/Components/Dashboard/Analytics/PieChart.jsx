import { useEffect, useState } from "react";
import { Typography, useMediaQuery, CircularProgress } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Chart from "react-apexcharts";
import axios from "axios";

export default function PieChart() {
  const isSmallScreen = useMediaQuery("(max-width:776px)");
  const [series, setSeries] = useState([0, 0, 0,0]);
  const [loading, setLoading] = useState(true); // 🔄
  const [rawCounts, setRawCounts] = useState([0, 0, 0,0]);
  const options = {
    chart: {
      type: "pie",
      fontFamily: "Public Sans, sans-serif",
    },
    labels: ["Approved", "Pending", "Wrong Entry", "Account Not Complete"],
    colors: ["#00a76f", "#ffd666", "#ff5630","#006c9c"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(0)}%`,
    },
    tooltip: {
      y: {
        formatter: (val, { seriesIndex }) => {
          return `${rawCounts[seriesIndex]} Students`;
        },
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/all-student");  
        const summary = data.summary;
        const {
          total = 0,
          approved = 0,
          pending = 0,
          wrongEntry = 0,
          accountNotComplete = 0,
        } = summary || {};
  
        if (!total || (approved === 0 && pending === 0 && wrongEntry === 0 && accountNotComplete === 0)) {
          setSeries([100]);
          setRawCounts([0]);
        } else {
          const approvedPct = ((approved / total) * 100).toFixed(2);
          const pendingPct = ((pending / total) * 100).toFixed(2);
          const wrongPct = ((wrongEntry / total) * 100).toFixed(2);
          const incompletePct = ((accountNotComplete / total) * 100).toFixed(2);
  
          setSeries([
            +approvedPct,
            +pendingPct,
            +wrongPct,
            +incompletePct,
          ]);
  
          setRawCounts([
            approved,
            pending,
            wrongEntry,
            accountNotComplete,
          ]);
        }
      } catch (error) {
        console.error("Error fetching student status summary:", error);
        setSeries([0, 0, 0, 0]);
        setRawCounts([0, 0, 0, 0]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const chartLabels = options.labels.map((label, index) => (
    <Box
      key={label}
      display="flex"
      gap={1}
      justifyContent="center"
      alignItems="center"
      sx={{
        flexDirection: "row",
        marginLeft: "0px !important",
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: options.colors[index],
        }}
      />
      <Typography variant="subtitle2">
        {label}: {series[index] || 0}%
      </Typography>
    </Box>
  ));

  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: "24px",
      }}
    >
      <Stack sx={{ p: "24px 16px 24px 24px", width: "100%" }}>
        <Typography variant="h6">Student Status</Typography>
      </Stack>

      <Box
        width={isSmallScreen ? "100%" : "65%"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Chart options={options} series={series} type="pie" width="100%" />
        )}
      </Box>

      {!loading && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="24px"
          spacing={2}
          sx={{
            width: "100%",
            flexWrap: "wrap",
            borderTop: "1px solid rgba(145, 142, 175, 0.24)",
            p: "24px",
          }}
        >
          {chartLabels}
        </Stack>
      )}
    </Box>
  );
}
