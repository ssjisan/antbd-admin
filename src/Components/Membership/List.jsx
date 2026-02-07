import PropTypes from "prop-types";
import { Stack, Typography, Box, Button, Skeleton } from "@mui/material";

export default function List({
  memberships,
  isLoading,
  onDeleteClick,
  onEditClick,
  setSelectedRowId,
}) {
  console.log(memberships);

  if (isLoading) {
    return (
      <Stack gap={3} flexDirection="row" flexWrap="wrap" sx={{ ml: "40px" }}>
        {[1, 2, 3].map((item) => (
          <Box
            key={item}
            sx={{
              width: 160,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            <Skeleton
              variant="rectangular"
              width={120}
              height={120}
              sx={{ mx: "auto", borderRadius: 1 }}
            />
            <Skeleton width="80%" height={24} sx={{ mx: "auto", mt: 2 }} />
          </Box>
        ))}
      </Stack>
    );
  }

  if (!memberships || memberships.length === 0) {
    return (
      <Typography sx={{ ml: "40px" }}>No Membership available.</Typography>
    );
  }

  return (
    <Stack gap={3} flexDirection="row" flexWrap="wrap" sx={{ ml: "40px" }}>
      {memberships?.map((data) => (
        <Box
          key={data?._id}
          sx={{
            position: "relative",
            width: 160,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 4,
            overflow: "hidden",
            "&:hover .overlay": {
              opacity: 1,
              visibility: "visible",
            },
          }}
        >
          <Box
            component="img"
            src={data?.image?.url}
            alt={data?.name}
            sx={{
              width: 120,
              height: 120,
              objectFit: "contain",
              borderRadius: 1,
              mx: "auto",
            }}
          />

          <Typography variant="body1" mt={1} textAlign="center">
            {data?.name}
          </Typography>

          {/* Overlay with blur */}
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(4px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              opacity: 0,
              visibility: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            <Stack direction="column" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  onEditClick(data._id);
                  setSelectedRowId(data._id);
                }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  onDeleteClick(data); // parent will handle the state
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

List.propTypes = {
  memberships: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
  ),
  isLoading: PropTypes.bool.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  setDataToDelete: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  setSelectedRowId: PropTypes.func.isRequired,
};
