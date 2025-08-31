import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import { ComponentContainerCard, PageBreadcrumb } from "@src/components";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const Editors = () => {
  let valueBubble = "";
  let valueSnow = "";
  valueSnow = valueBubble = `<h3><span className="ql-size-large">Hello World!</span></h3>
  <br/>
  <h3>This is an simple editable area.</h3>
  <p><br/></p>
  <ul>
    <li>Select a text to reveal the toolbar.</li>
    <li>Edit rich document on-the-fly, so elastic!</li>
  </ul>
  <p><br/></p>
  <p>End of simple area</p>`;

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: [false, 1, 2, 3, 4, 5, 6] }, "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["direction", { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  return (
    <>
      <PageBreadcrumb title="Editors" subName="Forms" />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ComponentContainerCard title="Snow Editor">
          <Box mt={"20px"} width={"100%"}>
            <ReactQuill modules={modules} defaultValue={valueSnow} theme="snow" />
          </Box>
        </ComponentContainerCard>

        <ComponentContainerCard title="Bubble Editor" sx={{ overflow: "visible" }}>
          <Box mt={"20px"} width={"100%"} sx={{ border: "1px solid #CCCCCC" }}>
            <ReactQuill defaultValue={valueBubble} theme="bubble" style={{ height: 300 }} />
          </Box>
        </ComponentContainerCard>
      </Box>
    </>
  );
};

export default Editors;
