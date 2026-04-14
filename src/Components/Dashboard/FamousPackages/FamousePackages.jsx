import { useContext, useEffect, useMemo, useState } from "react";
import axios from "../../../api/axios";
import { DataContext } from "../../../DataProcessing/DataProcessing";

import { Card, CardContent, Typography } from "@mui/material";

import Chart from "react-apexcharts";
import toast from "react-hot-toast";

export default function FamousePackages() {
  const { packagePopularity } = useContext(DataContext);

  const [packages, setPackages] = useState([]);

  // =========================
  // LOAD PACKAGES
  // =========================
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await axios.get("/all-packages");
        setPackages(res.data.packages || []);
      } catch (err) {
        toast.error("Failed to load packages");
      }
    };

    loadPackages();
  }, []);

  // =========================
  // MERGE + TOP 5
  // =========================
  const mergedData = useMemo(() => {
    if (!Array.isArray(packagePopularity)) return [];

    return packagePopularity
      .map((item) => {
        const pkg = packages.find((p) => p._id === item._id);

        return {
          name: pkg?.packageName || "Unknown",
          value: item.total || 0,
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [packagePopularity, packages]);

  // =========================
  // SERIES (LOLLIPOP)
  // =========================
  const series = [
    {
      data: mergedData.map((item) => item.value),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: "40%",
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    dataLabels: {
      enabled: true,
      formatter: (val) => val,
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    xaxis: {
      categories: mergedData.map((item) => item.name),
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 4,
    },
  };

  return (
    <Card
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} mb={2}>
          🥇 Famous Packages (Top 5)
        </Typography>

        <Chart options={options} series={series} type="bar" height={320} />
      </CardContent>
    </Card>
  );
}
