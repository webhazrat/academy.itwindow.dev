import ListItem from "@/src/components/ListItem";
import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { useUserProfile } from "@/src/hook/useUserProfile";
import { fetcher, statusColor, total } from "@/src/lib/utils";
import { checkLogin } from "@/src/middleware/clientAuth";
import React, { useState } from "react";
import useSWR from "swr";

export default function ReferralEnroll() {
  const { user } = useUserProfile();

  const { data: usersData, isLoading } = useSWR("/api/user/refer", fetcher);
  const users = usersData?.data;

  console.log({ users });

  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">রেফারেল ইনরোল</h1>

          <div className="space-y-5">
            <div className="bg-card flex flex-col gap-2 rounded-md p-4 max-w-xs">
              <strong>৳100</strong>
              <Button className="bg-gradient text-white">পে আউট</Button>

              <p className="dark:text-slate-400 text-sm">
                পে আউট করার জন্য সর্বনিম্ন ৳100 হতে হবে।
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-card rounded-md p-4 space-y-4">
              <ListItem>
                আপনি যদি কোন শিক্ষর্থীকে আপনার অ্যাকাউন্ট রেফারেল মোবাইল নাম্বার{" "}
                <span className="dark:text-white"> ({user?.phone}) </span>{" "}
                ব্যবহার করে সাইন আপ করান এবং পরবর্তীতে সেই শিক্ষার্থী এই
                প্লাটফর্ম থেকে কোন কোর্স নেন, তাহলে তার কোর্স ফি এর 10% কমিশন
                অ্যাড হবে আপনার প্রোফাইলে। এবং সর্বনিম্ন 100 টাকা হলে আপনি যেকোন
                মোবাইল ব্যাংকিং ব্যবহার করে পে আউট করতে পারবেন।
              </ListItem>
              <ListItem>
                রেফারেলে কোন শিক্ষর্থীকে সাইন আপ করতে সাইন আপ অপশনে গিয়ে{" "}
                <span className="dark:text-white">[যদি কোন রেফারেল থাকে]</span>{" "}
                অপশনে এই মোবাইল নাম্বার{" "}
                <span className="dark:text-white"> ({user?.phone}) </span>{" "}
                ব্যবহার করতে হবে।
              </ListItem>
            </div>
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
                    users.map((user) => {
                      const totalPaidAmmount = total(
                        user.enrollId?.payments,
                        "Approved"
                      );
                      return (
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
                            {totalPaidAmmount}
                          </td>
                        </tr>
                      );
                    })}
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
