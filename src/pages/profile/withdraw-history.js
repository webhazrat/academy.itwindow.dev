import ProfileLayout from "@/src/components/ProfileLayout";
import { checkLogin } from "@/src/middleware/clientAuth";
import React from "react";

export default function WithdrawHistory() {
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">উইথড্রো বিবরণ</h1>

          <div className="space-y-5">
            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b py-2">নাম</td>
                  <td className="border-b py-2">মোবাইল নাম্বার</td>
                  <td className="border-b py-2">কোর্সের নাম</td>
                  <td className="border-b py-2">স্ট্যাটাস</td>
                  <td className="border-b py-2 text-right">পেইড অ্যামাউন্ট</td>
                </tr>
              </thead>
              <tbody></tbody>
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
