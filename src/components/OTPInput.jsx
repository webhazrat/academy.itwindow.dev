import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import Label from "./Label";
import { Input } from "./ui/input";
import { useRef } from "react";
import { useForm } from "react-hook-form";

export default function OTPInput({ phone, setStep, length }) {
  const inputRefs = useRef([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const handleOtpSubmit = async (data) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
    try {
      const response = await fetch("/api/sign-up/otp-verify", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        responseData.errors.forEach((error) => {
          setError(error.field, {
            type: "server",
            message: error.message,
          });
        });
        return;
      }
      setStep(3);
      setPhone(responseData.phone);
      console.log({ responseData });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return false;
    setValue(`otp${index}`, value);
    if (index < 4 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <Button variant="outline" className="mb-8" onClick={setStep(1)}>
        <ChevronLeft />
      </Button>

      <form className="space-y-3" onSubmit={handleSubmit(handleOtpSubmit)}>
        <Label className="font-medium">মোবাইল নাম্বার ভেরিফাই করুন</Label>
        <p className="text-sm dark:text-slate-400">
          {phone} নাম্বারে 4 সংখ্যার কোড পাঠানো হয়েছে। কোডটি এখানে ইনপুট করুন।
        </p>
        <div className="flex gap-5">
          {[1, 2, 3, 4].map((index) => (
            <Input
              key={index}
              id={`otp${index}`}
              {...register(`otp${index}`, {
                required: true,
              })}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
              type="text"
              className="aspect-video h-auto text-2xl text-center"
            />
          ))}
        </div>

        {(errors.otp1 || errors.otp2 || errors.otp3 || errors.otp4) && (
          <p className="text-sm text-red-400">4 ডিজিট OTP টি ইনপুট করুন।</p>
        )}

        {errors.otp && (
          <p className="text-sm text-red-400">{errors.otp.message}</p>
        )}

        <p className="text-right">
          <button className="text-gradient">আবার কোড পাঠান</button>
        </p>

        <Button className="bg-gradient text-white">সাবমিট করুন</Button>
      </form>
    </div>
  );
}
