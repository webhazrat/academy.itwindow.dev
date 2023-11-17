import { Star } from "lucide-react";
import Image from "next/image";

export default function FeedbackItem({ feedback }) {
  return (
    <div className="dark:text-slate-400 border p-5 rounded-md space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Star
              key={index}
              size={14}
              className={`${index < feedback.star && "text-yellow-600"}`}
            />
          ))}
        </div>
        <p>{feedback.comment}</p>
      </div>
      <div className="flex gap-3 items-center">
        <div className="border w-10 h-10 rounded-full flex-shrink-0">
          <Image
            src={`${
              feedback.userId.image
                ? `/uploads/${feedback.userId.image}`
                : "/no-photo.png"
            }`}
            height={40}
            width={40}
            className="rounded-full"
          />
        </div>
        <div>
          <h4 className="dark:text-white">{feedback.userId.name}</h4>
          <p className="text-sm">{feedback.userId.education}</p>
        </div>
      </div>
    </div>
  );
}
