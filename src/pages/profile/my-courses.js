import ListItem from "@/src/components/ListItem";
import MyBatch from "@/src/components/MyBatch";
import MyEnrollPayment from "@/src/components/MyEnrollPayment";
import MyFeedback from "@/src/components/MyFeeback";
import MyPay from "@/src/components/MyPay";
import ProfileLayout from "@/src/components/ProfileLayout";
import { useUserEnrolls } from "@/src/hook/useUserEnrolls";
import { total } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import { format } from "date-fns";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Paperclip,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function MyCourses() {
  const {
    enrollsData,
    paymentsData,
    isLoading,
    enrollsMutate,
    paymentsMutate,
  } = useUserEnrolls();

  useEffect(() => {
    enrollsMutate();
  }, []);

  const getPaymentForEnroll = (enrollId) => {
    return paymentsData?.filter((payment) => payment.enrollId === enrollId);
  };

  return (
    <>
      <ProfileLayout>
        <div className="space-y-4">
          <h1 className="text-xl font-medium">কোর্সসমূহ</h1>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            enrollsData?.length > 0 &&
            enrollsData.map((enroll) => {
              const payments = getPaymentForEnroll(enroll._id);
              const totalPaid = total(payments, "Approved");
              const totalPending = total(payments, "Pending");
              const fee = enroll.fee;
              const totalDue = !isNaN(totalPaid) && fee - totalPaid;
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
                        <p className="text-sm flex items-center gap-2">
                          <Calendar size={16} />{" "}
                          {format(new Date(enroll.createdAt), "MMMM do, yyyy")}
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
                            ইনরোলমেন্ট সম্পন্ন হয়েছে, আপনি পে করেছেন ৳
                            {totalPaid}
                          </ListItem>
                        )}
                        {enroll.stauts === "Ended" && (
                          <ListItem className="!gap-2">
                            ধন্যবাদ! আপনি সফভাবে কোর্সটি সম্পন্ন করেছেন
                          </ListItem>
                        )}
                        {enroll.status === "Pending" && (
                          <p className="flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-400" />
                            কোর্স ফি এর 50% ({halfPayment}) পে করার মাধ্যমে
                            কোর্সটিতে ইনরোলমেন্ট সম্পন্ন হবে
                          </p>
                        )}
                        <div className="flex justify-between items-center gap-4">
                          <ul className="flex gap-3 list-inside list-disc text-sm">
                            {enroll.status === "Completed" && (
                              <li className="hover:dark:text-white">
                                <MyFeedback courseId={enroll.courseId._id} />
                              </li>
                            )}
                            {enroll.batchId && (
                              <li className=" hover:dark:text-white">
                                <MyBatch batch={enroll.batchId} />
                              </li>
                            )}
                            <li className=" hover:dark:text-white">
                              <MyEnrollPayment payments={payments} fee={fee} />
                            </li>
                          </ul>
                          {totalDue === 0 ? (
                            <ListItem className="!gap-2">
                              পেমেন্ট সম্পন্ন
                            </ListItem>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-red-400">
                                পাওনা ৳{totalDue}
                              </span>
                              <MyPay
                                enrollId={enroll._id}
                                totalDue={totalDue}
                                totalPending={totalPending}
                                mutate={paymentsMutate}
                              />
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
