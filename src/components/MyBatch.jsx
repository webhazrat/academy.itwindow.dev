import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { formatDateTime } from "../lib/utils";

export default function MyBatch({ batch }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="cursor-pointer">ব্যাচ বিস্তারিত</a>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>ব্যাচ বিস্তারিত</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
          <div className="p-7 space-y-5">
            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b p-2 pr-0"></td>
                  <td className="border-b p-2 pl-0">তারিখ</td>
                  <td className="border-b p-2">পেমেন্ট মেথড</td>
                  <td className="border-b p-2">ট্রানজেশন আইডি</td>
                  <td className="border-b p-2">স্ট্যাটাস</td>
                  <td className="border-b p-2">কমেন্ট</td>
                  <td className="border-b p-2">অ্যামাউন্ট</td>
                </tr>
              </thead>
              <tbody className="dark:text-slate-400">
                {payments.length > 0 ? (
                  <>
                    {payments.map((payment, index) => (
                      <tr key={payment._id} className={`text-sm`}>
                        <td className="border-b p-2">{++index}</td>
                        <td className="border-b py-2">
                          {formatDateTime(payment.createdAt, "MMMM do, yyyy")}
                        </td>
                        <td className="border-b p-2">
                          {payment.paymentMethod}
                        </td>
                        <td className="border-b p-2">
                          {payment.transactionId}
                        </td>
                        <td
                          className={`border-b p-2 ${
                            payment.status === "Pending" && "text-yellow-400"
                          } ${
                            payment.status === "Canceled" && "text-red-400"
                          } ${
                            payment.status === "Approved" && "text-green-400"
                          }`}
                        >
                          {payment.status}
                        </td>
                        <td className="border-b p-2">{payment.comment}</td>
                        <td className="border-b p-2 text-right">
                          {payment.amount}
                        </td>
                      </tr>
                    ))}
                    <tr className="text-white">
                      <td colSpan={5}></td>
                      <td className="border-b p-2 text-right">
                        মোট পেইড <span>({(totalPayment / fee) * 100}%)</span>
                      </td>
                      <td className="border-b p-2 text-right">
                        {totalPayment}
                      </td>
                    </tr>
                    <tr className="text-white">
                      <td colSpan={5}></td>
                      <td className="p-2 text-right">পাওনা</td>
                      <td className="p-2 text-right">{fee - totalPayment}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="border-b py-3 text-center text-sm"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
