/* eslint-disable react/prop-types */

import { useMemo, useState, useCallback } from "react";
import {
  createEditor,
  Text,
  Editor,
  Transforms,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import EditorToolbar from "./EditorToolbar";
import PropTypes from "prop-types";
import { useSelected, useFocused, ReactEditor } from "slate-react";
import axios from "axios";

const ImageElement = ({ attributes, children, element, editor }) => {
  const selected = useSelected();
  const focused = useFocused();
  const removeTempImage = async (filename) => {
    await axios.delete(`/editor-image/${filename}`);
  };
  const removeImage = () => {
    // Find the specific path of this image element to delete it
    const path = ReactEditor.findPath(editor, element);
    Transforms.removeNodes(editor, { at: path });
    removeTempImage(element.filename);
  };

  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        style={{
          position: "relative",
          textAlign: element.align || "left",
          userSelect: "none",
        }}
      >
        <div style={{ display: "inline-block", position: "relative" }}>
          <img
            src={element.url}
            alt=""
            style={{
              display: "block",
              maxWidth: "100%",
              width: element.width || "auto",
              height: "auto",
              boxShadow: selected && focused ? "0 0 0 3px #B4D5FF" : "none",
            }}
          />

          {/* REMOVE BUTTON */}
          {selected && focused && (
            <button
              onMouseDown={(e) => {
                e.preventDefault(); // Important: prevents losing focus
                removeImage();
              }}
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "2px 8px",
                zIndex: 10,
              }}
            >
              Delete
            </button>
          )}

          {/* RESIZE HANDLE */}
          {selected && focused && (
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const imgElement = e.target.parentElement.querySelector("img");
                const startWidth = imgElement.offsetWidth;

                const onMouseMove = (moveEvent) => {
                  const newWidth = startWidth + (moveEvent.clientX - startX);
                  const path = ReactEditor.findPath(editor, element);
                  Transforms.setNodes(
                    editor,
                    { width: newWidth },
                    { at: path },
                  );
                };

                const onMouseUp = () => {
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("mouseup", onMouseUp);
                };

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
              }}
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "12px",
                height: "12px",
                background: "#4A90E2",
                cursor: "nwse-resize",
                border: "1px solid white",
              }}
            />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
// --- 1. Helper Functions for Formatting ---

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = ["numbered-list", "bulleted-list"].includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ["numbered-list", "bulleted-list"].includes(n.type),
    split: true,
  });

  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleAlign = (editor, format) => {
  const isActive = isAlignActive(editor, format);

  // If it's already active, we remove the alignment (defaulting to left)
  // otherwise, we set it to the new format
  Transforms.setNodes(
    editor,
    { align: isActive ? undefined : format },
    { match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n) },
  );
};

const isAlignActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.align === format,
    }),
  );
  return !!match;
};

// Add this to your helper functions
const insertImage = (editor, url, filename) => {
  const image = {
    type: "image",
    url,
    filename,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};

// This "plugin" is essential: it tells Slate not to treat the image as text
const withImages = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };
  return editor;
};

// --- 2. Updated Serializer ---

const escapeHtml = (str) => {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    string = string.replace(/\n/g, "<br />");
    if (node.bold) string = `<strong>${string}</strong>`;
    if (node.italic) string = `<em>${string}</em>`;
    if (node.underline) string = `<u>${string}</u>`;
    return string;
  }

  const children = node.children.map((n) => serialize(n)).join("");
  const alignStyle = node.align ? ` style="text-align: ${node.align};"` : "";
  const imgWidth = node.width ? `width: ${node.width}px;` : "max-width: 100%;";
  const imgAlign = node.align
    ? `text-align: ${node.align};`
    : "text-align: left;";
  switch (node.type) {
    case "paragraph":
      if (children === "") {
        return "<br />";
      }
      return `<p${alignStyle}>${children}</p>`;
    case "heading-one":
      return `<h1${alignStyle}>${children}</h1>`;
    case "heading-two":
      return `<h2${alignStyle}>${children}</h2>`;
    case "heading-three":
      return `<h3${alignStyle}>${children}</h3>`;
    case "heading-four":
      return `<h4${alignStyle}>${children}</h4>`;
    case "heading-five":
      return `<h5${alignStyle}>${children}</h5>`;
    case "heading-six":
      return `<h6${alignStyle}>${children}</h6>`;
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "break":
      return `<br />`;
    case "image":
      return `<div style="${imgAlign} margin: 10px 0;">
            <img src="${node.url}" style="${imgWidth} height: auto;" />
          </div>`;
    case "numbered-list":
      return `<ol${alignStyle}>${children}</ol>`;

    case "bulleted-list":
      return `<ul${alignStyle}>${children}</ul>`;

    case "list-item":
      return `<li>${children}</li>`;
    default:
      return children;
  }
};

// --- 3. Main Component ---

export default function MyEditor({
  value: propValue,
  onChangeValue,
  uploadedImages,
  setUploadedImages,
}) {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    [],
  );
  const [editorValue, setEditorValue] = useState(
    propValue || [{ type: "paragraph", children: [{ text: "" }] }],
  );

  const [, forceRender] = useState({});
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/editor-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url, filename } = res.data;

      insertImage(editor, url, filename);

      // Save filename for cleanup later
      setUploadedImages((prev) => [...prev, filename]);
    } catch (error) {
      console.error("Image upload failed:", error);

      if (error.response) {
        alert(error.response.data.message || "Image upload failed");
      } else {
        alert("Server not responding");
      }
    }
  };
  // eslint-disable-next-line
  const htmlOutput = useMemo(
    () => editorValue.map((node) => serialize(node)).join(""),
    [editorValue],
  );
  const elementStyle = {
    margin: "0 0 10px 0", // Bottom margin only for spacing between blocks
    lineHeight: "1.2", // Tighter line height to keep cursor/placeholder aligned
  };
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        event.preventDefault();
        editor.insertText("\n");
        return;
      } else {
        return;
      }
    }
  };
  return (
    <div
      style={{
        maxWidth: "900px",
        width: "100%",
        borderRadius: "12px 12px 0px 0px",
        overflow: "hidden",
      }}
    >
      <Slate
        editor={editor}
        initialValue={editorValue}
        onChange={(newValue) => {
          setEditorValue(newValue);
          forceRender({});
          if (onChangeValue) {
            const html = newValue.map((node) => serialize(node)).join(""); // fresh HTML
            onChangeValue(newValue, html);
          }
        }}
      >
        {/* Tool */}
        <EditorToolbar
          toggleMark={toggleMark}
          toggleBlock={toggleBlock}
          editor={editor}
          toggleAlign={toggleAlign}
          handleImageUpload={handleImageUpload}
          isMarkActive={isMarkActive}
          isBlockActive={isBlockActive}
          isAlignActive={isAlignActive}
        />
        <Editable
          placeholder="Type something..."
          onKeyDown={onKeyDown}
          style={{
            minHeight: "200px",
            lineHeight: "1.2",
            padding: "10px",
            background: "#f6f7f8",
          }}
          renderPlaceholder={({ attributes, children }) => (
            <div
              {...attributes}
              style={{
                ...attributes.style,
                top: "10px", // Matches your padding-top
                left: "10px", // Matches your padding-left
                opacity: 0.5,
                position: "absolute",
              }}
            >
              {children}
            </div>
          )}
          renderElement={useCallback(
            (props) => {
              const { attributes, children, element } = props;

              const combinedStyle = {
                ...elementStyle,
                textAlign: element.align || "left",
              };

              switch (element.type) {
                case "block-quote":
                  return (
                    <blockquote
                      {...attributes}
                      style={{
                        ...combinedStyle,
                        borderLeft: "4px solid #4A90E2",
                        background: "#f7f9fc",
                        padding: "10px 14px",
                        margin: "12px 0",
                        fontStyle: "italic",
                        color: "#444",
                      }}
                    >
                      {children}
                    </blockquote>
                  );

                case "heading-one":
                  return (
                    <h1 style={combinedStyle} {...attributes}>
                      {children}
                    </h1>
                  );
                case "heading-two":
                  return (
                    <h2 style={combinedStyle} {...attributes}>
                      {children}
                    </h2>
                  );
                case "heading-three":
                  return (
                    <h3 style={combinedStyle} {...attributes}>
                      {children}
                    </h3>
                  );
                case "heading-four":
                  return (
                    <h4 style={combinedStyle} {...attributes}>
                      {children}
                    </h4>
                  );
                case "heading-five":
                  return (
                    <h5 style={combinedStyle} {...attributes}>
                      {children}
                    </h5>
                  );
                case "heading-six":
                  return (
                    <h6 style={combinedStyle} {...attributes}>
                      {children}
                    </h6>
                  );

                case "image":
                  // Now 'props' is defined and passed correctly
                  return <ImageElement {...props} editor={editor} />;
                case "numbered-list":
                  return (
                    <ol style={combinedStyle} {...attributes}>
                      {children}
                    </ol>
                  );

                case "bulleted-list":
                  return (
                    <ul style={combinedStyle} {...attributes}>
                      {children}
                    </ul>
                  );

                case "list-item":
                  return <li {...attributes}>{children}</li>;
                default:
                  return (
                    <p style={combinedStyle} {...attributes}>
                      {children}
                    </p>
                  );
              }
            },
            [editor],
          )}
          renderLeaf={useCallback(({ attributes, children, leaf }) => {
            if (leaf.bold) children = <strong>{children}</strong>;
            if (leaf.italic) children = <em>{children}</em>;
            if (leaf.underline) children = <u>{children}</u>;
            return (
              <span {...attributes} style={{ whiteSpace: "pre-wrap" }}>
                {children}
              </span>
            );
          }, [])}
        />
      </Slate>

      {/* <div style={{ marginTop: "40px" }}>
        <h3>HTML Output:</h3>
        {htmlOutput}
        <div
          className="mt-2 p-4 border rounded bg-gray-50"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div> */}
    </div>
  );
}

ImageElement.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
  element: PropTypes.object,
  editor: PropTypes.object,
};
