import { Eye } from "lucide-react";
import { Button } from "./ui/button";

export default function ToggleInputType({ handleType }) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={`absolute h-full top-0 right-0 rounded-s-none`}
      onClick={handleType}
    >
      <Eye size={14} />
    </Button>
  );
}
