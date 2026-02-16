import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Table } from "@mui/material";
import toast from "react-hot-toast";
import CustomeHeader from "../../Common/Table/CustomeHeader";
import CustomePagination from "../../Common/Table/CustomePagination";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";
import Body from "./Body";

export default function AllNewsList() {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // popover + delete state
  const [open, setOpen] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const tableRef = useRef(null);
  const [tableWidth, setTableWidth] = useState("auto");

  const loadNews = async () => {
    try {
      const res = await axios.get("/all-news");
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
      await axios.delete(`/delete-news/${selectedRow._id}`);
      toast.success("Article deleted successfully");

      setNews((prev) => prev.filter((item) => item._id !== selectedRow._id));
    } catch {
      toast.error("Failed to delete article");
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
        title="Delete Article"
        itemName={selectedRow?.title}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRemove}
        loading={loading}
      />
    </Box>
  );
}
