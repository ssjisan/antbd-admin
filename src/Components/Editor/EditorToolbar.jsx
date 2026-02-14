import { IconButton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import {
  EditorBold,
  EditorCenter,
  EditorHeading1,
  EditorHeading2,
  EditorHeading3,
  EditorHeading4,
  EditorHeading5,
  EditorHeading6,
  EditorImage,
  EditorItalic,
  EditorJustify,
  EditorLeft,
  EditorListOrdered,
  EditorListUnordered,
  EditorQuote,
  EditorRight,
  EditorUnderline,
} from "../../assets/editor/EditorIcons";

const editorToolIconStyle = {
  width: "24px",
  height: "24px",
  //   background: "#fff",
  //   border: "1px solid #ccc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "4px",
};

const getButtonStyle = (active) => ({
  ...editorToolIconStyle,
  background: active ? "#e6f0ff" : "transparent",
});

export default function EditorToolbar({
  toggleMark,
  toggleBlock,
  editor,
  toggleAlign,
  handleImageUpload,
  isMarkActive,
  isBlockActive,
  isAlignActive,
}) {
  return (
    <Stack
      flexWrap="wrap"
      flexDirection="row"
      gap="4px"
      sx={{ padding: "12px", background: "#fff" }}
    >
      <IconButton
        sx={getButtonStyle(isBlockActive(editor, "heading-one"))}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-one");
        }}
      >
        <EditorHeading1 size="24px" color="#1c252e" />
      </IconButton>
      <IconButton
        sx={getButtonStyle(isBlockActive(editor, "heading-two"))}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-two");
        }}
      >
        <EditorHeading2 size="24px" color="#1c252e" />
      </IconButton>
      <IconButton
        sx={getButtonStyle(isBlockActive(editor, "heading-three"))}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-three");
        }}
      >
        <EditorHeading3 size="24px" color="#1c252e" />
      </IconButton>
      <IconButton
        sx={getButtonStyle(isBlockActive(editor, "heading-four"))}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-four");
        }}
      >
        <EditorHeading4 size="24px" color="#1c252e" />
      </IconButton>
      <IconButton
        sx={getButtonStyle(isBlockActive(editor, "heading-five"))}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-five");
        }}
      >
        <EditorHeading5 size="24px" color="#1c252e" />
      </IconButton>
      <IconButton
        sx={getButtonStyle(isBlockActive(editor, "heading-six"))}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, "heading-six");
        }}
      >
        <EditorHeading6 size="24px" color="#1c252e" />
      </IconButton>
      <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />

      <Stack gap="4px" flexDirection="row">
        <IconButton
          sx={getButtonStyle(isMarkActive(editor, "bold"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, "bold");
          }}
        >
          <EditorBold size="16px" color="#1c252e" />
        </IconButton>
        <IconButton
          sx={getButtonStyle(isMarkActive(editor, "italic"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, "italic");
          }}
        >
          <EditorItalic size="16px" color="#1c252e" />
        </IconButton>
        <IconButton
          sx={getButtonStyle(isMarkActive(editor, "underline"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleMark(editor, "underline");
          }}
        >
          <EditorUnderline size="16px" color="#1c252e" />
        </IconButton>
        <IconButton
          sx={getButtonStyle(isMarkActive(editor, "block-quote"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "block-quote");
          }}
        >
          <EditorQuote size="16px" color="#1c252e" />
        </IconButton>
      </Stack>
      <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />
      <Stack gap="4px" flexDirection="row">
        <IconButton
          sx={getButtonStyle(isBlockActive(editor, "bulleted-list"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "bulleted-list");
          }}
        >
          <EditorListUnordered size="16px" color="#1c252e" />
        </IconButton>
        <IconButton
          sx={getButtonStyle(isBlockActive(editor, "numbered-list"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "numbered-list");
          }}
        >
          <EditorListOrdered size="16px" color="#1c252e" />
        </IconButton>
      </Stack>
      <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />
      <Stack gap="4px" flexDirection="row">
        <IconButton
          sx={getButtonStyle(isAlignActive(editor, "left"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, "left");
          }}
        >
          <EditorLeft size="16px" color="#1c252e" />
        </IconButton>
        <IconButton
          sx={getButtonStyle(isAlignActive(editor, "center"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, "center");
          }}
        >
          <EditorCenter size="16px" color="#1c252e" />
        </IconButton>
        <IconButton
          sx={getButtonStyle(isAlignActive(editor, "right"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, "right");
          }}
        >
          <EditorRight size="16px" color="#1c252e" />
        </IconButton>
        <IconButton
          sx={getButtonStyle(isAlignActive(editor, "justify"))}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, "justify");
          }}
        >
          <EditorJustify size="16px" color="#1c252e" />
        </IconButton>
      </Stack>
      <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />
      <Stack>
        <IconButton
          sx={editorToolIconStyle}
          onClick={() => document.getElementById("image-upload").click()}
        >
          <EditorImage size="16px" color="#1c252e" />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                await handleImageUpload(file); // uploads to server and inserts image
              }
              e.target.value = ""; // reset input
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
}
EditorToolbar.propTypes = {
  toggleMark: PropTypes.func.isRequired,
  toggleBlock: PropTypes.func.isRequired,
  toggleAlign: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  editor: PropTypes.object.isRequired,
  isMarkActive: PropTypes.func.isRequired,
  isBlockActive: PropTypes.func.isRequired,
  isAlignActive: PropTypes.func.isRequired,
};
