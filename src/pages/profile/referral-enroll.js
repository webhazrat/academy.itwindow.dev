import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Copy } from "lucide-react";

export default function ReferralEnroll() {
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">রেফারেল ইনরোল</h1>

          <div className="space-y-5">
            <div className="bg-card flex flex-col gap-2 rounded-md p-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value="https://course.itwindow.dev/login?ref=45sd5sd4g5da45"
                />
                <Button
                  size="sm"
                  className="bg-gradient text-white flex gap-2 items-center flex-shrink-0"
                >
                  <Copy size={16} /> কপি করুন
                </Button>
              </div>
              <p className="dark:text-slate-400 text-sm">
                এখান থেকে রেফারেল লিংক কপি করে যেকোন শিক্ষার্থীকে এই রেফারেল
                লিংকের মাধ্যমে ইনরোল করালে 10% কমিশন।
              </p>
            </div>

            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b py-2">শিক্ষার্থীর নাম</td>
                  <td className="border-b py-2">কোর্সের নাম</td>
                  <td className="border-b py-2">স্ট্যাটাস</td>
                  <td className="border-b py-2 text-right">পেইড অ্যামাউন্ট</td>
                </tr>
                <tr className="dark:text-slate-400">
                  <td className="border-b py-2">সাহাদাত হোসেন</td>
                  <td className="border-b py-2">
                    এইচএসসি আইসিটি ক্র্যাশ কোর্স
                  </td>
                  <td className="border-b py-2 text-green-400">Admitted</td>
                  <td className="border-b py-2 text-right text-green-400">
                    ৳1500
                  </td>
                </tr>
                <tr className="dark:text-slate-400">
                  <td className="border-b py-2">সাবিদ হোসেন</td>
                  <td className="border-b py-2">
                    এইচএসসি আইসিটি ক্র্যাশ কোর্স
                  </td>
                  <td className="border-b py-2 text-green-400">Admitted</td>
                  <td className="border-b py-2 text-right text-green-400">
                    ৳1500
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
