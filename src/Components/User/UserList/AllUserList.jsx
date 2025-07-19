import { Box, Typography } from "@mui/material";
import UserListTable from "./UserListTable";

export default function AllUserList() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 0px" }}>
        <Typography variant="h4">User List</Typography>
      </Box>
      <UserListTable />
    </Box>
  );
}
