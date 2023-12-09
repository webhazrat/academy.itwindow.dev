import Banner from "../components/Banner";
import CourseItem from "../components/CourseItem";
import { faqs, features, whyUs } from "../constants";
import Link from "next/link";
import ListItem from "../components/ListItem";
import FeatureItem from "../components/FeatureItem";
import { Button } from "../components/ui/button";
import Image from "next/image";
import { Phone } from "lucide-react";
import Accordions from "../components/Accordion";
import Layout from "../components/Layout";
import FeedbackItem from "../components/FeebackItem";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
import { Skeleton } from "../components/ui/skeleton";
import { useCourses } from "../hook/useCourses";

export default function Home() {
  const { courses, isLoading } = useCourses();

  const { data: feedbacksData } = useSWR(
    `/api/feedbacks?status=Approved&pageSize=3&sortBy=createdAt&sortOrder=asc`,
    fetcher
  );
  const feedbacks = feedbacksData?.data;

  const { data: seminarsData } = useSWR(
    `/api/seminars?status=Published&pageSize=3&sortBy=createdAt&sortOrder=asc`,
    fetcher
  );

  const seminars = seminarsData?.data;

  return (
    <>
      <Layout>
        <div className="container">
          <Banner />
        </div>

        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading &&
              [1, 2, 3, 4, 5, 6, 7].map((index) => (
                <div key={index} className="p-7 space-y-3 bg-card rounded-md">
                  <Skeleton className="h-12 w-12" />
                  <Skeleton className="h-8" />
                  <Skeleton className="h-24" />
                  <div className="flex gap-10">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              ))}
            {courses?.length > 0 &&
              courses.map((course) => (
                <Link href={`/courses/${course.slug}`} key={course._id}>
                  <a>
                    <CourseItem course={course} />
                  </a>
                </Link>
              ))}
          </div>
          <p className="mt-4 dark:text-slate-400 text-[15px] text-center">
            বি.দ্র: আমাদের কোনও কোর্স আপতত রেকর্ডেড না এবং আমাদের ল্যাবে ক্লাস
            হয়, তাই কোর্সমূল্য বেশি। খুব শিঘ্রই অনলাইন রেকর্ডেড কোর্স পাবলিশ করা
            হবে।
          </p>
        </div>

        <div id="why-our-course" className="container my-20 scroll-mt-10">
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
            <a href="tel:+8801712122501">
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
            </a>
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
        {seminars?.length > 0 && (
          <div className="container mb-20">
            <div className="flex flex-col md:flex-row items-center gap-5 justify-between bg-card p-11 rounded-md border shadow-sm">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-semibold">
                  {seminars?.[0]?.title}
                </h3>
                <p className="dark:text-slate-400">
                  {seminars?.[0]?.shortDescription}
                </p>
              </div>
              <Link href={"/free-seminar"}>
                <Button className="bg-gradient text-white flex-shrink-0">
                  ফ্রি সেমিনার
                </Button>
              </Link>
            </div>
          </div>
        )}

        {feedbacks?.length > 0 && (
          <div id="student-feedback" className="container mb-20 scroll-mt-10">
            <div>
              <h2 className="text-3xl font-semibold text-center mb-6">
                শিক্ষার্থীদের অভিমত
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {feedbacks.map((feedback) => (
                  <FeedbackItem key={feedback._id} feedback={feedback} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
