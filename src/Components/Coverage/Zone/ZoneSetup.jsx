import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../../api/axios";
import Form from "./Form";
import View from "./View";
import ConfirmationModal from "../../Common/RemoveConfirmation/ConfirmationModal";
import { getErrorMessage } from "../../../lib/getErrorMessage";
import { hasPermission } from "../../../lib/hasPermission";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function ZoneSetup() {
  const { auth } = useContext(DataContext);
  const [name, setName] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zones, setZones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isSmDown = useMediaQuery("(max-width:767px)");
  const canCreate = hasPermission(auth?.permissions, "add-zone", "canCreate");
  const canUpdate = hasPermission(auth?.permissions, "add-zone", "canUpdate");
  const canDelete = hasPermission(auth?.permissions, "add-zone", "canDelete");
  const hasAnyAction = canUpdate || canDelete;
  useEffect(() => {
    loadZones();
  }, []);

  const loadZones = async () => {
    try {
      const { data } = await axios.get("/zones");
      setZones(data);
    } catch (err) {
      toast.error("Failed to fetch zones");
    }
  };

  const handleSubmit = async () => {
    if (!name || !officeLocation) {
      toast.error("Name and Office Location are required.");
      return;
    }

    setLoading(true);

    try {
      if (selectedRowId) {
        const response = await axios.put(`/zones/${selectedRowId._id}`, {
          name,
          officeLocation,
        });

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Zone updated successfully");
          setSelectedRowId(null);
        }
      } else {
        const response = await axios.post("/zones", {
          name,
          officeLocation,
        });

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success("Zone created successfully");
        }
      }

      setName("");
      setOfficeLocation("");
      await loadZones();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to save zone"));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMenu = (event, zone) => {
    setOpen(event.currentTarget);
    setSelectedRowId(zone);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRemove = async () => {
    if (!dataToDelete?._id) {
      toast.error("No zone selected to delete.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`/zones/${dataToDelete._id}`);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Zone deleted successfully");
        await loadZones();
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to delete zone"));
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setDataToDelete(null);
    }
  };

  const redirectEdit = (zone) => {
    if (!zone) return;
    setName(zone.name);
    setOfficeLocation(zone.officeLocation);
    setSelectedRowId(zone);
  };

  return (
    <Grid container spacing={2}>
      {canCreate && (
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          sx={{
            position: isSmDown ? "static" : "sticky",
            top: isSmDown ? "auto" : "80px",
            alignSelf: "flex-start",
            zIndex: 1,
          }}
        >
          <Form
            name={name}
            setName={setName}
            officeLocation={officeLocation}
            setOfficeLocation={setOfficeLocation}
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </Grid>
      )}

      <Grid
        item
        xs={12}
        sm={12}
        md={!canCreate ? 12 : 8}
        lg={!canCreate ? 12 : 8}
        sx={{
          height: "100%",
          overflowY: "auto",
          pr: 1,
          mt: "36px",
        }}
      >
        <View
          zones={zones}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          handleCloseMenu={handleCloseMenu}
          handleOpenMenu={handleOpenMenu}
          open={open}
          selectedRowId={selectedRowId}
          dataToDelete={dataToDelete}
          setDataToDelete={setDataToDelete}
          setIsModalOpen={setIsModalOpen}
          redirectEdit={redirectEdit}
          hasAnyAction={hasAnyAction}
          canUpdate={canUpdate}
          canDelete={canDelete}
        />

        <ConfirmationModal
          open={isModalOpen}
          title="Delete Zone"
          itemName={dataToDelete?.name || ""}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleRemove}
        />
      </Grid>
    </Grid>
  );
}
