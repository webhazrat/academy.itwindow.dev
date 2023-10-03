import Accordions from "@/src/components/Accordion";
import Layout from "@/src/components/Layout";
import ListItem from "@/src/components/ListItem";
import { Button } from "@/src/components/ui/button";
import { faqs } from "@/src/constants";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SingleCourse() {
  const router = useRouter();
  return (
    <>
      <Layout border>
        <div className="container my-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold">
                  এইচএসসি আইসিটি ক্র্যাশ কোর্স
                </h1>
                <p className="dark:text-slate-400">
                  এই কোর্স শেখার প্রক্রিয়াকে দ্রুত এবং দক্ষতাপূর্ণ উপায়ে
                  প্রস্তুত করেছি যাতে আপনি আপনার ক্যারিয়ার বা ব্যক্তিগত জীবনে
                  কাজে লাগাতে পারেন। প্রতিটি শিক্ষার্থীর অগ্রগতি মূল্যায়ন করার
                  মাধ্যমে তার শেখার অগ্রগতি উন্নত করা জন্য বিশেষভাবে যত্ন নেওয়া
                  হয়। আইসিটি শিক্ষার বিস্তারে এবং এই বিষয়ে শক্ত ফাউন্ডেশন তৈরির
                  করার লক্ষ্যে এই এইচএসসি আইসিটি ক্র্যাশ কোর্সটি উচ্চমানের
                  শিক্ষকের দ্বারা প্রশিক্ষণ দেই। যাদের বিশেষজ্ঞতা এবং অভিজ্ঞতা
                  এই শাখার উন্নতির গুরুত্বপূর্ণ ভূমিকা রাখবে। প্র্যাকটিকাল
                  প্রশিক্ষণের মাধ্যমে দক্ষতা অর্জনের জন্য মাল্টিমেডিয়া সেশনের
                  ব্যবস্খা করা হয়েছে।
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">কোর্সে যা শিখবেন</h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  <ListItem>
                    আমরা আপনার শেখার যাত্রায় একটি প্রতিশ্রুতিমূলক সহায়ক। হাতে
                    কলমে শেখানোর সাথে সাথে ছোট ছোট সমস্যাগুলোকে গুরত্বসহকারে
                    সমাধানের জন্য সার্বক্ষনিক সাপোর্ট।
                  </ListItem>
                  <ListItem>
                    আমরা আপনার শেখার যাত্রায় একটি প্রতিশ্রুতিমূলক সহায়ক। হাতে
                    কলমে শেখানোর সাথে সাথে ছোট ছোট সমস্যাগুলোকে গুরত্বসহকারে
                    সমাধানের জন্য সার্বক্ষনিক সাপোর্ট।
                  </ListItem>
                  <ListItem>
                    আমরা আপনার শেখার যাত্রায় একটি প্রতিশ্রুতিমূলক সহায়ক। হাতে
                    কলমে শেখানোর সাথে সাথে ছোট ছোট সমস্যাগুলোকে গুরত্বসহকারে
                    সমাধানের জন্য সার্বক্ষনিক সাপোর্ট।
                  </ListItem>
                  <ListItem>
                    আমরা আপনার শেখার যাত্রায় একটি প্রতিশ্রুতিমূলক সহায়ক। হাতে
                    কলমে শেখানোর সাথে সাথে ছোট ছোট সমস্যাগুলোকে গুরত্বসহকারে
                    সমাধানের জন্য সার্বক্ষনিক সাপোর্ট।
                  </ListItem>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  কোর্স সম্পর্কে বিস্তারিত
                </h3>
                <Accordions faqs={faqs} />
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    কোর্সটির জন্য যা যা প্রয়োজন
                  </h3>
                  <div className="space-y-4">
                    <div className="dark:text-slate-400 flex items-center gap-3">
                      <CheckCheck size={20} className="text-[#22B995]" />
                      একনিষ্ঠ ধৈর্য্য, শেখার প্রবল ইচ্ছে
                    </div>
                    <div className="dark:text-slate-400 flex items-center gap-3">
                      <CheckCheck size={20} className="text-[#22B995]" />
                      ইন্টারনেট কানেকশন
                    </div>
                    <div className="dark:text-slate-400 flex items-center gap-3">
                      <CheckCheck size={20} className="text-[#22B995]" />
                      ডেস্কটপ অথবা ল্যাপটপ
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    কোর্সটির করতে যা জানতে হবে
                  </h3>
                  <div className="space-y-4">
                    <div className="dark:text-slate-400 flex items-center gap-3">
                      <CheckCheck size={20} className="text-[#22B995]" />
                      বেসিক কম্পিউটিং
                    </div>
                    <div className="dark:text-slate-400 flex items-center gap-3">
                      <CheckCheck size={20} className="text-[#22B995]" />
                      ইন্টারনেট ব্রাউজিং
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sticky top-6 max-w-[280px] flex-shrink-0">
              <h3 className="text-xl font-semibold">কোর্স ইন্সট্রাক্টর</h3>
              <div className="bg-card border p-6 shadow-sm rounded-md text-center space-y-2 dark:text-slate-400">
                <Image
                  src={"/hazrat.jpg"}
                  width={120}
                  height={120}
                  alt="Md Hazrat Ali"
                  className="rounded-full"
                />
                <h3 className="dark:text-white text-xl font-semibold">
                  হযরত আলী
                </h3>
                <p>
                  ফাউন্ডার অ্যান্ড ডিরেক্টর, আইটিউইন্ডো -{" "}
                  <small>একটি ডিজিটাল এজেন্সি</small>
                </p>
                <p>ওয়েব ডেভেলপার, এনসিসি, ইউএসএ</p>
                <div className="flex items-center justify-center gap-4 p-3">
                  <a href="https://www.facebook.com/webhazrat" target="_blank">
                    <Image
                      src={"/socials/facebook-f.svg"}
                      width={16}
                      height={16}
                      alt="facebook"
                    />
                  </a>
                  <a href="#">
                    <Image
                      src={"/socials/twitter.svg"}
                      width={16}
                      height={16}
                      alt="twitter"
                    />
                  </a>
                  <a href="#">
                    <Image
                      src={"/socials/instagram.svg"}
                      width={16}
                      height={16}
                      alt="twitter"
                    />
                  </a>
                  <a href="#">
                    <Image
                      src={"/socials/linkedin-in.svg"}
                      width={16}
                      height={16}
                      alt="twitter"
                    />
                  </a>
                  <a href="#">
                    <Image
                      src={"/socials/youtube.svg"}
                      width={16}
                      height={16}
                      alt="twitter"
                    />
                  </a>
                </div>

                <a href={"https://itwindow.dev/u/webhazrat"} target="_blank">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full text-sm"
                  >
                    আইটিউইন্ডো প্রোফাইল
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
