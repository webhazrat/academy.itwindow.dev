import { Star } from "lucide-react";
import Image from "next/image";

export default function FeedbackItem({ feedback }) {
  return (
    <div className="dark:text-slate-400 border p-5 rounded-md space-y-3">
      <div className="flex gap-1 text-yellow-600">
        <Star size={14} />
        <Star size={14} />
        <Star size={14} />
        <Star size={14} />
        <Star size={14} />
      </div>
      <p>
        এই কোর্সটি আমার আইটি জগতে একটি শ্রেষ্ঠ প্রাথমিক পরিচিতি দেওয়ার জন্য
        একটি অসাধারণ সুযোগ ছিল। শিক্ষকের প্রদর্শন ছিল ব্যক্তিগত এবং কোর্সের সাথে
        সম্পর্ক সৃজন করার জন্য উপকরণ ছিল।
      </p>
      <div className="flex gap-3">
        <div>
          <Image
            src={"/hazrat.jpg"}
            height={40}
            width={40}
            className="rounded-full"
          />
        </div>
        <div>
          <strong className="dark:text-white">হযরত আলী</strong>
          <p className="text-sm">কম্পিউটার সাইন্স, নর্থ আইটি</p>
        </div>
      </div>
    </div>
  );
}
