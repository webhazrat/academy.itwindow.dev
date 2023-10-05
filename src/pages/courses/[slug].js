import Accordions from "@/src/components/Accordion";
import FeedbackItem from "@/src/components/FeebackItem";
import Layout from "@/src/components/Layout";
import ListItem from "@/src/components/ListItem";
import { Button } from "@/src/components/ui/button";
import {
  CheckCheck,
  FileText,
  FileVideo2,
  ScrollText,
  Users2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

const faqs = [
  {
    id: 1,
    question: "  এইচএসসি আইসিটি ক্র্যাশ কোর্স সম্পর্কে?",
    answer:
      "এইচএসসি শিক্ষার্থীদের কাছে আইসিটি বিষয়টি নতুন হওয়ায় বিষয়টিতে আলোচিত চ্যাপ্টারগুলো নিয়ে শিক্ষার্থীদের স্বচ্ছ ধারনা নাই। তাই এই কোর্সে শিক্ষার্থীদেরকে এই ফান্ডামেন্টাল বিষয়গুলো নিয়ে শক্ত ফাউন্ডেশন তৈরি লক্ষ্যে লাইভ মাল্টিমেডিয়া ক্লাসের মাধ্যমে স্বচ্ছ ধারনা দেওয়ার জন্য আমারা সর্বোচ্চ চেষ্টা করছি।",
  },
  {
    id: 2,
    question: "কোর্সটি আমার জন্য কেমন হবে। আমি কোর্সে কী কী শিখতে পারব?",
    answer:
      "সকল কোর্স সরাবরাহকারীগন বলেন যে কোর্সটি শিক্ষার্থীদের মত ডিজাইন করা হয়েছে বা কোর্স তোমার জন্য। আর আমরা 3টা ক্লাস শিক্ষার্থীদের জন্য উন্মুক্ত রাখি এবং তাকে উপলুব্ধ করতে সময় দেয় কোর্সটি তার জন্য কি? কোর্স ভিত্তিক আলোচ্য বিষয়গুলো কোর্স মডিউলে দেওয়া আছে।",
  },
  {
    id: 3,
    question: "কোর্সের সময়সূচি কি?",
    answer:
      "কোর্সের সময়সূচি আমরা আমাদের ওয়েবসাইটে প্রদান করি। ওয়েবসাইটে লগ ইন করে অথবা যোগ দিয়ে সময়সূচি দেখতে পারবে। সময়সূচি সম্পর্কে সম্পূর্ণ বিবরণ এবং ক্লাসের তারিখ এবং সময় ওয়েবসাইটি পেয়ে যাবে।",
  },
  {
    id: 4,
    question: "আমি কীভাবে কোর্সে নিবন্ধন করতে পারি?",
    answer:
      "ওয়েবসাইটি লগইন/সাইন আপের মাধ্যমে একটি প্রোফাইল তৈরি করে। সেই প্রোফাইল থেকে নির্দিষ্ট কোর্সে নিবন্ধন করতে পারবে। কোর্স গ্রহণের সকল প্রক্রিয়া ভিডিও আকারে প্রকাশ থাকবে।",
  },
];

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

                <div className="border rounded-md py-4 px-6">
                  <div className="dark:text-slate-400 flex flex-wrap gap-5">
                    <p className="flex items-center gap-2">
                      <Users2 size={20} className="text-[#43AF7B]" /> কোর্সটি
                      করেছেন 10 জন
                    </p>
                    <p className="flex items-center gap-2">
                      <ScrollText size={20} className="text-[#43AF7B]" /> প্রতি
                      সপ্তাহে 4 টি করে মোট 48 টি ক্লাস
                    </p>
                    <p className="flex items-center gap-2">
                      <FileText size={20} className="text-[#43AF7B]" /> 10 টি
                      নোট
                    </p>
                    <p className="flex items-center gap-2">
                      <FileVideo2 size={20} className="text-[#43AF7B]" /> 10 টি
                      ভিডিও
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">কোর্সে যা শিখবেন</h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  <ListItem>
                    ফান্ডামেন্টাল বিষয়গুলোর শক্ত ফাউন্ডেশন তৈরির জন্য আইসিটি,
                    কম্পিউটার, গ্লোবালাইজেশন, ই-কমার্স, টেলিমেডিশিন, ই-লার্নিং
                    নিয়ে লাইভ উদাহরণ।
                  </ListItem>
                  <ListItem>
                    কম্পিউটার নেটওয়াকিং, নেটওয়ার্ক টপোলজি, ডেটা ট্র্যান্সমিশন,
                    ওয়ারলেস ডেটা ট্র্যান্সমিশন।
                  </ListItem>
                  <ListItem>
                    ডিজিটাল নাম্বার পদ্ধতি, দুইয়ের পরিপূরক, লজিক গেইট, এনকোডিং,
                    ডিকোডিং, বুলিয়ান আলজেবরা।
                  </ListItem>
                  <ListItem>
                    এইচটিএমএল, ট্যাগ, এট্রিবিউটস, ফরম্যাটিং এলিমেন্টস, টেবিল,
                    ফর্মস।
                  </ListItem>
                  <ListItem>
                    প্রোগ্রামিং, উচ্চস্তরের ভাষা, প্রোগ্রামিং সি, অ্যালগরিদম,
                    ফ্লোচার্ট।
                  </ListItem>
                  <ListItem>
                    ডেটাবেজ, রিলেশনাল ডেটাবেজ ম্যানেজমেন্ট সিস্টেম, মাইক্রোসফট্
                    এক্সেস, ডেটা টাইপস্, ডেটা স্ট্রাকচার।
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

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">কিভাবে কোর্সটি করবেন?</h3>
                <div className="space-y-4">
                  <ListItem>
                    কোর্সটি করার জন্য আপনাকে কোর্সটিতে ইনরোল করুন বাটনে ক্লিকের
                    মাধ্যমে ইনরোলমেন্ট সম্পন্ন করতে হবে। অথবা পূর্বেই প্রোফাইল
                    তৈরি করা থাকলে প্রোফাইল লগইনের মাধ্যমে কোর্সে ইনরোল করা
                    যাবে।
                  </ListItem>
                  <ListItem>
                    কোর্সে ইনরোলমেন্ট কনফার্ম করার জন্য কমপক্ষে অগ্রীম 50%
                    পেমেন্ট দিতে হবে।
                  </ListItem>
                  <ListItem>
                    কোর্সে ইনরোল হওয়ার সময় 01632269194 (পার্সোনাল বিকাশ) এ সেন্ড
                    মানি করে ট্রানজেকশন আইডি টি সাবমিট করতে হবে। সাবমিটের
                    কিছুক্ষন পর সবকিছু ঠিক থাকলে ইনরোল সাকসেস নোটিফিকেশন এসএমএস
                    এর মাধ্যমে জানানো হবে।
                  </ListItem>
                  <ListItem>
                    এবার প্রোফাইল লগইন করলে প্রোফাইলে কোর্সের সকল তথ্যাদি দেখতে
                    পাবেন।
                  </ListItem>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">শিক্ষার্থীরা যা বলেছে</h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  <FeedbackItem />
                  <FeedbackItem />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:sticky top-6 md:max-w-[280px] flex-shrink-0">
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

              <div className="md:relative fixed bottom-0 z-50 left-0 rounded-none w-full flex md:flex-col justify-between gap-3 items-center bg-card border md:rounded-md p-4">
                <p className="text-2xl font-medium">৳3000</p>
                <Button className="bg-gradient text-white md:w-full">
                  কোর্সটিতে ইনরোল করুন
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
