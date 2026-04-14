import { useEffect, useState, useRef, useContext } from "react";
import axios from "../../../api/axios";
import { Box, Table } from "@mui/material";
import toast from "react-hot-toast";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import CustomePagination from "../../Common/Table/CustomePagination";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";
import Body from "./Body";
import { hasPermission } from "../../../lib/hasPermission";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function AllSuccessStoriesList() {
  const { auth } = useContext(DataContext);

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const canUpdate = hasPermission(
    auth?.permissions,
    "success-stories-editor",
    "canUpdate",
  );
  const canDelete = hasPermission(
    auth?.permissions,
    "success-stories",
    "canDelete",
  );
  const hasAnyAction = canUpdate || canDelete;

  // popover + delete state
  const [open, setOpen] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState("auto");

  const loadNews = async () => {
    try {
      const res = await axios.get("/all-stories");
      setNews(res.data || []);
    } catch {
      toast.error("Failed to load news");
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.scrollWidth);
    }
  }, [news, page, rowsPerPage]);

  const handleOpenMenu = (event, row) => {
    setOpen(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRemove = async () => {
    if (!selectedRow?._id) return;

    setLoading(true);
    try {
      await axios.delete(`/delete-stories/${selectedRow._id}`);
      toast.success("Story deleted successfully");

      setNews((prev) => prev.filter((item) => item._id !== selectedRow._id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete story");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setSelectedRow(null);
    }
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "createdAt", label: "Created at" },
  ];

  const paginatedNews = news.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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
      <Box ref={tableRef} sx={{ overflowX: "auto" }}>
        <Table>
          <CustomeHeader columns={columns} includeActions includeDrag={false} />

          <Body
            news={paginatedNews}
            open={open}
            selectedRow={selectedRow}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            setIsModalOpen={setIsModalOpen}
            canUpdate={canUpdate}
            canDelete={canDelete}
            hasAnyAction={hasAnyAction}
          />
        </Table>
      </Box>

      {/* Pagination */}
      <Box sx={{ width: tableWidth, overflowX: "auto" }}>
        <CustomePagination
          count={news.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={isModalOpen}
        title="Delete success stories"
        itemName={selectedRow?.title}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRemove}
        loading={loading}
      />
    </Box>
  );
}
