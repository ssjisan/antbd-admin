import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import Form from "../../Components/Roles/Form/Form";
export default function RoleSettings() {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {id ? "Update Role" : "Create Role"}
      </Typography>
      <Form id={id} />
    </Box>
  );
}
