import Image from "next/image";
import Layout from "../components/Layout";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import Label from "../components/Label";
import { Input } from "../components/ui/input";

export default function Cart() {
  return (
    <Layout border>
      <div className="container my-20">
        <div className="grid lg:grid-cols-[8fr_4fr] gap-5">
          <div>
            <div className="mb-4 space-y-2">
              <h1 className="text-xl font-medium">কোর্সসমূহ</h1>
              <p className="dark:text-slate-400">
                কোর্সগুলোর প্রতিটি সেশন সরাসরি আমারে ল্যাবে নেওয়া হবে, তাই কোর্স
                ফি এর 50% দিয়ে কোর্সে ইনরোল কনফার্ম করা যাবে। কোর্স ফি মোবাইল
                ব্যাংকিং (বিকাশ, নগদ, রকেট - 01632269194) এ সেন্ড মানি করে
                ট্রানজেকশন আইডি সাবমিট করলে কিছুক্ষনের মধ্যে তা ভেরিফাই করে
                ইনরোল কনফার্ম করা হবে। অথবা হান্ড ক্যাস প্রসেসেও ইনরোল করা যাবে।
              </p>
              <p className="text-gradient">
                [খুব শিঘ্রই মোবাইল ব্যাংকিং এর মাধ্যমে পেমেন্ট অটোমেশন সিস্টেম
                চালু করা হবে।]
              </p>
            </div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-4">
                    <Image src={"/courses/nextjs.svg"} height={40} width={40} />
                  </td>
                  <td className="py-4">
                    <div>
                      <h3 className="font-medium">
                        এইচএসসি আইসিটি ক্র্যাশ কোর্স
                      </h3>
                      <p className="dark:text-slate-400 text-sm">
                        এই কোর্স শেখার প্রক্রিয়াকে দ্রুত এবং দক্ষতাপূর্ণ
                      </p>
                    </div>
                  </td>
                  <td className="py-4">৳3000</td>
                  <td className="py-4">
                    <Button size="sm" variant="outline" className="p-0 w-6 h-6">
                      <X size={14} />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-4">
                    <Image src={"/courses/nextjs.svg"} height={40} width={40} />
                  </td>
                  <td className="py-4">
                    <div>
                      <h3 className="font-medium">
                        এইচএসসি আইসিটি ক্র্যাশ কোর্স
                      </h3>
                      <p className="dark:text-slate-400 text-sm">
                        এই কোর্স শেখার প্রক্রিয়াকে দ্রুত এবং দক্ষতাপূর্ণ
                      </p>
                    </div>
                  </td>
                  <td className="py-4">৳3000</td>
                  <td className="py-4">
                    <Button size="sm" variant="outline" className="p-0 w-6 h-6">
                      <X size={14} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-card p-6 px-8 rounded-md">
            <h1 className="text-xl font-medium mb-5">পেমেন্ট মেথড</h1>
            <div className="space-y-5">
              <RadioGroup className="space-y-3" defaultValue="bkash">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="bkash" id="bkash" />
                  <Label
                    htmlFor="bkash"
                    className="mb-0 leading-none cursor-pointer"
                  >
                    বিকাশ
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="nagad" id="nagad" />
                  <Label
                    htmlFor="nagad"
                    className="mb-0 leading-none cursor-pointer"
                  >
                    নগদ
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="rocket" id="rocket" />
                  <Label
                    htmlFor="rocket"
                    className="mb-0 leading-none cursor-pointer"
                  >
                    রকেট
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label
                    htmlFor="cash"
                    className="mb-0 leading-none cursor-pointer"
                  >
                    হ্যান্ড ক্যাস
                  </Label>
                </div>
              </RadioGroup>
              <div>
                <Label htmlFor="transactionId">বিকাশ ট্রানজেকশন আইডি</Label>
                <Input type="text" id="transactionId" />
              </div>

              <div className="flex items-center justify-between gap-2 font-medium">
                সর্বমোট
                <span>৳6000</span>
              </div>
              <div className="flex justify-between gap-4 items-center">
                <Label htmlFor="paid">পেইড</Label>
                <Input
                  type="text"
                  id="paid"
                  className="max-w-[100px] text-right"
                />
              </div>
              <div className="flex justify-end">
                <Button className="text-white bg-gradient w-full">
                  কনফার্ম
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
