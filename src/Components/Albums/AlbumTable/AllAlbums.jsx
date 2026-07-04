import { Box, Typography } from "@mui/material";
import TableView from "./Table/TableView";

export default function AllAlbums() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">All Albums</Typography>
      </Box>
      <TableView />
    </Box>
  );
}
