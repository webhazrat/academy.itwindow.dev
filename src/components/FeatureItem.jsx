import Image from "next/image";

export default function FeatureItem({ item }) {
  return (
    <div className="space-y-3">
      <Image src={item.icon} width={40} height={40} />
      <h5 className="font-medium">{item.title}</h5>
      <p className="dark:text-slate-400">{item.description}</p>
    </div>
  );
}
