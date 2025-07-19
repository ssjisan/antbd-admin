import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { ArrowDown, EyeOff, EyeOn } from "../../../assets/IconSet";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddUserForm() {
  const { showPassword, handleClickShowPassword, handleMouseDownPassword } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(1);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
        role,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("User Created!");
        navigate("/user_list");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Stack spacing={3} onSubmit={handleRegister} component="form">
      <TextField
        label="User Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        label="User Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value)}
          popupIcon={<ArrowDown color="#727373" size={24} />}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: "8px",
                borderRadius: "12px",
                p: "0px 8px",
              },
            },
          }}
        >
          <MenuItem value={1} sx={{ borderRadius: "8px" }}>
            Admin
          </MenuItem>
          <MenuItem value={2} sx={{ borderRadius: "8px" }}>
            Moderator
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{}} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                  <EyeOff color="#918EAF" size="24px" />
                ) : (
                  <EyeOn color="#918EAF" size="24px" />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Create
      </Button>
    </Stack>
  );
}
