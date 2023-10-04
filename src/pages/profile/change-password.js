import Label from "@/src/components/Label";
import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function PresentReport() {
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">পাসওয়ার্ড পরিবর্তন</h1>
          <div className="max-w-lg">
            <form action="" className="space-y-4">
              <div className="space-y-3">
                <Label>পূর্বের পাসওয়ার্ড</Label>
                <Input type="password" />
              </div>
              <div className="space-y-3">
                <Label>নতুন পাসওয়ার্ড</Label>
                <Input type="password" />
                <p className="text-sm dark:text-slate-400">
                  পাসওয়ার্ড কমপক্ষে 6 অক্ষরসহ 1টি লেটার এবং 1টি নাম্বার হতে হবে।
                </p>
              </div>
              <div className="space-y-3">
                <Label>পাসওয়ার্ডটি পুনরায় দিন</Label>
                <Input type="password" />
                <p className="text-sm dark:text-slate-400">
                  অবশ্যই উপরের পাসওয়ার্ড এর সাথে মিলতে হবে
                </p>
              </div>
              <Button className="bg-gradient text-white">পরিবর্তন</Button>
            </form>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
