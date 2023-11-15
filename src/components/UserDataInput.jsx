import { Loader2 } from "lucide-react";
import Label from "./Label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterSchema } from "../lib/validation";
import { useState } from "react";
import ToggleInputType from "./ToggleInputType";

export default function UserDataInput({ handleSubmitUserData, phone, token }) {
  const [type, setType] = useState("password");
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

  const handleType = (from, to) => {
    setType((prev) => (prev === from ? to : from));
  };

  const handleSubmitForm = async (data) => {
    (data.phone = phone), (data.token = token);

    console.log({ data });
    const response = await handleSubmitUserData(data);
    if (response?.errors?.length > 0) {
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
      <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">আপনার পুরো নাম</Label>
            <p className="text-sm dark:text-slate-400">
              সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে, তাই সঠিক নাম ব্যবহার করুন
            </p>
          </div>
          <Input id="name" type="text" {...register("name")} />
          {errors.name && (
            <p className="text-sm dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="password">পাসওয়ার্ড</Label>
            <p className="text-sm dark:text-slate-400">
              পাসওয়ার্ড কমপক্ষে আট(8) অক্ষরের হতে হবে
            </p>
          </div>
          <div className="relative">
            <Input id="password" type={type} {...register("password")} />
            <ToggleInputType
              handleType={() => handleType("password", "text")}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="confirmPassword">পুনরায় একই পাসওয়ার্ড দিন</Label>
            <p className="text-sm dark:text-slate-400">
              উপরের পাসওয়ার্ড এর সাথে মিল রেখে ইনপুট করুন
            </p>
          </div>
          <Input
            id="confirmPassword"
            type={type}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-3 p-1">
          <div>
            <Label htmlFor="refer">
              রেফারেল মোবাইল নাম্বার{" "}
              <span className="text-gradient">(যদি থাকে)</span>
            </Label>
            <p className="text-sm dark:text-slate-400">
              যে নাম্বার ব্যবহার করে রেফারেল অ্যাকাউন্ট করেছে
            </p>
          </div>
          <Input id="refer" type="text" {...register("refer")} />
          {errors.refer && (
            <p className="text-sm text-red-400">{errors.refer.message}</p>
          )}
        </div>

        <div className="py-2">
          <label
            htmlFor="terms"
            className={`flex items-center gap-3 text-[15px]`}
          >
            <Checkbox
              id="terms"
              {...register("terms")}
              onCheckedChange={(e) => handleCheckChange(e)}
            />
            আমি এই প্লাটফর্মের রিফান্ড পলিসি সহ সকল শর্ত মেনে নিচ্ছি।
            {errors.terms && (
              <span className="text-sm text-red-400">আবশ্যক</span>
            )}
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
