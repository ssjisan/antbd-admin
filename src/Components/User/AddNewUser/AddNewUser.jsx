import { Box, Container, Grid, Typography } from "@mui/material";
import AddUserForm from "./AddUserForm";

export default function AddNewUser() {
  return (
    <Container>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Register New User</Typography>
      </Box>
      <Box sx={{ p: "24px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <AddUserForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
