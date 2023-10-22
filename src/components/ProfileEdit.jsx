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
import { ScrollArea } from "./ui/scroll-area";

export default function ProfileEdit({ user, mutate, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: user,
  });

  const handleEditSubmit = async (data) => {
    const response = await onSubmit(data);
    if (!response.ok) {
      if (response?.errors?.length > 0) {
        response.errors.forEach((error) => {
          setError(error.field, {
            type: "server",
            message: error.message,
          });
        });
      }
    } else {
      mutate();
      setIsOpen(false);
      clearErrors();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil size={14} className="mr-2" />
          আপডেট
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>প্রোফাইল আপডেট</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_200px)] overflow-y-auto  mb-16">
          <div className="p-7 pt-0">
            <form
              onSubmit={handleSubmit(handleEditSubmit)}
              className="space-y-5"
            >
              <div className="fixed w-full bottom-0 px-7 left-0 dark:bg-background rounded-b-md z-40 border-t h-16 flex justify-end items-center">
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">নাম</Label>
                <Input id="name" type="text" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  ইমেইল <small>(যদি থাকে)</small>
                </Label>
                <Input id="email" type="text" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">বর্তমান ঠিকানা</Label>
                <Input id="address" type="text" {...register("address")} />
                {errors.address && (
                  <p className="text-sm text-red-400">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardian">অভিভাবকের নাম</Label>
                <Input id="guardian" type="text" {...register("guardian")} />
                {errors.guardian && (
                  <p className="text-sm text-red-400">
                    {errors.guardian.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianPhone" placeholder="01XXXXXXXXXXX">
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
                <Label htmlFor="education">সর্বশেষ শিক্ষাগত যোগ্যতা</Label>
                <Input id="education" type="text" {...register("education")} />
                {errors.education && (
                  <p className="text-sm text-red-400">
                    {errors.education.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="institute">প্রতিষ্ঠানের নাম</Label>
                <Input id="institute" type="text" {...register("institute")} />
                {errors.institute && (
                  <p className="text-sm text-red-400">
                    {errors.institute.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
