import PropTypes from "prop-types";
import {
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { MailNotification, TimeAgo } from "../../assets/IconSet";
import { Link } from "react-router-dom";

export default function MessageInformation({ notification }) {
  // Calculate time difference from now
  const createdAt = new Date(notification.createdAt);
  const now = new Date();
  const timeDifference = Math.abs(now - createdAt);
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(minutesDifference / 60);

  // Format the send time dynamically based on time difference
  let formattedSendTime;
  if (hoursDifference >= 1) {
    formattedSendTime = `${hoursDifference} ${
      hoursDifference === 1 ? "hour" : "hours"
    } ago`;
  } else {
    formattedSendTime = `${minutesDifference} ${
      minutesDifference === 1 ? "minute" : "minutes"
    } ago`;
  }

  return (
    <Link to="/all-messages" style={{textDecoration:"none"}}>
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: "1px",
          borderRadius: "12px",
          backgroundColor: notification.read
            ? "transparent"
            : "rgba(255, 0, 0, 0.1)", // Red background for unread messages
        }}
      >
        <ListItemAvatar>
          <MailNotification />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body2" color="text.secondary">
              You have a new message from &nbsp;
              <Typography
                component="span"
                color="text.primary"
                sx={{ fontWeight: "600" }}
              >
                {notification.name}
              </Typography>
            </Typography>
          }
          secondary={
            <Typography
              variant="caption"
              component="span"
              color="text.secondary"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <TimeAgo size="16px" color="#918EAF" /> Sent {formattedSendTime}
            </Typography>
          }
        />
      </ListItemButton>
    </Link>
  );
}

MessageInformation.propTypes = {
  notification: PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired, // Adjust type as per your schema
    read: PropTypes.bool.isRequired, // Ensure 'read' is a boolean
    // Add more specific PropTypes as needed for other fields in 'notification'
  }).isRequired,
};
