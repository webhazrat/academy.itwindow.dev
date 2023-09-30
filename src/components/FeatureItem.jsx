import { MonitorDot } from "lucide-react";

export default function FeatureItem({ item }) {
  return (
    <div className="space-y-3">
      <MonitorDot size={34} strokeWidth={1} />
      <h5 className="font-medium">{item.title}</h5>
      <p className="dark:text-slate-400">{item.description}</p>
    </div>
  );
}
