import { Box, Button, Typography } from "@mui/material";
import { ArrowRight } from "../../../assets/IconSet";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);
  const loadEvents = async () => {
    try {
      const { data } = await axios.get("/events");
      setEvents(data);
    } catch (err) {
      toast.error("Problem event loading");
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };
  return (
    <Box
      sx={{
        p: "12px",
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Box sx={{ p: "24px" }}>
        <Typography variant="h6">Upcoming Events</Typography>
      </Box>
      <Box sx={{ p: "16px 16px 0px 16px" }}>
        {events.map((data) => {
          return (
            <Box
              key={data.id}
              sx={{
                mb: "24px",
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                gap: "16px",
                justifyContent: "space-berween",
                alignItems: {
                  xs: "flex-start",
                  sm: "space-berween",
                  md: "space-berween",
                  lg: "space-berween",
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "8px",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_SERVER_API}/event/image/${data._id}`}
                  alt={data.name}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ flexGrow: 1, minWidth: 240, width: "100%" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }}
                  color="text.primary"
                >
                  {data.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {data.description}
                </Typography>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ flexShrink: 0 }}
              >
                {formatDate(data.eventDate)}
              </Typography>
            </Box>
          );
        })}
        <Box
          sx={{
            borderTop: "1px dashed rgba(145, 158, 171, 0.2)",
            p: "16px 0px 16px 0px",
            textAlign: "right",
          }}
        >
          <Link to="/events_list">
            <Button
              color="inherit"
              endIcon={<ArrowRight size={16} color="#060415" />}
            >
              View All
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
