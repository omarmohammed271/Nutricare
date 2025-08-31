import { Box, Button } from "@mui/material";
import { ComponentContainerCard, FileUploader, PageBreadcrumb } from "@src/components";
import { LuUploadCloud } from "react-icons/lu";

const FileUploads = () => {
  return (
    <>
      <PageBreadcrumb title="File Upload" subName="Forms" />
      <ComponentContainerCard title="Dropzone" stackProps={{ sx: { pt: "20px" } }}>
        <FileUploader iconSize={24} icon={LuUploadCloud} text="Drop files here or click to upload." />
        <Box textAlign={"center"} width={"100%"} mt={"20px"}>
          <Button variant="contained" color="primary">
            Send Files
          </Button>
        </Box>
      </ComponentContainerCard>
    </>
  );
};

export default FileUploads;
