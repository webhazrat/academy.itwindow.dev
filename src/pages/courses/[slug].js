import Accordions from "@/src/components/Accordion";
import Footer from "@/src/components/Footer";
import HeaderNavigation from "@/src/components/HeaderNavigation";
import ListItem from "@/src/components/ListItem";
import { Button } from "@/src/components/ui/button";
import { faqs } from "@/src/constants";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SingleCourse() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.query.slug} | ITWINDOW - Enhance Yourself</title>
      </Head>
      <div className="border-b">
        <div className="container">
          <HeaderNavigation />
        </div>
      </div>

      <div className="container my-20">
        <div className="flex items-start gap-8">
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold">ওয়েব ডিজাইন</h1>
              <p className="dark:text-slate-400">
                এসএসসি’র থেকে দ্বিগুনেরও বেশি অধ্যায় নিয়ে তৈরি এইচএসসি পরীক্ষার
                সিলেবাস। এইচএসসি পরীক্ষায় কাঙ্খিত ভাল ফলাফল অর্জণ করতে ১ম এবং ২য়
                পত্র দুটিতেই দরকার সমান প্রস্ততি। উভয় পত্রে নিজের দখলই প্রমাণ
                করবে তোমার একশোতে একশো প্রস্ততি। সঠিক পরিকল্পনা আর কার্যকরী
                রুটিনের সাথে চমৎকার ইন্টারেক্টিভ লাইভ ক্লাসের মাধ্যমে উভয় পত্রের
                প্রিপারেশন নিয়ে নাও টেন মিনিট স্কুলের HSC 2025 অনলাইন ব্যাচের
                সাথে। আর কার্যকরী রুটিনের সাথে চমৎকার ইন্টারেক্টিভ লাইভ ক্লাসের
                মাধ্যমে উভয় পত্রের প্রিপারেশন নিয়ে নাও টেন মিনিট স্কুলের HSC
                2025 অনলাইন ব্যাচের সাথে।
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">কোর্সে যা শিখবেন</h3>
              <div className="grid md:grid-cols-2 gap-6">
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
              <Button
                size="sm"
                variant="outline"
                className="rounded-full text-sm"
              >
                আইটিউইন্ডো প্রোফাইল
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-[#081226]">
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
}
