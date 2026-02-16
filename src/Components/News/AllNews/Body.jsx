import {
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Edit, Remove, More } from "../../../assets/IconSet";
import CustomePopOver from "../../Common/PopOver/CustomePopOver";

export default function Body({
  news,
  open,
  selectedRow,
  handleOpenMenu,
  handleCloseMenu,
  setIsModalOpen,
}) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  return (
    <>
      <TableBody>
        {news.map((item) => (
          <TableRow key={item._id}>
            <TableCell
              sx={{
                maxWidth: 300,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.title}
            </TableCell>

            <TableCell>{formatDate(item.createdAt)}</TableCell>

            <TableCell align="center">
              <Tooltip title="Actions">
                <IconButton onClick={(e) => handleOpenMenu(e, item)}>
                  <More size={24} color="#919EAB" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* Action Menu */}
      <CustomePopOver
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        menuItems={[
          {
            label: "Preview",
            onClick: () => {
              navigate(`/news-preview/${selectedRow?._id}`);
              handleCloseMenu();
            },
          },
          {
            label: "Edit",
            icon: Edit,
            onClick: () => {
              navigate(`/news-editor/${selectedRow?._id}`);
              handleCloseMenu();
            },
          },
          {
            label: "Delete",
            icon: Remove,
            color: "error",
            onClick: () => {
              setIsModalOpen(true);
              handleCloseMenu();
            },
          },
        ]}
      />
    </>
  );
}

Body.propTypes = {
  news: PropTypes.array.isRequired,
  open: PropTypes.any,
  selectedRow: PropTypes.object,
  handleOpenMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};
