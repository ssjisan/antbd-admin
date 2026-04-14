import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Icon from "../../Components/Icon";
import View from "../../Components/Roles/View/View";
import { useContext } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { hasPermission } from "../../lib/hasPermission";

export default function Roles() {
  const navigate = useNavigate();
  const { auth } = useContext(DataContext);

  const canCreate = hasPermission(auth?.permissions, "roles", "canCreate");
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Roles</Typography>

        {canCreate && (
          <Button
            variant="contained"
            onClick={() => navigate("/role-settings")}
            startIcon={<Icon name="Plus" size={20} color="#fff" />}
          >
            Create Role
          </Button>
        )}
      </Box>
      <View />
    </Box>
  );
}
