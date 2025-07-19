import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
import { Alert, EyeOff, EyeOn } from "../../assets/IconSet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function InputFields() {
  const forBelow776 = useMediaQuery("(max-width:776px)");
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } =
    useContext(DataContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("isChecked") === "true"
  );
  const { auth, setAuth } = useContext(DataContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error message
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data?.error) {
        setLoading(false);
        setErrorMessage(data.error); // Set error message to display in the stack
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        if (rememberMe) {
          localStorage.setItem("email", email); // Store email in local storage
          localStorage.setItem("password", password); // Store password in local storage (not secure)
          localStorage.setItem("isChecked", rememberMe); // Store rememberMe state
        }
        if (!rememberMe) {
          localStorage.removeItem("email"); // Remove email from local storage
          localStorage.removeItem("password"); // Remove password from local storage
          localStorage.removeItem("isChecked"); // Remove rememberMe state
        }
        setAuth({ ...auth, token: data.token, user: data.user });
        setLoading(false);
        navigate("/");
        toast.success("Login Successful");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(`${err.message}. Please try again`); // Set error message
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin} // This ensures the form submits on Enter key press
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        width: "100%",
        mt: "40px",
        mb: forBelow776 ? "80px" : "160px",
      }}
    >
      <Stack gap="24px">
        {errorMessage && (
          <Stack
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              background: "#FFE9D5",
              p: "8px 16px",
              borderRadius: "12px",
              height: "48px",
            }}
          >
            <Alert size="24" color="#FF5630" />
            <Typography variant="body2" sx={{ color: "#FF5630" }}>
              {errorMessage}
            </Typography>
          </Stack>
        )}
        <TextField
          id="email"
          label="Your Email"
          variant="outlined"
          type="email"
          value={email}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          required // Ensures that the field is required
        />
        <FormControl sx={{}} variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <EyeOn color="#918EAF" size="24px" />
                  ) : (
                    <EyeOff color="#918EAF" size="24px" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Stack>
      <Stack gap="16px">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
              size="small"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{borderRadius: "8px",}}
              />
            }
            label="Remember me"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: "14px",
                fontWeight: 500,
              },
            }}
          />
        </FormGroup>
        <Button
          variant="contained"
          type="submit" // Changes the button type to submit for form submission
          endIcon={loading ? <img src="/spinner.gif" width="24px" /> : null}
          disabled={loading}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
}
