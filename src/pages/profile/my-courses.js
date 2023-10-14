import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { checkLogin } from "@/src/lib/auth";
import { BookOpen, Calendar, Paperclip, Video } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function MyCourses() {
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">কোর্সসমূহ</h1>

          <div className="space-y-3">
            <div className="border border-red-400 rounded-md p-4">
              <div className="space-y-2">
                <h2>এইচএসসি আইসিটি ক্র্যাশ কোর্স</h2>
                <div className="dark:text-slate-400 flex flex-wrap gap-x-4 gap-y-2">
                  <p className="text-[15px] flex items-center gap-2">
                    <Calendar size={16} /> 04 Oct 2023
                  </p>
                  <Link href={"/"}>
                    <a className="flex items-center gap-2">
                      <Paperclip size={16} /> ক্লাস রুটিন
                    </a>
                  </Link>
                  <Link href={"/"}>
                    <a className="flex items-center gap-2">
                      <BookOpen size={16} /> লেকচার সীট
                    </a>
                  </Link>
                  <Link href={"/"}>
                    <a className="flex items-center gap-2">
                      <Video size={16} /> রেকর্ডেড ভিডিও
                    </a>
                  </Link>
                </div>
                <div className="space-y-2">
                  <p className="text-red-400">
                    মোট কোর্স ফি ৳3000। এর 50% পে করার মাধ্যমে কোর্সটিতে
                    ইনরোলমেন্ট সম্পন্ন হবে।
                  </p>
                  <Button className="bg-gradient text-white" size="sm">
                    পে করুন
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  return checkLogin(context);
}
