import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Icon from "../../Components/Icon";
import View from "../../Components/User/View/View";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { hasPermission } from "../../lib/hasPermission";
import { useContext } from "react";

export default function Users() {
  const { auth } = useContext(DataContext);

  const canCreate = hasPermission(auth?.permissions, "users", "canCreate");
  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Users</Typography>

        {canCreate && (
          <Button
            variant="contained"
            component={Link}
            to="/user-settings"
            startIcon={<Icon name="Plus" size={20} color="#fff" />}
          >
            Create User
          </Button>
        )}
      </Box>
      <View />
    </Box>
  );
}
