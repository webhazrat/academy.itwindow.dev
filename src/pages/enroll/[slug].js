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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

export default function Cart({ course }) {
  const [mobileBank, setMobileBank] = useState("bkash");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data: session } = useSession();

  const handleEnrollConfirm = async (data) => {
    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
    } else {
      data._id = course.data._id;
      console.log({ data });
    }
  };

  const handleChangePayment = (value) => {
    setMobileBank(value);
  };

  return (
    <Layout border>
      <div className="container my-20">
        <div className="grid lg:grid-cols-[8fr_4fr] gap-5 items-start">
          <div className="space-y-8">
            <div className="mb-4 space-y-2">
              <h1 className="text-xl font-medium mb-5">কোর্সে ইনরোল প্রোসেস</h1>
              <ListItem>
                কোর্সগুলোর প্রতিটি সেশন সরাসরি আমারে ল্যাবে নেওয়া হবে, তাই কোর্স
                ফি এর 50% দিয়ে কোর্সে ইনরোল কনফার্ম করা যাবে।
              </ListItem>
              <ListItem>
                পেমেন্ট মেথড থেকে একটি মেথড সিলেক্ট করুন। পেমেন্ট মেথড বিকাশ,
                নগদ, রকেট হলে - এই 01632269194 এ সেন্ড মানি করে তারপর যে নাম্বার
                থেকে পেমেন্ট করা হচ্ছে তাতে প্রাপ্ত ট্রানজেকশন আইডি টি এখানে
                ট্রানজেকশন আইডি ইনপুট বক্সে ইনপুট করুন।
              </ListItem>
              <ListItem>
                এরপর যে অ্যামাউন্ট টি সেন্ড করা হয়েছে সেই পরিমাণ অ্যামাউন্ট
                ইনপুট বক্সে ইনপুট করুন।
              </ListItem>
              <ListItem>
                অথবা হ্যান্ড ক্যাস সিলেক্ট করে কনফার্ম করার মাধ্যমে কোর্সে ইনরোল
                করা যাবে। এবং সরাসরি পেমেন্ট দিয়ে ইনরোল সম্পন্ন করা যাবে।
              </ListItem>
              <p className="text-gradient">
                [খুব শিঘ্রই মোবাইল ব্যাংকিং এর মাধ্যমে পেমেন্ট অটোমেশন সিস্টেম
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
                <RadioGroup
                  className="space-y-3"
                  {...register("method")}
                  defaultValue={mobileBank}
                  onValueChange={handleChangePayment}
                >
                  <Label
                    htmlFor="bkash"
                    className="!mb-0 flex gap-2 items-center leading-none cursor-pointer"
                  >
                    <RadioGroupItem value="bkash" id="bkash" />
                    বিকাশ
                  </Label>

                  <Label
                    htmlFor="nagad"
                    className="flex gap-2 items-center leading-none cursor-pointer"
                  >
                    <RadioGroupItem value="nagad" id="nagad" />
                    নগদ
                  </Label>

                  <Label
                    htmlFor="rocket"
                    className="flex gap-2 items-center leading-none cursor-pointer"
                  >
                    <RadioGroupItem value="rocket" id="rocket" />
                    রকেট
                  </Label>

                  <Label
                    htmlFor="cash"
                    className="flex gap-2 items-center leading-none cursor-pointer"
                  >
                    <RadioGroupItem value="cash" id="cash" />
                    হ্যান্ড ক্যাস
                  </Label>
                </RadioGroup>
                {(mobileBank === "bkash" ||
                  mobileBank === "nagad" ||
                  mobileBank === "rocket") && (
                  <div className="p-2 bg-white rounded-md h-30 flex">
                    <Image
                      src={"/qr.png"}
                      width={110}
                      height={110}
                      className="rounded-md"
                    />
                  </div>
                )}
              </div>
              {(mobileBank === "bkash" ||
                mobileBank === "nagad" ||
                mobileBank === "rocket") && (
                <div>
                  <Label htmlFor="transactionId">
                    {mobileBank.toUpperCase()} ট্রানজেকশন আইডি
                  </Label>
                  <Input
                    type="text"
                    id="transactionId"
                    {...register("transactionId")}
                  />
                </div>
              )}
              <div className="flex items-center justify-between gap-2 font-medium">
                সর্বমোট
                <span>৳{course.data.fee}</span>
              </div>

              {(mobileBank === "bkash" ||
                mobileBank === "nagad" ||
                mobileBank === "rocket") && (
                <div className="flex justify-between gap-4 items-center">
                  <Label htmlFor="ammount">অ্যামাউন্ট</Label>
                  <Input
                    type="text"
                    id="ammount"
                    {...register("ammount")}
                    className="max-w-[100px] text-right"
                  />
                </div>
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
