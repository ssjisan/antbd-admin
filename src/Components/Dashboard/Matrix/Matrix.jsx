import { useContext } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";

import { Grid, CardContent, Typography, Box } from "@mui/material";
import Icon from "../../Icon";

export default function Matrix() {
  const { kpi } = useContext(DataContext);

  if (!kpi) return <div>Loading KPI...</div>;

  const cards = [
    { title: "Total Requests", data: kpi.totalRequests },
    { title: "Pending Requests", data: kpi.pendingRequests },
    { title: "Connected Users", data: kpi.connectedUsers },
  ];

  const formatChange = (value) => {
    const abs = Math.abs(value);
    const isPositive = value >= 0;

    return {
      text: `${isPositive ? "+" : "-"}${abs}%`,
      isPositive,
    };
  };

  return (
    <Grid container spacing={2}>
      {cards.map((item, index) => {
        const change = formatChange(item.data.change);

        return (
          <Grid item xs={12} md={4} key={index} mt={4} mb={4}>
            <Box
              sx={{
                borderRadius: 3,
                background: "#fff",
                boxShadow:
                  "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
              }}
            >
              <CardContent>
                {/* Title */}
                <Typography variant="subtitle2" color="text.secondary">
                  {item.title}
                </Typography>

                {/* Value */}
                <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                  {item.data.value}
                </Typography>

                {/* Change */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                    color: change.isPositive ? "success.main" : "error.main",
                    fontWeight: 500,
                    gap: 0.5,
                  }}
                >
                  {change.isPositive ? (
                    <Icon
                      name="trendingupicon"
                      color="#00a76f"
                      fontSize="20px"
                    />
                  ) : (
                    <Icon
                      name="trendingdownicon"
                      color="#ff5630"
                      fontSize="20px"
                    />
                  )}

                  <Typography variant="body2">
                    {change.text} last 30 days
                  </Typography>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
