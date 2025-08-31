import { icons } from "lucide-react";

const LucideIcon = ({ name, size }: { name: keyof typeof icons; size: number }) => {
  const LucideIcon = icons[name];

  return <LucideIcon size={size} />;
};

export default LucideIcon;
