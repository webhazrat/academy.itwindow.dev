import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Label from "./Label";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentSchema } from "../lib/validation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export default function MyPay({ enrollId, totalDue, totalPending, mutate }) {
  const [isOpen, setIsOpen] = useState(null);
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      paymentMethod: "Bkash",
      transactionId: "",
      amount: "",
    },
  });

  const handleMyPay = async (data) => {
    data.enrollId = enrollId;
    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payResponse = await response.json();
      if (response.ok) {
        mutate();
        reset();
        setIsOpen(null);
        toast({
          variant: "success",
          title: payResponse.title,
          description: payResponse.message,
        });
      } else {
        if (payResponse?.errors?.length > 0) {
          payResponse.errors.forEach((error) => {
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
      console.log({ payResponse: error });
    }
  };
  const paymentMethod = watch("paymentMethod");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">পে করুন</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>পে করুন</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
          <div className="p-7 pt-0 space-y-5">
            <div className="border-b pb-2 space-y-3">
              <p className="dark:text-slate-400">
                বিকাশ, নগদ, রকেট হলে - এই{" "}
                <span className="dark:text-white">01632269194</span> এ সেন্ড
                মানি করার পর প্রাপ্ত ট্রানজেকশন আইডি টি ও অ্যামাউন্ট ইনপুট করুন।
                হ্যান্ড ক্যাশ হলে অ্যামাউন্ট ইনপুট করুন। পরবর্তী এক ঘন্টার মধ্যে
                রিভিউ করা হবে।
              </p>
              <p className="pt-3 flex items-center justify-between">
                <span>মোট বকেয়া - ৳{totalDue}</span>
                {totalPending > 0 && <span>মোট পেন্ডিং - ৳{totalPending}</span>}
              </p>
              <p className="dark:text-slate-400 text-sm">
                [নোট: আপনি এখন সর্বোচ্চ ৳{totalDue - totalPending} এর পেমেন্ট
                রিকুয়েস্ট সংযুক্ত করতে পারবেন।]
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit(handleMyPay)}>
              <div className="flex items-start justify-between">
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="space-y-3"
                    >
                      <Label
                        htmlFor="bkash"
                        className="!mb-0 flex gap-2 items-center leading-none cursor-pointer"
                      >
                        <RadioGroupItem value="Bkash" id="bkash" />
                        বিকাশ
                      </Label>
                      <Label
                        htmlFor="nagad"
                        className="flex gap-2 items-center leading-none cursor-pointer"
                      >
                        <RadioGroupItem value="Nagad" id="nagad" />
                        নগদ
                      </Label>

                      <Label
                        htmlFor="rocket"
                        className="flex gap-2 items-center leading-none cursor-pointer"
                      >
                        <RadioGroupItem value="Rocket" id="rocket" />
                        রকেট
                      </Label>

                      <Label
                        htmlFor="cash"
                        className="flex gap-2 items-center leading-none cursor-pointer"
                      >
                        <RadioGroupItem value="Cash" id="cash" />
                        হ্যান্ড ক্যাশ
                      </Label>
                    </RadioGroup>
                  )}
                />
              </div>
              {paymentMethod !== "Cash" && (
                <Controller
                  name="transactionId"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label htmlFor="transactionId">
                        {paymentMethod.toUpperCase()} ট্রানজেকশন আইডি
                      </Label>
                      <Input id="transactionId" type="text" {...field} />
                      {errors.transactionId && (
                        <p className="text-sm text-red-400">
                          {errors.transactionId.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              )}

              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <div className="flex justify-between gap-4 items-center">
                      <Label htmlFor="amount">অ্যামাউন্ট</Label>
                      <Input
                        id="amount"
                        type="text"
                        {...field}
                        className="max-w-[100px] text-right"
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-sm text-red-400">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                )}
              />
              {errors.common && (
                <p className="text-sm text-red-400">{errors.common.message}</p>
              )}
              <div className="flex justify-end">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="text-white bg-gradient w-full"
                >
                  {isSubmitting && (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  )}
                  কনফার্ম করুন
                </Button>
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
