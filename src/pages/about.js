import Layout from "../components/Layout";
import { NextSeo } from "next-seo";
import { APP_URL } from "../lib/utils";
import { Button } from "../components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Commission() {
  const title = "About | ITWINDOW - Enhance Yourself";
  const url = `${APP_URL}/about`;
  const description =
    "আপনার রেফারেল মোবাইল নাম্বার ব্যবহার করে কেউ যদি অ্যাকাউন্ট করে তাহলে যে রেফারেলে অ্যাকাউন্ট করবে সে যদি এই প্লাটফর্ম থেকে কোন কোর্সে ইনরোল করে কোর্স ফি প্রদান করে তাহলে পেমেন্টের 10% (কমিশন) অ্যামাউন্ট আপনার প্রোফাইলে সংযুক্ত হবে।";
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url: { url },
          title: { title },
          description: { description },
          images: [
            {
              url: ``,
              alt: `About`,
            },
          ],
        }}
      />
      <Layout border>
        <div className="container my-20">
          <div className="space-y-5">
            <div className="space-y-3">
              <h1>
                <strong>আমাদের সম্পর্কে</strong>
              </h1>
              <p className="dark:text-slate-400">
                আমরা একটি ওয়েব ডেভেলপমেন্ট ফার্ম। যার নাম আইটিউইন্ডো - একটি
                ডিজিটাল এজেন্সি । রাজশাহী জেলার গোদাগাড়ী উপজেলার মহিশালবাড়ী তে
                প্রতিষ্ঠানটি অবস্থিত। যেটা 2018 সাল থেকে আন্তজার্তিক পর্যায়ে
                ওয়েব ডিজাইন ও ডেভেলপমেন্ট সার্ভিস এবং স্কিল ডেভেলপমেন্ট কোর্স
                সরাবরাহ করে আসছে। শিক্ষার্থীদের প্রযুক্তিতে অভিজ্ঞ করে ব্যক্তিগত
                থেকে পেশাগত জীবনে কাজে লাগার লক্ষ্যে স্কিল ডেভেলপমেন্ট কোর্সগুলো
                এই ডিজিটাল প্লাটফর্মের মাধ্যমে সরাবরাহ করার জন্য প্লাটফর্ম তৈরি
                করা হয়েছে।
              </p>
            </div>
            <div className="space-y-3">
              <strong>লক্ষ্য ও উদ্দেশ্য</strong>
              <p className="dark:text-slate-400">
                আমাদের শিক্ষার্থীরা প্রযুক্তিতে দক্ষ হোক এবং তাদের ব্যক্তিগত
                উন্নতি হোক। আমরা শিক্ষার্থীদেরকে উৎসাহিত করতে চাই, তাদের জীবনে
                আরও উজ্জ্বল দিকে পাঠাতে।
              </p>
            </div>
            <div>
              <div className="flex gap-3 items-center">
                <Image
                  src="/hazrat.jpg"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <strong>হযরত আলী</strong>
                  <p className="dark:text-slate-400">
                    নির্বাহী পরিচালক, আইটিউইন্ডো - একটি ডিজিটাল এজেন্সি
                  </p>
                </div>
              </div>
            </div>
            <Link href="/join">
              <Button className="bg-gradient text-white">
                সাইন আপ / ইনরোল করুন
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
