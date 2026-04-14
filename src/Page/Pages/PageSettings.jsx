import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Form from "../../Components/Pages/Form/Form";

export default function PageSettings() {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {id ? "Update Page" : "Create Page"}
      </Typography>
      <Form id={id} />
    </Box>
  );
}
