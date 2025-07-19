import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  timelineItemClasses,
} from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import { ArrowRight } from "../../../assets/IconSet";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export default function NoticeUpdate() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const { data } = await axios.get("/notices");
      setNotices(data);
    } catch (err) {
      toast.error("Problem Loading");
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h6">Notice Update</Typography>
      </Box>
      <Box sx={{ p: "16px 16px 0px 16px" }}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {notices.map((data, index) => {
            return (
              <TimelineItem key={data.id}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index === notices.length - 1 ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="subtitle2">{data.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(data.createdAt)}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
        <Box
          sx={{
            borderTop: "1px dashed rgba(145, 158, 171, 0.2)",
            p: "16px 0px 16px 0px",
            textAlign: "right",
          }}
        >
          <Link to="/notice_list">
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
