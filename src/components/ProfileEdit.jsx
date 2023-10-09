import { Loader2, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Label from "./Label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../lib/validation";
import { useState } from "react";

export default function ProfileEdit({ user, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
      guardian: user?.guardian,
      guardianPhone: user?.guardianPhone,
      education: user?.education,
      institute: user?.institute,
    },
  });

  const handleEditSubmit = async (data) => {
    const response = await onSubmit(data);
    if (response?.errors?.length > 0) {
      response.errors.forEach((error) => {
        setError(error.field, {
          type: "server",
          message: error.message,
        });
      });
    } else {
      setIsOpen(false);
      clearErrors();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="flex gap-2">
          <Pencil size={14} />
          আপডেট
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>প্রোফাইল আপডেট</DialogTitle>
        </DialogHeader>
        <div>
          <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                নাম
              </Label>
              <Input id="name" type="text" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                ইমেইল
              </Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="font-medium">
                বর্তমান ঠিকানা
              </Label>
              <Input id="address" type="text" {...register("address")} />
              {errors.address && (
                <p className="text-sm text-red-400">{errors.address.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardian" className="font-medium">
                অভিভাবকের নাম
              </Label>
              <Input id="guardian" type="text" {...register("guardian")} />
              {errors.guardian && (
                <p className="text-sm text-red-400">
                  {errors.guardian.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="guardianPhone"
                placeholder="01XXXXXXXXXXX"
                className="font-medium"
              >
                অভিভাবকের মোবাইল নাম্বার
              </Label>
              <Input
                id="guardianPhone"
                type="text"
                {...register("guardianPhone")}
              />
              {errors.guardianPhone && (
                <p className="text-sm text-red-400">
                  {errors.guardianPhone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="education" className="font-medium">
                সর্বশেষ শিক্ষাগত যোগ্যতা
              </Label>
              <Input id="education" type="text" {...register("education")} />
              {errors.education && (
                <p className="text-sm text-red-400">
                  {errors.education.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="institute" className="font-medium">
                প্রতিষ্ঠানের নাম
              </Label>
              <Input id="institute" type="text" {...register("institute")} />
              {errors.institute && (
                <p className="text-sm text-red-400">
                  {errors.institute.message}
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
              সংরক্ষণ
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
