import useSWR from "swr";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { fetcher } from "../lib/utils";

export default function AccountPayment({ enroll, setEnroll }) {
  const { data, isLoading } = useSWR(
    `/api/accounts/enroll?id=${enroll._id}`,
    fetcher
  );
  const payments = data?.data;
  console.log({ enroll, data });
  return (
    <Dialog open={enroll} onOpenChange={setEnroll}>
      <DialogContent className="max-w-3xl p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>পেমেন্ট বিবরণ</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_200px)] overflow-y-auto">
          <div className="p-7 pt-0 space-y-5">
            <div className="grid grid-cols-2">
              <div className="space-y-1">
                <p>
                  <span className="dark:text-slate-400">নাম:</span>{" "}
                  {enroll.userId.name}
                </p>
                <p>
                  <span className="dark:text-slate-400">মোবাইল নাম্বার:</span>{" "}
                  {enroll.userId.phone}
                </p>
                <p>
                  <span className="dark:text-slate-400">ঠিকানা:</span>{" "}
                  {enroll.userId.address}
                </p>
                <p>
                  <span className="dark:text-slate-400">
                    সর্বশেষ শিক্ষাগত যোগ্যতা:
                  </span>{" "}
                  {enroll.userId.education}
                </p>
                <p>
                  <span className="dark:text-slate-400">প্রতিষ্ঠান:</span>{" "}
                  {enroll.userId.institute}
                </p>
              </div>
              <div>
                <div className="space-y-1">
                  <p>
                    <span className="dark:text-slate-400">কোর্স:</span>{" "}
                    {enroll.courseId.title}
                  </p>
                  <p>
                    <span className="dark:text-slate-400">ফি:</span> ৳
                    {enroll.courseId.fee}
                  </p>
                </div>
              </div>
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="table-auto border-t border-collapse w-full rounded-md">
                <thead>
                  <tr>
                    <td className="border-b py-2">তারিখ</td>
                    <td className="border-b py-2">পেমেন্ট মেথড</td>
                    <td className="border-b py-2">ট্রানজেশন আইডি</td>
                    <td className="border-b py-2">অ্যামাউন্ট</td>
                    <td className="border-b py-2">স্ট্যাটাস</td>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 &&
                    payments.map((payment) => (
                      <tr key={payment._id} className="dark:text-slate-400">
                        <td className="border-b py-2">{payment.createdAt}</td>
                        <td className="border-b py-2">
                          {payment.paymentMethod}
                        </td>
                        <td className="border-b py-2">
                          {payment.transactionId}
                        </td>
                        <td className="border-b py-2 text-green-400">
                          {payment.amount}
                        </td>
                        <td className="border-b py-2 text-green-400">
                          {payment.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
