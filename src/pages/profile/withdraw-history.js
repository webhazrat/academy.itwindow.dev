import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { fetcher, statusColor } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import React from "react";
import useSWR from "swr";

export default function WithdrawHistory() {
  const { data: usersData, isLoading } = useSWR("/api/user/refer", fetcher);
  const users = usersData?.data;

  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">উইথড্রো বিবরণ</h1>

          <div className="space-y-5">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="table-auto border-t border-collapse w-full rounded-md">
                <thead>
                  <tr>
                    <td className="border-b py-2">নাম</td>
                    <td className="border-b py-2">মোবাইল নাম্বার</td>
                    <td className="border-b py-2">কোর্সের নাম</td>
                    <td className="border-b py-2">স্ট্যাটাস</td>
                    <td className="border-b py-2 text-right">
                      পেইড অ্যামাউন্ট
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {users?.length > 0 &&
                    users.map((user) => (
                      <tr key={user._id} className="dark:text-slate-400">
                        <td className="border-b py-2">{user.name}</td>
                        <td className="border-b py-2">
                          <a href={`tel:+88${user.phone}`}>{user.phone}</a>
                        </td>
                        <td className="border-b py-2">
                          {user?.enrollId?.courseId?.title || "-"}
                        </td>
                        <td
                          className={`border-b py-2 text-sm ${statusColor(
                            user?.enrollId?.status
                          )}`}
                        >
                          {user?.enrollId?.status || "-"}
                        </td>
                        <td className="border-b py-2 text-right text-green-400">
                          -
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
export async function getServerSideProps(context) {
  return checkLogin(context);
}
