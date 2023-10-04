import Label from "./Label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MobileForm() {
  return (
    <div>
      <form className="space-y-3">
        <Label className="font-medium">মোবাইল নাম্বার</Label>
        <Input type="text" placeholder="01712 122501" />
        <p className="text-sm dark:text-slate-400">
          মোবাইল নাম্বার ভেরিফাই করার জন্য সঠিক মোবাইল নাম্বার ইনপুট করুন।
        </p>
        <Button type="button" className="bg-gradient text-white">
          সাবমিট করুন
        </Button>
      </form>
    </div>
  );
}
