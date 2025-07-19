import { Box, Stack, Typography } from "@mui/material";
// import { MatrixIconPending } from "../../../assets/Icons/MatrixIconPending";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TotalPending() {
  const [rawCounts, setRawCounts] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/all-student");
        const approved = data.summary?.pending || 0;
        setRawCounts(approved);
      } catch (error) {
        console.log("Error fetching approved student count:", error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "40px 24px",
        display: "flex",
        gap: "24px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box sx={{width:"64px", height:"64px"}}>
        <img src="https://res.cloudinary.com/dmyttqosa/image/upload/v1745491938/pending_fcb6hm.png" style={{width:"100%"}}/>
      </Box>
      <Stack>
        <Typography variant="h4">{rawCounts}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Pending Students
        </Typography>
      </Stack>
    </Box>
  );
}
