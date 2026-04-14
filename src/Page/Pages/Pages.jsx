import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { hasPermission } from "../../lib/hasPermission";
import View from "../../Components/Pages/View/View";
import Icon from "../../Components/Icon";

export default function Pages() {
  const { auth } = useContext(DataContext);

  const canCreate = hasPermission(
    auth?.permissions,
    "page-settings",
    "canCreate",
  );
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
        <Typography variant="h5">Pages</Typography>
        {canCreate && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/page-settings"
            startIcon={<Icon name="Plus" size={20} color="#fff" />}
          >
            Create Page
          </Button>
        )}
      </Box>
      <View />
    </Box>
  );
}
