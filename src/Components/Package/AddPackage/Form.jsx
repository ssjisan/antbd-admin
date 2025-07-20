import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const connectionOptions = [
  { label: "CAT - 5", value: 0 },
  { label: "Fiber", value: 1 },
];

export default function Form({
  packageName,
  setPackageName,
  maxDownloadSpeed,
  setMaxDownloadSpeed,
  maxUploadSpeed,
  setMaxUploadSpeed,
  price,
  setPrice,
  connectionType,
  setConnectionType,
  setupCharge,
  setSetupCharge,
  popUp,
  setPopUp,
  onSubmit,
}) {
  // Handle changes from Select dropdown (normal multi-select)
  const handleConnectionChange = (event) => {
    const {
      target: { value },
    } = event;

    // Ensure value is always array of numbers
    const newSelection = typeof value === "string" ? value.split(",") : value;

    // convert string numbers to actual numbers (because sometimes they come as strings)
    const newSelectionNums = newSelection.map((v) =>
      typeof v === "number" ? v : Number(v)
    );

    setConnectionType(newSelectionNums);

    // Setup charge logic after setting connection types:
    if (newSelectionNums.includes(1)) {
      // Fiber selected => setup charge enabled, keep current or empty
      if (setupCharge === "0") setSetupCharge("");
    } else if (newSelectionNums.includes(0)) {
      // Only CAT-5 selected => setup charge forced to 0
      setSetupCharge("0");
    } else {
      // Nothing selected
      setSetupCharge("");
    }
  };

  const isSetupChargeDisabled =
    connectionType.includes(0) && !connectionType.includes(1);

  const getLabelByValue = (val) => {
    const found = connectionOptions.find((opt) => opt.value === val);
    return found ? found.label : val;
  };

  return (
    <Stack
      sx={{
        p: { xs: 0, sm: 2 },
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
      spacing={2}
    >
      {/* Package Name */}
      <TextField
        label="Package Name"
        fullWidth
        margin="normal"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
      />

      <Stack gap="24px" flexDirection="row">
        <FormControl fullWidth margin="normal">
          <InputLabel>Connection Type</InputLabel>
          <Select
            multiple
            value={connectionType}
            onChange={handleConnectionChange}
            input={<OutlinedInput label="Connection Type" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((val) => (
                  <Chip
                    key={val}
                    label={getLabelByValue(val)}
                    onDelete={(event) => {
                      event.stopPropagation(); // Prevent dropdown toggle
                      setConnectionType((prev) =>
                        prev.filter((item) => item !== val)
                      );
                    }}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {connectionOptions.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Setup Charge"
          fullWidth
          margin="normal"
          value={setupCharge}
          onChange={(e) => setSetupCharge(e.target.value)}
          disabled={isSetupChargeDisabled}
          InputProps={{
            startAdornment: <InputAdornment position="start">৳</InputAdornment>,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      </Stack>

      {/* Download & Upload Speeds */}
      <Stack flexDirection="row" gap="24px" alignItems="center">
        <TextField
          label="Max. Download"
          fullWidth
          margin="normal"
          value={maxDownloadSpeed}
          onChange={(e) => setMaxDownloadSpeed(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">Mbps</InputAdornment>,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
        <TextField
          label="Max. Upload"
          fullWidth
          margin="normal"
          value={maxUploadSpeed}
          onChange={(e) => setMaxUploadSpeed(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">Mbps</InputAdornment>,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      </Stack>

      {/* Price */}
      <TextField
        label="Price"
        fullWidth
        margin="normal"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">৳</InputAdornment>,
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={popUp}
            onChange={(e) => setPopUp(e.target.checked)}
          />
        }
        label="Show this package on homepage (recommended for featured plans)"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={onSubmit} // 👈 Call the passed handler
      >
        Save Package
      </Button>
    </Stack>
  );
}

Form.propTypes = {
  packageName: PropTypes.string.isRequired,
  setPackageName: PropTypes.func.isRequired,
  maxDownloadSpeed: PropTypes.string.isRequired,
  setMaxDownloadSpeed: PropTypes.func.isRequired,
  maxUploadSpeed: PropTypes.string.isRequired,
  setMaxUploadSpeed: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  setPrice: PropTypes.func.isRequired,
  connectionType: PropTypes.array.isRequired,
  setConnectionType: PropTypes.func.isRequired,
  setupCharge: PropTypes.string.isRequired,
  setSetupCharge: PropTypes.func.isRequired,
  popUp: PropTypes.bool.isRequired,
  setPopUp: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
