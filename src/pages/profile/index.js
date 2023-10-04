import Label from "@/src/components/Label";
import ProfileEdit from "@/src/components/ProfileEdit";
import ProfileLayout from "@/src/components/ProfileLayout";
import Image from "next/image";

export default function Profile() {
  return (
    <>
      <ProfileLayout>
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium mb-3">প্রোফাইল</h1>
            <ProfileEdit />
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
                <h2 className="text-lg font-medium">হযরত আলী</h2>
                <p className="dark:text-slate-400 text-[15px]">
                  +8801712 122501
                </p>
                <p className="dark:text-slate-400  text-[15px]">
                  mdhazrat445891@gmail.com
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
                    মহিশালবাড়ী, গোদাগাড়ী, রাজশাহী - 6290
                  </p>
                </div>
                <div>
                  <Label>অভিভাবকের নাম :</Label>
                  <p className="dark:text-slate-400">জামাল উদ্দীন</p>
                </div>
                <div>
                  <Label>অভিভাবকের মোবাইল নাম্বার :</Label>
                  <p className="dark:text-slate-400">+8801632 269194</p>
                </div>
              </div>
              <div className="space-y-5">
                <h1 className="text-lg font-medium">শিক্ষাগত তথ্য</h1>
                <div>
                  <Label>সর্বশেষ শিক্ষাগত যোগ্যতা :</Label>
                  <p className="dark:text-slate-400">ডিপ্লোমা ইন ইঞ্জিনিয়ার</p>
                </div>
                <div>
                  <Label>প্রতিষ্ঠানের নাম :</Label>
                  <p className="dark:text-slate-400">
                    রাজশাহী পলিটেকনিক ইন্সটিটিউট
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
