import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpSendSchema } from "../lib/validation";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function PhoneInput({ onNext }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(OtpSendSchema),
  });

  const handleNext = async (data) => {
    const response = await onNext(data);
    if (response?.errors.length > 0) {
      response.errors.forEach((error) => {
        setError(error.field, {
          type: "server",
          message: error.message,
        });
      });
    } else {
      clearErrors();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleNext)} className="space-y-4">
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