import Head from "next/head";
import Banner from "../components/Banner";
import HeaderNavigation from "../components/HeaderNavigation";
import CourseItem from "../components/CourseItem";
import { courses, faqs, features, whyUs } from "../constants";
import Link from "next/link";
import ListItem from "../components/ListItem";
import FeatureItem from "../components/FeatureItem";
import { Button } from "../components/ui/button";
import Image from "next/image";
import { Phone } from "lucide-react";
import Accordions from "../components/Accordion";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>ITWINDOW - Enhance Yourself</title>
        <meta
          name="description"
          content="You are providing our popular IT courses via this website"
        />
      </Head>
      <div className="container">
        <HeaderNavigation />
      </div>

      <div className="container">
        <Banner />
      </div>

      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <Link href={course.href} key={course.id}>
              <a>
                <CourseItem course={course} />
              </a>
            </Link>
          ))}
        </div>
        <p className="mt-4 dark:text-slate-400 text-[15px] text-center">
          বি.দ্র: আমাদের কোনও কোর্স আপতত রেকর্ডেড না এবং আমাদের ল্যাবে ক্লাস হয়,
          তাই কোর্সমূল্য বেশি। খুব শিঘ্রই অনলাইন রেকর্ডেড কোর্স পাবলিশ করা হবে।
        </p>
      </div>

      <div className="container my-20">
        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-0">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold">
              কেন আপনার লার্নিং শুরু হোক আমাদের সাথে?
            </h2>
            <div className="space-y-6">
              {whyUs.map((item) => (
                <ListItem key={item.id}>{item.title}</ListItem>
              ))}
            </div>
          </div>
          <div className="md:pl-10">
            <div className="grid lg:grid-cols-2 gap-5 lg:gap-10">
              {features.map((item) => (
                <FeatureItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between bg-card p-11 rounded-md border shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-semibold">
              কোর্স সম্পর্কিত যেকোন তথ্যের জন্য যোগাযোগ করুন
            </h3>
            <p className="dark:text-slate-400">
              সকাল 10টা থেকে রাত 11টা পর্যন্ত
            </p>
          </div>
          <Button className="bg-gradient text-white flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={"/whatsapp.svg"}
                  height={16}
                  width={16}
                  alt="whatsapp"
                />
                <div className="h-3 w-[2px] bg-white/[0.5]"></div>
                <Phone size={16} />
              </div>
              01712 122501
            </div>
          </Button>
        </div>
      </div>

      <div className="container my-20">
        <div>
          <h2 className="text-3xl font-semibold text-center mb-6">
            সচরাচর জিজ্ঞাসিত প্রশ্ন
          </h2>
          <div>
            <Accordions faqs={faqs} />
          </div>
        </div>
      </div>

      <div className="container mb-20">
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between bg-card p-11 rounded-md border shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-semibold">
              সঠিক সিদ্ধান্ত নিতে ফ্রি সেমিনারে অংশগ্রহন করুন
            </h3>
            <p className="dark:text-slate-400">
              আগামী 01/10/2023 ইং- রবিবার বিকাল 4.30মি. (আইসিটি ক্র্যাশ কোর্স)
              আপনিও অংশগ্রহন করতে পারেন।
            </p>
          </div>
          <Button className="bg-gradient text-white flex-shrink-0">
            ফ্রি সেমিনার
          </Button>
        </div>
      </div>

      <div className="dark:bg-[#081226]">
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
}
