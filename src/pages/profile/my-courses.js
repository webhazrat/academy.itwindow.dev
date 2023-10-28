import ListItem from "@/src/components/ListItem";
import MyEnrollPayment from "@/src/components/MyEnrollPayment";
import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { fetcher, formatDateTime, total } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Paperclip,
  Video,
} from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

export default function MyCourses() {
  const { data, isLoading, mutate } = useSWR("/api/enroll", fetcher);
  const enrolls = data?.data;

  const enrollIds = enrolls?.map((enroll) => enroll._id);
  const { data: paymentData } = useSWR(
    enrollIds ? `/api/payment/enroll?enrollId=${enrollIds.join(",")}` : null,
    fetcher
  );

  const getPaymentForEnroll = (enrollId) => {
    return paymentData?.data?.filter(
      (payment) => payment.enrollId === enrollId
    );
  };

  return (
    <>
      <ProfileLayout>
        <div className="space-y-4">
          <h1 className="text-xl font-medium">কোর্সসমূহ</h1>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            enrolls.length > 0 &&
            enrolls.map((enroll) => {
              const payments = getPaymentForEnroll(enroll._id);
              const totalPayment = total(payments, "Approved");
              const fee = enroll.courseId.fee;
              const halfPayment = fee / 2;
              return (
                <div className="space-y-3" key={enroll._id}>
                  <div className={`border rounded-md p-4 dark:text-slate-400`}>
                    <div className="space-y-2">
                      <div className="flex items-center gap-5 justify-between dark:text-white">
                        <h2 className="text-[17px]">{enroll.courseId.title}</h2>
                        <h2 className="text-[17px]">৳{fee}</h2>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <p className="text-[15px] flex items-center gap-2">
                          <Calendar size={16} />{" "}
                          {formatDateTime(enroll.createdAt, "MMMM do, yyyy")}
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
                        {enroll.status === "Completed" && (
                          <ListItem className="!gap-2">
                            <p className="text-green-400">
                              ইনরোলমেন্ট সম্পন্ন হয়েছে, আপনি পে করেছেন ৳
                              {totalPayment}
                            </p>
                          </ListItem>
                        )}
                        {enroll.stauts === "Ended" && (
                          <ListItem className="!gap-2">
                            <p className="text-green-400">
                              ধন্যবাদ! আপনি সফভাবে কোর্সটি সম্পন্ন করেছেন
                            </p>
                          </ListItem>
                        )}
                        {enroll.status === "Pending" && (
                          <p className="flex items-center gap-2">
                            <AlertTriangle size={18} className="text-red-400" />
                            কোর্স ফি এর 50% ({halfPayment}) পে করার মাধ্যমে
                            কোর্সটিতে ইনরোলমেন্ট সম্পন্ন হবে, আপনি পে করেছেন ৳
                            {totalPayment}
                          </p>
                        )}
                        <div className="flex justify-between items-center gap-5 text-sm">
                          <div className="divide-x-2">
                            <Link href={"/"}>
                              <a className="px-3 inline-block leading-none pl-0 hover:dark:text-white">
                                ফিডব্যাক দিন
                              </a>
                            </Link>
                            <Link href={"/"}>
                              <a className="px-3 inline-block leading-none  hover:dark:text-white">
                                ব্যাচ বিস্তারিত
                              </a>
                            </Link>
                            <a className="px-3 inline-block leading-none  hover:dark:text-white">
                              <MyEnrollPayment payments={payments} fee={fee} />
                            </a>
                          </div>
                          {totalPayment === fee ? (
                            <ListItem className="!gap-2">
                              <p className="text-green-400">পেমেন্ট সম্পন্ন</p>
                            </ListItem>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-red-400">
                                পাওনা ৳{fee - totalPayment}
                              </span>
                              <Button variant="outline" className="h-8">
                                <Link href={"/"}>পে করুন</Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ProfileLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  return checkLogin(context);
}
