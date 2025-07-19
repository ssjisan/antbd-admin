import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import MessageInformation from "./MessageInformation";
import { CheckRead, Mail } from "../../assets/IconSet";
import { Link } from "react-router-dom";

export default function MessagesNotification() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data } = await axios.get("/messages");
      setMessages(data);
      const unreadMessages = data.filter((message) => !message.read);
      setUnreadCount(unreadMessages.length);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      // Send request to mark all messages as read
      await axios.put("/messages/mark-all-read");
      // Reload messages to update read status and unread count
      loadMessages();
      toast.success("All messages marked as read.");
    } catch (err) {
      toast.error("Failed to mark all messages as read.");
      console.error(err);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge color="error" badgeContent={unreadCount}>
          <Mail size={24} color={"#918EAF"} />
        </Badge>
      </IconButton>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            filter: "drop-shadow(0px 0px 2px rgba(145, 158, 171, 0.24))",
            mt: 1.5,
            boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
            padding: "8px 16px",
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Messages</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {unreadCount} unread messages
            </Typography>
          </Box>

          {unreadCount > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <CheckRead color="green" size="24px" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <List disablePadding>
          {messages.slice(0, 5).map((message) => (
            <MessageInformation
              onClose={handleClose}
              key={message.id}
              notification={message}
              style={{
                backgroundColor: message.read
                  ? "transparent"
                  : "rgba(255, 0, 0, 0.1)",
              }}
            />
          ))}
        </List>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Link to="/all-messages">
            <Button fullWidth>View All</Button>
          </Link>
        </Box>
      </Popover>
    </>
  );
}
