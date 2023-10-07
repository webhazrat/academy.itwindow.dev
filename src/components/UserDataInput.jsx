import { ChevronLeft } from "lucide-react";
import Label from "./Label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

export default function UserDataInput() {
  return (
    <div>
      <Button variant="outline" className="mb-8">
        <ChevronLeft />
      </Button>

      <div className="space-y-3">
        <div className="space-y-3">
          <Label className="font-medium">আপনার পুরো নাম</Label>
          <Input type="text" />
          <p className="text-sm dark:text-slate-400">
            সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে, তাই সঠিক নাম ব্যবহার করুন
          </p>
        </div>

        <div className="space-y-3">
          <Label className="font-medium">পাসওয়ার্ড</Label>
          <Input type="text" />
          <p className="text-sm dark:text-slate-400">
            পাসওয়ার্ড কমপক্ষে 6 অক্ষরসহ 1টি লেটার এবং 1টি নাম্বার হতে হবে
          </p>
        </div>

        <div className="space-y-3">
          <Label className="font-medium">পুনরায় একই পাসওয়ার্ড দিন</Label>
          <Input type="text" />
          <p className="text-sm dark:text-slate-400">
            অবশ্যই উপরের পাসওয়ার্ড এর সাথে মিলতে হবে
          </p>
        </div>

        <div className="py-2">
          <label
            htmlFor="terms"
            className="flex items-center gap-3 dark:text-slate-400"
          >
            <Checkbox id="terms" /> আমি এই প্লাটফর্মের রিফান্ড পলিসি সহ সকল শর্ত
            মেনে নিচ্ছি
          </label>
        </div>
        <Button className="bg-gradient text-white">সাবমিট করুন</Button>
      </div>
    </div>
  );
}
