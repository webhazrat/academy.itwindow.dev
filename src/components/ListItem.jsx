import { Check } from "lucide-react";

export default function ListItem({ children, ...props }) {
  return (
    <div className="flex gap-4" {...props}>
      <div className="w-4 h-4 bg-[#43AF7B] rounded-full flex justify-center items-center flex-shrink-0 mt-1">
        <Check size={14} strokeWidth={3} className="text-background" />
      </div>
      <p className="dark:text-slate-400">{children}</p>
    </div>
  );
}
