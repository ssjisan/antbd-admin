import { Box, Toolbar, useMediaQuery } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import NewsPreviewPart from "../../Components/News/NewsPreviewPart";

export default function NewsPreview() {
  const drawerWidth = 260;
  const forBelow1200 = useMediaQuery("(min-width:1200px)");
  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: forBelow1200 ? 3 : 2,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Box>
          <NewsPreviewPart />
        </Box>
      </Box>
    </Box>
  );
}
