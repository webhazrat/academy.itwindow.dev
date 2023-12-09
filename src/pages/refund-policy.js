import Layout from "../components/Layout";
import { NextSeo } from "next-seo";
import { APP_URL } from "../lib/utils";
export default function RefundPolicy() {
  const title = "Refund Policy | ITWINDOW - Enhance Yourself";
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
              alt: `ITWNDOW Refund Policy`,
            },
          ],
        }}
      />
      <Layout border>
        <div className="container my-20">
          <div className="space-y-5">
            <div className="space-y-3">
              <h1>
                <strong>রিফান্ড পলিসি</strong>
              </h1>
              <p className="dark:text-slate-400">কন্টেন্ট</p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
