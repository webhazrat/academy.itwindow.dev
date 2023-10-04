import Link from "next/link";
import { Button } from "./ui/button";

export default function Banner() {
  return (
    <div className="banner-bg">
      <div className="max-w-3xl mx-auto py-20 text-center space-y-5">
        <h1 className="text-[40px] font-bold dark:text-white">
          আমাদের <span className="text-gradient">স্কিল ডেভেলপমেন্ট কোর্স</span>{" "}
          নিয়ে ভবিষ্যত কর্মজীবনের জন্য নিজেকে প্রস্তুত করুন
        </h1>
        <p className="dark:text-slate-400 max-w-2xl mx-auto">
          আমাদের স্কিল ডেভেলপমেন্ট কোর্সগুলি আপনাকে প্রয়োজনীয় স্কিল এবং জ্ঞান
          সরবরাহ করে, যা আপনার সাক্ষরতা বা ক্যারিয়ার এবং উচ্চতর শিক্ষা আপনার
          লক্ষ্যে সাহায্য করতে সম্মুখীন করতে সাহায্য করতে পারে।
        </p>
        <div>
          <p className="px-5 py-2 bg-com-gradient inline-block text-[22px] font-semibold rounded-md">
            অনলাইন বা অফলাইন ব্যাচে ভর্তি হয়ে বা ভর্তি করে 10% কমিশন
          </p>
        </div>
        <Link href={"/commission"}>
          <a className="dark:text-slate-400 underline underline-offset-2 inline-block">
            বিস্তারিত জানুন
          </a>
        </Link>
        <div>
          <Link href={"/login"}>
            <Button className="bg-gradient text-white">সাইন আপ করুন</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
