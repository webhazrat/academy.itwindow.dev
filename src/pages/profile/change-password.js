import Label from "@/src/components/Label";
import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/components/ui/use-toast";
import { ChangePasswordSchema } from "@/src/lib/validation";
import { checkLogin } from "@/src/middleware/clientAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export default function PresentReport() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const handleChangePassword = async (data) => {
    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cpResponse = await response.json();
      if (response.ok) {
        reset();
        toast({
          variant: "success",
          title: cpResponse.title,
          description: cpResponse.message,
        });
      } else {
        if (cpResponse?.errors?.length > 0) {
          cpResponse.errors.forEach((error) => {
            setError(error.field, {
              type: "server",
              message: error.message,
            });
          });
        } else {
          clearErrors();
        }
      }
    } catch (error) {
      console.log({ ChangePassword: error });
    }
  };

  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">পাসওয়ার্ড পরিবর্তন</h1>
          <div className="max-w-lg">
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="space-y-4"
            >
              <div className="space-y-3">
                <div>
                  <Label htmlFor="prevPassword">পূর্বের পাসওয়ার্ড</Label>
                  <p className="text-sm dark:text-slate-400">
                    অ্যাকাউন্ট করার সময় যে পাসওয়ার্ডটি সেট করেছেন
                  </p>
                </div>
                <Input
                  type="password"
                  id="prevPassword"
                  {...register("prevPassword")}
                />
                {errors.prevPassword && (
                  <p className="text-sm text-red-400">
                    {errors.prevPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="newPassword">নতুন পাসওয়ার্ড</Label>
                  <p className="text-sm dark:text-slate-400">
                    যে নতুন পাসওয়ার্ড সেট করতে চান সেটি ইনপুট করুন
                  </p>
                </div>
                <Input
                  type="password"
                  id="newPassword"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-400">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="confirmPassword">
                    পাসওয়ার্ডটি পুনরায় দিন
                  </Label>
                  <p className="text-sm dark:text-slate-400">
                    নতুন পাসওয়ার্ড এর সাথে মিল রেখে পাসওয়ার্ড ইনপুট করুন
                  </p>
                </div>
                <Input
                  type="password"
                  id="confirmPassword"
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
                {isSubmitting && (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                )}
                পরিবর্তন
              </Button>
            </form>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
export async function getServerSideProps(context) {
  return checkLogin(context);
}
