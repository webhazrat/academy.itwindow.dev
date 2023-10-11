import * as Icons from "lucide-react";

export default function DynamicIcon({ iconName, ...props }) {
  const IconComponent = Icons[iconName];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...props} />;
}
