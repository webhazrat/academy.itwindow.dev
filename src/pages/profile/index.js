import Label from "@/src/components/Label";
import ProfileEdit from "@/src/components/ProfileEdit";
import ProfileLayout from "@/src/components/ProfileLayout";
import { useUserProfile } from "@/src/hook/useUserProfile";
import { getSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  const { user, isLoading, mutate } = useUserProfile();

  // profile update logic
  const handleProfileUpdate = async (data) => {
    try {
      const response = await fetch("api/user/update", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updateResponse = await response.json();
      if (response.ok) {
        mutate();
      }
      return updateResponse;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ProfileLayout>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-medium mb-3">প্রোফাইল</h1>
              <ProfileEdit user={user} onSubmit={handleProfileUpdate} />
            </div>
            <div>
              <div className="flex gap-5 items-center">
                <Image
                  src={"/hazrat.jpg"}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div>
                  <h2 className="text-lg font-medium">{user?.name}</h2>
                  <p className="dark:text-slate-400 text-[15px]">
                    {user?.phone}
                  </p>
                  <p className="dark:text-slate-400  text-[15px]">
                    {user?.email || "-"}
                  </p>
                </div>
              </div>
              <hr className="my-6" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <h1 className="text-lg font-medium">ব্যক্তিগত তথ্য</h1>
                  <div>
                    <Label>বর্তমান ঠিকানা :</Label>
                    <p className="dark:text-slate-400">
                      {user?.address || "-"}
                    </p>
                  </div>
                  <div>
                    <Label>অভিভাবকের নাম :</Label>
                    <p className="dark:text-slate-400">
                      {user?.guardian || "-"}
                    </p>
                  </div>
                  <div>
                    <Label>অভিভাবকের মোবাইল নাম্বার :</Label>
                    <p className="dark:text-slate-400">
                      {user?.guardianPhone || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-5">
                  <h1 className="text-lg font-medium">শিক্ষাগত তথ্য</h1>
                  <div>
                    <Label>সর্বশেষ শিক্ষাগত যোগ্যতা :</Label>
                    <p className="dark:text-slate-400">
                      {user?.education || "-"}
                    </p>
                  </div>
                  <div>
                    <Label>প্রতিষ্ঠানের নাম :</Label>
                    <p className="dark:text-slate-400">
                      {user?.institute || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ProfileLayout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
