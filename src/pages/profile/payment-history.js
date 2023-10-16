import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { checkLogin } from "@/src/middleware/clientAuth";

export default function PaymentHistory() {
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">পেমেন্ট বিবরণ</h1>
          <div className="space-y-5">
            <div className="bg-card flex flex-col gap-2 rounded-md p-4 max-w-xs">
              <strong>৳100</strong>
              <Button className="bg-gradient text-white">পে আউট</Button>

              <p className="dark:text-slate-400 text-sm">
                পে আউট করার জন্য সর্বনিম্ন ৳100 হতে হবে।
              </p>
            </div>
            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b py-2">তারিখ</td>
                  <td className="border-b py-2">বিবরণ</td>
                  <td className="border-b py-2">স্ট্যাটাস</td>
                  <td className="border-b py-2 text-right">অ্যামাউন্ট</td>
                </tr>
                <tr className="dark:text-slate-400">
                  <td className="border-b py-2">04 Oct 2023</td>
                  <td className="border-b py-2">
                    এইচএসসি আইসিটি ক্র্যাশ কোর্স
                  </td>
                  <td className="border-b py-2">Success</td>
                  <td className="border-b py-2 text-right text-green-400">
                    15
                  </td>
                </tr>
                <tr className="dark:text-slate-400">
                  <td className="border-b py-2">04 Oct 2023</td>
                  <td className="border-b py-2">
                    এইচএসসি আইসিটি ক্র্যাশ কোর্স
                  </td>
                  <td className="border-b py-2">Success</td>
                  <td className="border-b py-2 text-right text-red-400">
                    -1500
                  </td>
                </tr>
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
