import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { fetcher } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import { BookOpen, Calendar, Paperclip, Video } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

export default function MyCourses() {
  const { data, isLoading, mutate } = useSWR("/api/enroll", fetcher);
  const enrolls = data?.data;
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">কোর্সসমূহ</h1>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            enrolls.length > 0 &&
            enrolls.map((enroll) => (
              <div className="space-y-3" key={enroll._id}>
                <div className="border border-red-400 rounded-md p-4">
                  <div className="space-y-2">
                    <h2 className="text-[17px]">{enroll.courseId.title}</h2>
                    <div className="dark:text-slate-400 flex flex-wrap gap-3">
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
                      <p className="text-red-300">
                        মোট কোর্স ফি ৳{enroll.courseId.fee}। এর 50% (
                        {enroll.courseId.fee / 2}) পে করার মাধ্যমে কোর্সটিতে
                        ইনরোলমেন্ট সম্পন্ন হবে।
                      </p>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-gradient">
                          <Link href={"/"}>ফিডব্যাক দিন</Link>
                        </span>
                        <Button className="bg-gradient text-white" size="sm">
                          পে করুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ProfileLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  return checkLogin(context);
}
