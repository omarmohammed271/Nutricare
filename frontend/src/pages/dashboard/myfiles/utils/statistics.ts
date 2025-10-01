import { FolderItem, FileItem } from '../types';

export const calculateStatistics = (folders: FolderItem[], files: FileItem[]) => {
  const totalFolders = folders.length;
  const totalFiles = folders.reduce((acc, folder) => acc + folder.files.length, 0) + files.length;
  const totalMedia = folders.reduce((acc, folder) => 
    acc + folder.files.filter(file => file.type === 'video').length, 0
  );

  return {
    totalFolders,
    totalFiles,
    totalMedia
  };
};