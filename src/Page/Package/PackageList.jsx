import { Box, Typography } from "@mui/material";
import View from "../../Components/Package/PackageList/View";

export default function PackageList() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: "48px" }}>
        All Package list
      </Typography>
      <View />
    </Box>
  );
}
