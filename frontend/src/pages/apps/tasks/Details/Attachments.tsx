import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ComponentContainerCard, FileUploader, HorizontalFilePreview } from "@src/components";
import { handleDismiss } from "@src/helpers";
import { LuUploadCloud, LuX } from "react-icons/lu";
import avatar1 from "@src/assets/images/avatars/avatar1.png";
import avatar5 from "@src/assets/images/avatars/avatar5.png";

export type StaticFileType = {
  name: string;
  preview?: string;
  formattedSize?: string;
};

export const staticAttachments: StaticFileType[] = [
  {
    preview: avatar5,
    name: "Attex-sketch-design.zip",
    formattedSize: "2.3 MB",
  },
  {
    preview: avatar1,
    name: "Dashboard-design.jpg",
    formattedSize: "3.25 MB",
  },
  {
    name: "Admin-bug-report.mp4",
    formattedSize: "7.05 MB",
  },
];

const Attachments = () => {
  return (
    <ComponentContainerCard title="Attachments" stackProps={{ sx: { pt: "20px" } }}>
      <FileUploader icon={LuUploadCloud} iconSize={28} text="Drop files here or click to upload." />
      <Stack sx={{ gap: 2, width: "100%" }}>
        {staticAttachments.map((file, idx) => (
          <HorizontalFilePreview key={idx} file={file} />
        ))}
      </Stack>
    </ComponentContainerCard>
  );
};

export default Attachments;
