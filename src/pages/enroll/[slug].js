import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "@/src/components/Layout";
import { Button } from "@/src/components/ui/button";
import ListItem from "@/src/components/ListItem";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import Label from "@/src/components/Label";
import { Input } from "@/src/components/ui/input";
import { APP_URL } from "@/src/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentSchema } from "@/src/lib/validation";
import { useToast } from "@/src/components/ui/use-toast";

export default function Cart({ course }) {
  const { data: session } = useSession();
  const router = useRouter();
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

  const handleEnrollConfirm = async (data) => {
    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
    } else {
      data.courseId = course.data._id;
      try {
        const response = await fetch("/api/enroll/create", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const enrollResponse = await response.json();
        if (response.ok) {
          reset();
          toast({
            variant: "success",
            title: enrollResponse.title,
            description: enrollResponse.message,
          });
        } else {
          toast({
            variant: "destructive",
            title: enrollResponse.title,
            description: enrollResponse.message,
          });
          if (enrollResponse?.errors?.length > 0) {
            enrollResponse.errors.forEach((error) => {
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
        console.log({ enrollResponse: error });
      }
    }
  };

  const paymentMethod = watch("paymentMethod");

  return (
    <Layout border>
      <div className="container my-20">
        <div className="grid lg:grid-cols-[8fr_4fr] gap-5 items-start">
          <div className="space-y-8">
            <div className="mb-4 space-y-2">
              <h1 className="text-xl font-medium mb-5">কোর্সে ইনরোল প্রোসেস</h1>
              <ListItem>
                কোর্সটির প্রতিটি সেশন সরাসরি আমারে ল্যাবে নেওয়া হবে, তাই কোর্স
                ফি এর কমপক্ষে 50% ({Number(course.data.fee) / 2} টাকা) দিয়ে
                কোর্সে ইনরোল কনফার্ম করা যাবে। তাছাড়া ইনরোল কনফার্ম হবে না।
              </ListItem>
              <ListItem>
                পেমেন্ট মেথড থেকে একটি মেথড সিলেক্ট করুন। পেমেন্ট মেথড বিকাশ,
                নগদ, রকেট হলে - এই{" "}
                <span className="dark:text-white">01632269194</span> এ সেন্ড
                মানি করে তারপর যে নাম্বার থেকে পেমেন্ট করা হচ্ছে তাতে প্রাপ্ত
                ট্রানজেকশন আইডি টি এখানে ট্রানজেকশন আইডি ইনপুট বক্সে ইনপুট করুন।
              </ListItem>
              <ListItem>
                এরপর যে অ্যামাউন্ট টি সেন্ড করা হয়েছে সেই পরিমাণ অ্যামাউন্ট,
                অ্যামাউন্ট ইনপুট বক্সে ইনপুট করুন।
              </ListItem>
              <ListItem>
                অথবা সরাসরি অফিসে ক্যাশ দিতে চাইলে হ্যান্ড ক্যাশ সিলেক্ট করে কত
                টাকা পে করতে চান সেই পরিমাণ ইনপুট করে কনফার্ম করুন। পরে অফিসে
                ক্যাশ জমা দিলে ইনরোল সম্পন্ন করা হবে।
              </ListItem>
              <p className="text-gradient">
                [খুব শীঘ্রই মোবাইল ব্যাংকিং এর মাধ্যমে পেমেন্ট অটোমেশন সিস্টেম
                চালু করা হবে।]
              </p>
            </div>

            <div>
              <h1 className="text-xl font-medium mb-6">কোর্স বিস্তারিত</h1>

              <div className="flex gap-4 items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="flex-shrink-0">
                    {course.data.image && (
                      <Image
                        src={`/courses/${course.data.image}`}
                        height={40}
                        width={40}
                      />
                    )}
                  </div>
                  <div className="max-w-sm">
                    <h3 className="font-medium mb-2">{course.data.title}</h3>
                    <p className="dark:text-slate-400 text-sm">
                      {course.data.excerpt}
                    </p>
                  </div>
                </div>
                <p>৳{course.data.fee}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-card p-6 px-8 rounded-md">
            <h1 className="text-xl font-medium mb-5">পেমেন্ট মেথড</h1>
            <form
              className="space-y-5"
              onSubmit={handleSubmit(handleEnrollConfirm)}
            >
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
              <div className="flex items-center justify-between gap-2 font-medium">
                সর্বমোট
                <span>৳{course.data.fee}</span>
              </div>

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
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const response = await fetch(`${APP_URL}/api/course/${slug}`);
  const course = await response.json();
  return {
    props: {
      course,
    },
    notFound: response.status === 200 ? false : true,
  };
};
