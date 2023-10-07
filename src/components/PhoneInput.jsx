import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSendSchema } from "../lib/validation";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function PhoneInput({ setStep, setPhone }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(OtpSendSchema),
  });

  const onPhoneSubmit = async (data) => {
    try {
      const response = await fetch("/api/sign-up/otp-send", {
        method: "POST",
        body: JSON.stringify(data),
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
      setStep(2);
      setPhone(responseData.phone);
      console.log({ responseData });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onPhoneSubmit)} className="space-y-4">
      <div className="space-y-3">
        <Label className="font-medium" htmlFor="phone">
          মোবাইল নাম্বার
        </Label>
        <p className="text-sm dark:text-slate-400">
          মোবাইল নাম্বার ভেরিফাই করার জন্য সঠিক মোবাইল নাম্বার ইনপুট করুন।
        </p>
        <Input
          id="phone"
          type="text"
          {...register("phone")}
          placeholder="01XXXXXXXXX"
        />
        {errors.phone && (
          <p className="text-sm dark:text-red-400">{errors.phone.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-gradient text-white"
      >
        {isSubmitting && <Loader2 size={16} className="mr-2 animate-spin" />}
        এগিয়ে যান
      </Button>
    </form>
  );
}
