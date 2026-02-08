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

  switch (node.type) {
    case "paragraph":
      if (children === "") {
        return "<br />";
      }
      return `<p>${children}</p>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "heading-three":
      return `<h3>${children}</h3>`;
    case "heading-four":
      return `<h4>${children}</h4>`;
    case "heading-five":
      return `<h5>${children}</h5>`;
    case "heading-six":
      return `<h6>${children}</h6>`;
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "break":
      return `<br />`;
    default:
      return children;
  }
};

// --- 3. Main Component ---

export default function MyEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  const htmlOutput = useMemo(
    () => value.map((node) => serialize(node)).join(""),
    [value],
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
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        {/* TOOLBAR */}
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
          {/* Marks */}
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, "bold");
            }}
          >
            <b>B</b>
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, "italic");
            }}
          >
            <i>I</i>
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, "underline");
            }}
          >
            <u>U</u>
          </button>

          <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />

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
        </div>

        <Editable
          placeholder="Type something..."
          onKeyDown={onKeyDown}
          style={{
            minHeight: "200px",
            lineHeight: "1.2",
            padding: "10px",
            border: "1px solid #eee",
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
          // This tells Slate how to render the blocks visually in the editor
          renderElement={useCallback(({ attributes, children, element }) => {
            switch (element.type) {
              case "block-quote":
                return (
                  <blockquote style={elementStyle} {...attributes}>
                    {children}
                  </blockquote>
                );
              case "heading-one":
                return (
                  <h1 style={elementStyle} {...attributes}>
                    {children}
                  </h1>
                );
              case "heading-two":
                return (
                  <h2 style={elementStyle} {...attributes}>
                    {children}
                  </h2>
                );
              case "heading-three":
                return (
                  <h3 style={elementStyle} {...attributes}>
                    {children}
                  </h3>
                );
              case "heading-four":
                return (
                  <h4 style={elementStyle} {...attributes}>
                    {children}
                  </h4>
                );
              case "heading-five":
                return (
                  <h5 style={elementStyle} {...attributes}>
                    {children}
                  </h5>
                );
              case "heading-six":
                return (
                  <h6 style={elementStyle} {...attributes}>
                    {children}
                  </h6>
                );
              default:
                return (
                  <p style={elementStyle} {...attributes}>
                    {children}
                  </p>
                );
            }
          }, [])}
          // This tells Slate how to render Bold/Italic/Underline visually
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

      <div style={{ marginTop: "40px" }}>
        <h3>HTML Output:</h3>
        <textarea
          readOnly
          value={htmlOutput}
          style={{ width: "100%", height: "100px", background: "#f5f5f5" }}
        />
        <div
          className="mt-2 p-4 border rounded bg-gray-50"
          dangerouslySetInnerHTML={{ __html: htmlOutput }}
        />
      </div>
    </div>
  );
}
