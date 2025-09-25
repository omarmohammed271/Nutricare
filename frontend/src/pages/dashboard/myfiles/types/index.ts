export interface FileItem {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'note';
  author?: string;
  selected?: boolean;
}

export interface FolderItem {
  id: string;
  name: string;
  files: FileItem[];
  expanded?: boolean;
}

export interface StatsCardProps {
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}