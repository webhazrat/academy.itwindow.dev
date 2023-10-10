import { ChevronLeft, Loader2 } from "lucide-react";
import Label from "./Label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterSchema } from "../lib/validation";

export default function UserDataInput({ onSubmit, onBack, phone, otp }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    setValue,
    clearErrors,
  } = useForm({
    resolver: zodResolver(UserRegisterSchema),
  });

  const handleSubmitForm = async (data) => {
    (data.phone = phone), (data.otp = otp);
    const response = await onSubmit(data);
    console.log({ data, response });
    if (response?.errors.length > 0) {
      response.errors.forEach((error) => {
        setError(error.field, {
          type: "server",
          message: error.message,
        });
      });
    } else {
      reset();
      clearErrors();
    }
  };

  const handleCheckChange = (e) => {
    setValue("terms", e);
    if (e) {
      clearErrors();
    }
  };

  return (
    <div>
      <Button variant="outline" className="mb-8" onClick={onBack}>
        <ChevronLeft />
      </Button>

      <form className="space-y-3" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="space-y-3">
          <Label htmlFor="name" className="font-medium">
            আপনার পুরো নাম
          </Label>
          <p className="text-sm dark:text-slate-400">
            সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে, তাই সঠিক নাম ব্যবহার করুন
          </p>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-sm dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="password" className="font-medium">
            পাসওয়ার্ড
          </Label>
          <p className="text-sm dark:text-slate-400">
            পাসওয়ার্ড কমপক্ষে আট(8) অক্ষরের হতে হবে
          </p>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="confirmPassword" className="font-medium">
            পুনরায় একই পাসওয়ার্ড দিন
          </Label>
          <p className="text-sm dark:text-slate-400">
            উপরের পাসওয়ার্ড এর সাথে মিল রেখে ইনপুট করুন
          </p>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm dark:text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="py-2">
          <label
            htmlFor="terms"
            className={`flex items-center gap-3 text-[15px] ${
              errors.terms ? "text-red-400" : "dark:text-slate-400"
            } `}
          >
            <Checkbox
              id="terms"
              {...register("terms")}
              onCheckedChange={(e) => handleCheckChange(e)}
            />
            আমি এই প্লাটফর্মের রিফান্ড পলিসি সহ সকল শর্ত মেনে নিচ্ছি
          </label>
        </div>
        {errors.common && (
          <p className="text-sm dark:text-red-400">{errors.common.message}</p>
        )}

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