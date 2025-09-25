import React from 'react';
import { PictureAsPdf, VideoLibrary, Note } from '@mui/icons-material';

const FileIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'pdf':
      return <PictureAsPdf color="error" />;
    case 'video':
      return <VideoLibrary color="primary" />;
    case 'note':
      return <Note color="action" />;
    default:
      return <Note color="action" />;
  }
};

export default FileIcon;