import { ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Label from "./Label";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export default function OTPInput({ phone, onNext, onBack }) {
  const inputRefs = useRef([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    clearErrors,
  } = useForm();

  const handleNext = async (data) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
    const response = await onNext({ otp });
    if (response?.errors.length > 0) {
      response.errors.forEach((error) => {
        setError(error.field, {
          type: "server",
          message: error.message,
        });
      });
    }
  };

  const handleChange = (e, index) => {
    clearErrors();
    const value = e.target.value;
    if (isNaN(value)) return false;
    setValue(`otp${index}`, value);
    if (index < 4 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    clearErrors();
    if (e.key === "Backspace" && !e.target.value) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <Button variant="outline" className="mb-8" onClick={onBack}>
        <ChevronLeft />
      </Button>

      <form className="space-y-3" onSubmit={handleSubmit(handleNext)}>
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
          <p className="text-sm text-red-400">4 সংখ্যার OTP টি ইনপুট করুন।</p>
        )}

        {errors.otp && (
          <p className="text-sm text-red-400">{errors.otp.message}</p>
        )}

        <div className="text-right">
          <button className="text-gradient">আবার কোড পাঠান</button>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient text-white"
        >
          {isSubmitting && <Loader2 size={16} className="mr-2 animate-spin" />}
          সাবমিট করুন
        </Button>
      </form>
    </div>
  );
}