import { Box, Table, TableContainer } from "@mui/material";
import Header from "./Table/Header";
import Body from "./Table/Body";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "./Table/Pagination";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function UserListTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRemoveModal, setUserRemoveModal] = useState(false);
  const { auth } = useContext(DataContext);

  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setUsers(data);
    } catch (err) {
      toast.error("Check");
    }
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      // Check if the selected user is the logged-in Super Admin
      if (selectedUser.role === 0 && selectedUser._id === auth.user._id) {
        toast.error(
          "You are a Super Admin, you can't remove your own account."
        );
        return;
      }

      // Check if the selected user is a Super Admin other than the logged-in user
      if (selectedUser.role === 0) {
        toast.error("This account can't be removed");
        return;
      }

      // Proceed with the deletion of other users
      const { data } = await axios.delete(`/user/${selectedUser._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Deleted");
        setUserRemoveModal(false);
        loadUsers();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      <TableContainer>
        <Table>
          <Header />
          <Body
            users={users}
            page={page}
            rowsPerPage={rowsPerPage}
            handleRemove={handleRemove}
            isModalOpen={isModalOpen}
            userRemoveModal={userRemoveModal}
            showModal={showModal}
            setSelectedUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        </Table>
        <Pagination
          users={users}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
