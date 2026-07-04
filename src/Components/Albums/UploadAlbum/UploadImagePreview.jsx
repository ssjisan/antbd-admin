import {
  Box,
  LinearProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Icon from "../../Icon";

export default function UploadImagePreview({
  images,
  setImages,
  handleRemoveImage,
  isSubmitting,
  rejectedFiles,
}) {
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);
    setImages(reorderedImages);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ p: "40px 0px" }}
            >
              {images.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id} index={index}>
                  {(provided) => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        border: "1px solid #DBDCDC",
                        borderRadius: "12px",
                        p: "8px 4px",
                        mt: 2,
                        backgroundColor: "white",
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap="12px"
                        style={{ width: "100%" }}
                      >
                        <IconButton {...provided.dragHandleProps}>
                          <Icon name="drag" size={24} color="#000" />
                        </IconButton>
                        <img
                          src={data.url}
                          alt="Uploaded"
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
                            {(data.size / (1024 * 1024)).toFixed(2)} MB{" "}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              handleRemoveImage(data.id, data.public_id)
                            }
                            disabled={isSubmitting}
                          >
                            <Icon name="cross" size={24} color="red" />
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

UploadImagePreview.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  rejectedFiles: PropTypes.array,
};
