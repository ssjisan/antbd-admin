import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import toast from "react-hot-toast";
import Body from "./Body";
import RemoveAlbum from "../../RemoveAlbum/RemoveAlbum";
import Gallery from "../../GalleryViewer/Gallery";
import { useNavigate } from "react-router-dom";
import CustomeHeader from "../../../Common/Table/CustomeHeader";
import CustomePagination from "../../../Common/Table/CustomePagination";
import { getErrorMessage } from "../../../../lib/getErrorMessage";

export default function TableView() {
  const [albums, setAlbums] = useState([]);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [albumOpen, setAlbumOpen] = useState(false);
  const navigate = useNavigate();

  // ***************** Table Header Columns ************************* //

  const columns = [
    { key: "order", label: "Order" },
    { key: "album name", label: "Album Name" },
    { key: "upload date	", label: "Upload Date" },
    { key: "file count	", label: "File Count" },
    { key: "total size	", label: "Total Size" },
  ];

  // ***************** Table Header Columns ************************* //

  // Load Albums Start //
  useEffect(() => {
    loadAlbums();
  }, []);
  const loadAlbums = async () => {
    try {
      const { data } = await axios.get("/albums");
      setAlbums(data);
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load albums"));
    }
  };

  // Popover Menu Controller Start //

  const handleOpenMenu = (event, data) => {
    setOpen(event.currentTarget);
    setSelectedAlbum(data);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  // Gallery Controller Start //

  const handleAlbumClose = () => setAlbumOpen(false);

  const handlePreviewAlbum = () => {
    setAlbumOpen(true);
    handleCloseMenu(); // Close popover
  };

  // Gallery Remove Controller Start //

  const handleCloseRemoveAlbum = () => {
    setConfirmationModalOpen(false);
  };
  const showConfirmationModal = () => {
    setAlbumToDelete(selectedAlbum);
    setConfirmationModalOpen(true);
    handleCloseMenu();
  };

  const removeProduct = async (id) => {
    try {
      // Show loading toast
      const loadingToastId = toast.loading("Deleting album...");
      await axios.delete(`/album/${id}`);
      // Remove the deleted album from the state
      setAlbums(albums.filter((album) => album._id !== id));
      // Dismiss loading toast and show success toast
      toast.success("Album deleted successfully!", { id: loadingToastId });
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.error("Failed to delete album.");
    }
  };

  const handleConfirmRemove = () => {
    if (albumToDelete) {
      removeProduct(albumToDelete._id);
      setConfirmationModalOpen(false);
      setAlbumToDelete(null);
    }
  };

  // Edit Album Controller Start

  const redirectEdit = (e, selectedAlbum) => {
    navigate(`/album/${selectedAlbum._id}`);
  };

  // Dragging and reorder
  const onDragEnd = async (result) => {
    const { destination, source } = result;

    // If dropped outside the droppable area or position didn't change
    if (!destination || destination.index === source.index) return;

    // Reorder the local albums array
    const reorderedAlbums = Array.from(albums);
    const [movedAlbum] = reorderedAlbums.splice(source.index, 1);
    reorderedAlbums.splice(destination.index, 0, movedAlbum);

    // Update local state immediately for fast UI response
    setAlbums(reorderedAlbums);

    // Prepare array of ids in new order for backend
    const reorderedAlbumIds = reorderedAlbums.map((album) => album._id);

    try {
      // Call backend API to save new order
      const response = await axios.post("/update-album-order", {
        reorderedAlbums: reorderedAlbumIds,
      });

      if (response.data.success) {
        // Optionally update local albums with authoritative data from server
        setAlbums(response.data.albums);
        toast.success("Album order updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update album order");
      }
    } catch (error) {
      console.error("Error updating album order:", error);
      toast.error("Network error: failed to update album order");
    }
  };

  const handleDownloadAlbum = async () => {
    handleCloseMenu();
    const toastId = toast.loading("Downloading album, please wait...");
    try {
      if (!selectedAlbum?.slug) return;

      const response = await axios.get(`/${selectedAlbum.slug}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${selectedAlbum.name}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error downloading album:", error);
      toast.error("Error downloading album:", error);
      toast.dismiss(toastId);
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
          <CustomeHeader
            columns={columns}
            includeActions={true}
            includeDrag={true}
          />
          <Body
            onDragEnd={onDragEnd}
            albums={albums.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            )}
            page={page}
            rowsPerPage={rowsPerPage}
            open={open}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            selectedAlbum={selectedAlbum}
            albumOpen={albumOpen}
            setAlbumOpen={setAlbumOpen}
            handlePreviewAlbum={handlePreviewAlbum}
            handleAlbumClose={handleAlbumClose}
            showConfirmationModal={showConfirmationModal}
            redirectEdit={redirectEdit}
            handleDownloadAlbum={handleDownloadAlbum}
          />
          <CustomePagination
            count={albums.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Table>
      </TableContainer>
      <Gallery
        selectedImages={selectedAlbum?.images}
        handleAlbumClose={handleAlbumClose}
        albumOpen={albumOpen}
      />
      <RemoveAlbum
        confirmationModalOpen={confirmationModalOpen}
        albumName={albumToDelete ? albumToDelete.name : ""}
        setConfirmationModalOpen={setConfirmationModalOpen}
        handleCloseRemoveAlbum={handleCloseRemoveAlbum}
        handleConfirmRemove={handleConfirmRemove}
      />
    </Box>
  );
}
