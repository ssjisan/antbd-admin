import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { hasPermission } from "../../lib/hasPermission";
import Icon from "../../Components/Icon";
import View from "../../Components/Slider/View/View";

export default function Slider() {
  const { auth } = useContext(DataContext);

  const canCreate = hasPermission(
    auth?.permissions,
    "slider-settings",
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
        <Typography variant="h5">Slider</Typography>

        {canCreate && (
          <Button
            variant="contained"
            component={Link}
            to="/slider-settings"
            startIcon={<Icon name="Plus" size={20} color="#fff" />}
          >
            Create Slider
          </Button>
        )}
      </Box>

      {/* Table View */}
      <View />
    </Box>
  );
}
