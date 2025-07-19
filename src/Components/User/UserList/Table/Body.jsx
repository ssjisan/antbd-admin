import {
  IconButton,
  MenuItem,
  Popover,
  TableBody,
  TableRow,
  Tooltip,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { Update, Remove, More } from "../../../../assets/IconSet";
import RemoveUserModal from "../../Components/RemoveUserModal";
import { useContext, useState } from "react";
import { DataContext } from "../../../../DataProcessing/DataProcessing";
import axios from "axios";
import toast from "react-hot-toast";

export default function Body({
  users,
  page,
  rowsPerPage,
  handleRemove,
  selectedUser,
  setSelectedUser,
}) {
  const [open, setOpen] = useState(null);
  const { auth } = useContext(DataContext);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenMenu = (event, user) => {
    setOpen(event.currentTarget);
    setSelectedUser(user);
    setSelectedUserId(user._id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleResetPassword = async (userId) => {
    try {
      if (selectedUser?.email === "ssjisan.dev@gmail.com") {
        toast.error("Access Denied");
        return;
      }
      const response = await axios.post(`/reset-password/${userId}`, {});
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };
  return (
    <TableBody>
      {users
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow key={data.id}>
            <TableCell align="left">{data.name}</TableCell>
            <TableCell align="left">{data.email}</TableCell>
            <TableCell align="left">
              {" "}
              {data.role === 0
                ? "Super Admin"
                : data.role === 1
                ? "Admin"
                : "Moderator"}
            </TableCell>
            <TableCell align="center">
              <Tooltip title="actions">
                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  onClick={(event) => handleOpenMenu(event, data)}
                >
                  <More color="#919EAB" size={24} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          sx: {
            width: 200,
            p: "8px",
            borderRadius: "12px",
            boxShadow:
              "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12);",
          },
        }}
      >
        <MenuItem
          sx={{
            display: "flex",
            gap: "8px",
            mb: auth?.user?.role === 0 && "8px",
            borderRadius: "8px",
          }}
          onClick={() => {
            handleResetPassword(selectedUserId);
            handleCloseMenu();
          }}
        >
          <Update color="#919EAB" size={24} />
          Reset Password
        </MenuItem>
        {auth?.user?.role === 0 && (
          <MenuItem
            sx={{
              color: "error.main",
              display: "flex",
              gap: "8px",
              borderRadius: "8px",
            }}
            onClick={(e) => {
              handleRemove(e);
              handleCloseMenu();
            }}
          >
            <Remove color="red" size={24} /> Delete
          </MenuItem>
        )}
      </Popover>
    </TableBody>
  );
}

Body.propTypes = {
  users: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.func,
  handleRemove: PropTypes.any,
  isModalOpen: PropTypes.any,
  showModal: PropTypes.any,
  setSelectedUser: PropTypes.func,
  userRemoveModal: PropTypes.any,
};
