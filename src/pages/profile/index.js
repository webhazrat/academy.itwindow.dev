import Label from "@/src/components/Label";
import ProfileEdit from "@/src/components/ProfileEdit";
import ProfileImage from "@/src/components/ProfileImage";
import ProfileLayout from "@/src/components/ProfileLayout";
import { useUserProfile } from "@/src/hook/useUserProfile";
import { checkLogin } from "@/src/middleware/clientAuth";
import Image from "next/image";

export default function Profile() {
  const { user, isLoading, mutate } = useUserProfile();

  // profile update logic
  const handleProfileUpdate = async (data) => {
    try {
      const response = await fetch("api/user/update", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log({ profilePage: error });
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
              {user && (
                <ProfileEdit
                  user={user}
                  mutate={mutate}
                  onSubmit={handleProfileUpdate}
                />
              )}
            </div>
            <div>
              <div className="flex gap-5 items-center">
                <div className="relative">
                  <div className="w-[100px] h-[100px] border rounded-full">
                    <Image
                      src={`${
                        user?.image ? `/uploads/${user.image}` : "/no-photo.png"
                      }`}
                      width={150}
                      height={150}
                      className="rounded-full"
                    />
                  </div>

                  <ProfileImage mutate={mutate} />
                </div>
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

export async function getServerSideProps(context) {
  return checkLogin(context);
}
