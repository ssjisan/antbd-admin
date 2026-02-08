export default function EditorToolbar({
  toggleMark,
  toggleBlock,
  editor,
  toggleAlign,
  insertImage,
}) {
  return (
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
      <span style={{ borderLeft: "1px solid #ccc", margin: "0 8px" }} />

      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleAlign(editor, "left");
        }}
      >
        Left
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleAlign(editor, "center");
        }}
      >
        Center
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleAlign(editor, "right");
        }}
      >
        Right
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleAlign(editor, "justify");
        }}
      >
        Justify
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
  );
}
