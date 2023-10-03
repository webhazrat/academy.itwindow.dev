import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";
import Carousel from "../components/Carousel";
import { loginSlider } from "../constants";
import { useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import Layout from "../components/Layout";

export default function Login() {
  const [phase, setPhase] = useState("first");
  return (
    <>
      <Layout border>
        <div className="container my-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="space-y-12 hidden">
                <div>
                  <h1 className="font-semibold text-2xl mb-2">লগইন</h1>
                  <p className="dark:text-slate-400">
                    আমাদের এই লার্নিং প্লাটফর্মে আপনি সংযুক্ত হয়ে আপনি আপনার
                    একাডেমিক আইসিটি বিষয়ে দক্ষতা অর্জনের সাথে সাথে দক্ষতা উন্নয়ন
                    কোর্সগুলো নিয়ে নিজের ভবিষ্যত কর্মজীবনকে আগিয়ে নিতে পারেন
                    নিজের মত করে।
                  </p>
                </div>

                <div className="space-y-3">
                  <Label className="font-medium">মোবাইল নাম্বার</Label>
                  <Input type="text" placeholder="01712 122501" />
                  <p className="text-sm dark:text-slate-400">
                    মোবাইল নাম্বার ভেরিফাই করার জন্য সঠিক মোবাইল নাম্বার ইনপুট
                    করুন।
                  </p>
                  <Button className="bg-gradient text-white">
                    সাবমিট করুন
                  </Button>
                </div>
                <div className="space-y-3 hidden">
                  <Label className="font-medium">পাসওয়ার্ড</Label>
                  <Input type="password" />
                  <p className="text-sm dark:text-slate-400">
                    পাসওয়ার্ড কমপক্ষে 6 অক্ষরসহ 1টি লেটার এবং 1টি নাম্বার হতে
                    হবে।
                  </p>
                  <p className="text-right">
                    <button className="text-gradient">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  </p>
                  <Button className="bg-gradient text-white">লগইন করুন</Button>
                </div>
              </div>

              <div className="mt-4 hidden">
                <Button variant="outline" className="mb-8">
                  <ChevronLeft />
                </Button>

                <div className="space-y-3">
                  <Label className="font-medium">
                    মোবাইল নাম্বার ভেরিফাই করুন
                  </Label>
                  <p className="text-sm dark:text-slate-400">
                    +8801712 122501 নাম্বারে 4 সংখ্যার কোড পাঠানো হয়েছে। কোডটি
                    এখানে ইনপুট করুন।
                  </p>
                  <div className="grid grid-cols-4 gap-5">
                    <Input
                      type="text"
                      className="aspect-video h-auto text-2xl text-center"
                    />
                    <Input
                      type="text"
                      className="aspect-video h-auto text-2xl text-center"
                    />
                    <Input
                      type="text"
                      className="aspect-video h-auto text-2xl text-center"
                    />
                    <Input
                      type="text"
                      className="aspect-video h-auto text-2xl text-center"
                    />
                  </div>

                  <p className="text-right">
                    <button className="text-gradient">আবার কোড পাঠান</button>
                  </p>

                  <Button className="bg-gradient text-white">
                    সাবমিট করুন
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="mb-8">
                  <ChevronLeft />
                </Button>

                <div className="space-y-3">
                  <div className="space-y-3">
                    <Label className="font-medium">আপনার পুরো নাম</Label>
                    <Input type="text" />
                    <p className="text-sm dark:text-slate-400">
                      সকল কমিউনিকেশনে এই নামটি ব্যবহৃত হবে, তাই সঠিক নাম ব্যবহার
                      করুন
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-medium">পাসওয়ার্ড</Label>
                    <Input type="text" />
                    <p className="text-sm dark:text-slate-400">
                      পাসওয়ার্ড কমপক্ষে 6 অক্ষরসহ 1টি লেটার এবং 1টি নাম্বার হতে
                      হবে
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-medium">
                      পুনরায় একই পাসওয়ার্ড দিন
                    </Label>
                    <Input type="text" />
                    <p className="text-sm dark:text-slate-400">
                      অবশ্যই উপরের পাসওয়ার্ড এর সাথে মিলতে হবে
                    </p>
                  </div>

                  <div className="py-2">
                    <label
                      htmlFor="terms"
                      className="flex items-center gap-3 dark:text-slate-400"
                    >
                      <Checkbox id="terms" /> আমি এই প্লাটফর্মের রিফান্ড পলিসি
                      সহ সকল শর্ত মেনে নিচ্ছি
                    </label>
                  </div>
                  <Button className="bg-gradient text-white">
                    সাবমিট করুন
                  </Button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Carousel items={loginSlider} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
