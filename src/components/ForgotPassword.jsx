import { Loader2 } from "lucide-react";
import Label from "./Label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "../lib/validation";
import { useState } from "react";
import ToggleInputType from "./ToggleInputType";

export default function ForgotPassword({ handleSubmitUserData, phone, token }) {
  const [type, setType] = useState("password");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleType = (from, to) => {
    setType((prev) => (prev === from ? to : from));
  };

  const handleSubmitForm = async (data) => {
    (data.phone = phone), (data.token = token);
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

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
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
