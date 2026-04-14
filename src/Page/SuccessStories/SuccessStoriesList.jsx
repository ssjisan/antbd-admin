import { Box, Button, Typography } from "@mui/material";
import AllSuccessStoriesList from "../../Components/SuccessStories/AllSuccessStories/AllSuccessStoriesList";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { useContext } from "react";
import { hasPermission } from "../../lib/hasPermission";
import { Link } from "react-router-dom";
import Icon from "../../Components/Icon";

export default function SuccessStoriesList() {
  const { auth } = useContext(DataContext);

  const canCreate = hasPermission(
    auth?.permissions,
    "success-stories-editor",
    "canCreate",
  );
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">All Success Stories</Typography>

        {canCreate && (
          <Button
            variant="contained"
            component={Link}
            to="/success-stories-editor"
            startIcon={<Icon name="Plus" size={20} color="#fff" />}
          >
            Create Story
          </Button>
        )}
      </Box>
      <AllSuccessStoriesList />
    </Box>
  );
}
