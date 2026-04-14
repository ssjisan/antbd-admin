import { Button, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function Form({
  name,
  setName,
  officeLocation,
  setOfficeLocation,
  loading,
  handleSubmit,
}) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6" fontWeight={600}>
        Create or Update Zone
      </Typography>

      <TextField
        label="Zone Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Office Location"
        variant="outlined"
        fullWidth
        value={officeLocation}
        onChange={(e) => setOfficeLocation(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ width: "150px" }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Stack>
  );
}

Form.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  officeLocation: PropTypes.string.isRequired,
  setOfficeLocation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
