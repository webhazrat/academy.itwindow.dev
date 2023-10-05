import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import Label from "./Label";
import { Input } from "./ui/input";
import React from "react";

export default function MobileVerifyForm({ length }) {
  const [otp, setOtp] = React.useState(new Array(length).fill(""));

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return false;

    otp[index] = e.target.value;
    setOtp([...otp]);

    if (index < length - 1 && e.target.value !== "") {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      otp[index] = "";
      setOtp([...otp]);
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  return (
    <div>
      <Button variant="outline" className="mb-8">
        <ChevronLeft />
      </Button>

      <div className="space-y-3">
        <Label className="font-medium">মোবাইল নাম্বার ভেরিফাই করুন</Label>
        <p className="text-sm dark:text-slate-400">
          +8801712 122501 নাম্বারে 4 সংখ্যার কোড পাঠানো হয়েছে। কোডটি এখানে ইনপুট
          করুন।
        </p>
        <div className="flex gap-5">
          {otp.map((value, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              maxLength="1"
              type="text"
              className="aspect-video h-auto text-2xl text-center"
            />
          ))}
        </div>

        <p className="text-right">
          <button className="text-gradient">আবার কোড পাঠান</button>
        </p>

        <Button className="bg-gradient text-white">সাবমিট করুন</Button>
      </div>
    </div>
  );
}
