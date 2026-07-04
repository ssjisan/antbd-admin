import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Cross, Drag } from "../../../assets/IconSet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

export default function UpdateImagePreview({
  images,
  setImages,
  handleRemoveImage,
  rejectedFiles,
}) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    // Update `order` field for each image
    const updatedImages = reorderedImages.map((img, index) => ({
      ...img,
      order: index,
    }));

    setImages(updatedImages);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <Stack
              direction="column"
              gap="16px"
              sx={{ mt: "40px" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((data, index) => (
                <Draggable
                  key={data._id || data.name} // Use unique key
                  draggableId={data._id || data.name}
                  index={index}
                >
                  {(provided) => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        border: "1px solid #DBDCDC",
                        borderRadius: "12px",
                        p: "8px 4px",
                        backgroundColor: "white",
                      }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap="12px"
                        style={{ width: "100%" }}
                      >
                        <IconButton {...provided.dragHandleProps}>
                          <Drag size={24} color="#000" />
                        </IconButton>
                        <img
                          src={data.src}
                          alt={data.name}
                          style={{
                            width: "80px",
                            height: "48px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                        {data.uploading ? (
                          // ⚡ Linear progress while uploading instead of name/size
                          <Stack style={{ width: "100%" }}>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress
                                variant="determinate"
                                value={data.progress}
                              />
                              <Typography variant="caption" sx={{ mt: 0.5 }}>
                                {data.progress}%
                              </Typography>
                            </Box>
                          </Stack>
                        ) : (
                          <Stack style={{ width: "100%" }}>
                            <Typography
                              variant="body1"
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {data.name}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                      {!data.uploading && (
                        <Stack
                          flexDirection="row"
                          gap="4px"
                          alignItems="center"
                        >
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {data.size} MB
                          </Typography>
                          <IconButton
                          onClick={() =>
                            handleRemoveImage(
                              data._id,
                              data.public_id,
                              data.fromDatabase
                            )
                          }
                        >
                            <Cross size={24} color="red" />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      {rejectedFiles && rejectedFiles.length > 0 && (
        <div style={{ marginTop: "10px", color: "red" }}>
          <strong>Files too large (max 5MB):</strong>
          <ul>
            {rejectedFiles.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
UpdateImagePreview.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  rejectedFiles: PropTypes.array,
};
