import Carousel from "../components/Carousel";
import { loginSlider } from "../constants";
import Layout from "../components/Layout";
import Label from "../components/Label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Login() {
  return (
    <>
      <Layout border>
        <div className="container my-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="space-y-10">
                <div>
                  <h1 className="font-semibold text-2xl mb-2">লগইন</h1>
                  <p className="dark:text-slate-400">
                    আমাদের এই লার্নিং প্লাটফর্মে আপনি সংযুক্ত হয়ে আপনি আপনার
                    একাডেমিক আইসিটি বিষয়ে দক্ষতা অর্জনের সাথে সাথে দক্ষতা উন্নয়ন
                    কোর্সগুলো নিয়ে নিজের ভবিষ্যত কর্মজীবনকে আগিয়ে নিতে পারেন
                    নিজের মত করে।
                  </p>
                </div>
                <form action="" className="space-y-4">
                  <div className="space-y-3">
                    <Label className="font-medium">মোবাইল নাম্বার</Label>
                    <Input type="text" placeholder="01712 122501" />
                    <p className="text-sm dark:text-slate-400">
                      মোবাইল নাম্বার ভেরিফাই করার জন্য সঠিক মোবাইল নাম্বার ইনপুট
                      করুন।
                    </p>
                  </div>

                  <div className="space-y-3">
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
                  </div>

                  <Button type="button" className="bg-gradient text-white">
                    লগইন করুন
                  </Button>
                </form>
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
