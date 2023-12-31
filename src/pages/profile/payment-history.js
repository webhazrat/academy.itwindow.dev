import ProfileLayout from "@/src/components/ProfileLayout";
import { useUserEnrolls } from "@/src/hook/useUserEnrolls";
import { statusColor } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import { format } from "date-fns";

export default function PaymentHistory() {
  const { enrollsData, paymentsData, isLoading } = useUserEnrolls();

  // course title from enrolls
  const getCourseTitle = (enrollId) => {
    const enroll = enrollsData.find((enroll) => enroll._id === enrollId);
    return enroll.courseId.title;
  };

  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">পেমেন্ট বিবরণ</h1>
          <div className="space-y-5">
            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b py-2">তারিখ</td>
                  <td className="border-b py-2">বিবরণ</td>
                  <td className="border-b py-2">মেথড</td>
                  <td className="border-b py-2">ট্রানজেকশন আইডি</td>
                  <td className="border-b py-2">স্ট্যাটাস</td>
                  <td className="border-b py-2">কমেন্ট</td>
                  <td className="border-b py-2 text-right">অ্যামাউন্ট</td>
                </tr>
                {paymentsData?.length > 0 &&
                  paymentsData.map((payment) => {
                    const courseTitle = getCourseTitle(payment.enrollId);
                    return (
                      <tr
                        key={payment._id}
                        className="dark:text-slate-400 text-sm hover:bg-muted/50"
                      >
                        <td className="border-b py-2">
                          {format(new Date(payment.createdAt), "PPP")}
                        </td>
                        <td className="border-b py-2">{courseTitle}</td>
                        <td className="border-b py-2">
                          {payment.paymentMethod}
                        </td>
                        <td className="border-b py-2">
                          {payment.transactionId}
                        </td>
                        <td
                          className={`border-b py-2 ${statusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </td>
                        <td className={`border-b py-2`}>{payment.comment}</td>
                        <td className="border-b py-2 text-right">
                          {payment.amount}
                        </td>
                      </tr>
                    );
                  })}
              </thead>
            </table>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  return checkLogin(context);
}
