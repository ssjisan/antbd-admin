import { IconButton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import {
  EditorBold,
  EditorCenter,
  EditorImage,
  EditorItalic,
  EditorJustify,
  EditorLeft,
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
export default function EditorToolbar({
  toggleMark,
  toggleBlock,
  editor,
  toggleAlign,
  insertImage,
  isMarkActive,
  isBlockActive,
  isAlignActive,
}) {
  return (
    <>
      <Stack
        flexWrap="wrap"
        flexDirection="row"
        gap="4px"
        sx={{ padding: "12px", background: "#fff" }}
      >
        <Stack gap="4px" flexDirection="row">
          <IconButton
            sx={editorToolIconStyle}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, "bold");
            }}
          >
            <EditorBold size="16px" color="#1c252e" />
          </IconButton>
          <IconButton
            sx={editorToolIconStyle}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, "italic");
            }}
          >
            <EditorItalic size="16px" color="#1c252e" />
          </IconButton>
          <IconButton
            sx={editorToolIconStyle}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, "underline");
            }}
          >
            <EditorUnderline size="16px" color="#1c252e" />
          </IconButton>
        </Stack>
        <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />
        <Stack gap="4px" flexDirection="row">
          <IconButton
            sx={editorToolIconStyle}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleAlign(editor, "left");
            }}
          >
            <EditorLeft size="16px" color="#1c252e" />
          </IconButton>
          <IconButton
            sx={editorToolIconStyle}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleAlign(editor, "center");
            }}
          >
            <EditorCenter size="16px" color="#1c252e" />
          </IconButton>
          <IconButton
            sx={editorToolIconStyle}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleAlign(editor, "right");
            }}
          >
            <EditorRight size="16px" color="#1c252e" />
          </IconButton>
          <IconButton
            sx={editorToolIconStyle}
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
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const url = reader.result;
                    insertImage(editor, url);
                  };
                  reader.readAsDataURL(file);
                }
                // Reset input so the same image can be uploaded again if deleted
                e.target.value = "";
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <div
        style={{
          marginBottom: "10px",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
        }}
      >
        {/* Blocks */}
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-one");
          }}
        >
          H1
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-two");
          }}
        >
          H2
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-three");
          }}
        >
          H3
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-four");
          }}
        >
          H4
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-five");
          }}
        >
          H5
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-six");
          }}
        >
          H6
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "block-quote");
          }}
        >
          Quote
        </button>
        <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />

        <button onClick={() => document.getElementById("image-upload").click()}>
          📷 Upload Image
        </button>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const url = reader.result;
                insertImage(editor, url);
              };
              reader.readAsDataURL(file);
            }
            // Reset input so the same image can be uploaded again if deleted
            e.target.value = "";
          }}
        />
      </div>
    </>
  );
}
EditorToolbar.propTypes = {
  toggleMark: PropTypes.func.isRequired,
  toggleBlock: PropTypes.func.isRequired,
  toggleAlign: PropTypes.func.isRequired,
  insertImage: PropTypes.func.isRequired,
  editor: PropTypes.object.isRequired,
  isMarkActive: PropTypes.func.isRequired,
  isBlockActive: PropTypes.func.isRequired,
  isAlignActive: PropTypes.func.isRequired,
};
