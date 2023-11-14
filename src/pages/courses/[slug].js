import Accordions from "@/src/components/Accordion";
import FeedbackItem from "@/src/components/FeebackItem";
import Layout from "@/src/components/Layout";
import ListItem from "@/src/components/ListItem";
import { Button } from "@/src/components/ui/button";
import { APP_URL, fetcher } from "@/src/lib/utils";
import {
  CheckCheck,
  Presentation,
  StickyNote,
  Users2,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { NextSeo } from "next-seo";

export default function SingleCourse({ courseData }) {
  const course = courseData.data;

  console.log({ course });

  const { data: feedbacks, isLoading } = useSWR(
    `/api/feedbacks/course?courseId=${course._id}`,
    fetcher
  );
  return (
    <>
      <NextSeo
        title={course.title}
        description={course.description}
        canonical={`${APP_URL}/courses/${course.slug}`}
        openGraph={{
          url: `${APP_URL}/courses/${course.slug}`,
          title: course.title,
          description: course.description,
          images: [
            {
              url: `${APP_URL}/courses/${course.image}`,
              alt: `${course.slug}`,
            },
          ],
        }}
      />
      <Layout border>
        <div className="container my-20">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold">{course.title}</h1>
                <p className="dark:text-slate-400">{course.description}</p>

                <div className="border rounded-md py-4 px-6">
                  <div className="dark:text-slate-400 flex flex-wrap gap-5">
                    <p className="flex items-center gap-2">
                      <Users2 size={18} className="text-[#43AF7B]" /> কোর্সটি
                      করেছেন 10 জন
                    </p>
                    <p className="flex items-center gap-2">
                      <Presentation size={18} className="text-[#43AF7B]" />
                      প্রতি সপ্তাহে 4 টি করে মোট 48 টি ক্লাস
                    </p>
                    <p className="flex items-center gap-2">
                      <StickyNote size={18} className="text-[#43AF7B]" /> 10 টি
                      নোট
                    </p>
                    <p className="flex items-center gap-2">
                      <Video size={18} className="text-[#43AF7B]" /> 10 টি ভিডিও
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">কোর্সে যা শিখবেন</h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  {course.topics.length &&
                    course.topics.map((topic, index) => (
                      <ListItem key={index}>{topic.value}</ListItem>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  কোর্স সম্পর্কে বিস্তারিত
                </h3>
                <Accordions faqs={course.details} />
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    কোর্সটির জন্য যা যা প্রয়োজন
                  </h3>
                  <div className="space-y-4">
                    {course.requirements.length &&
                      course.requirements.map((requirement, index) => (
                        <div
                          key={index}
                          className="dark:text-slate-400 flex items-center gap-3"
                        >
                          <CheckCheck size={20} className="text-[#22B995]" />
                          {requirement.value}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    কোর্সটির করতে যা জানতে হবে
                  </h3>
                  <div className="space-y-4">
                    {course.knows.length &&
                      course.knows.map((know, index) => (
                        <div
                          key={index}
                          className="dark:text-slate-400 flex items-center gap-3"
                        >
                          <CheckCheck size={20} className="text-[#22B995]" />
                          {know.value}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">কিভাবে কোর্সটি করবেন?</h3>
                <div className="space-y-4">
                  {course.hows.length &&
                    course.hows.map((how, index) => (
                      <ListItem key={index}>{how.value}</ListItem>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">
                  {feedbacks?.data.length > 0 && "শিক্ষার্থীরা যা বলেছে"}
                </h3>
                <div className="grid lg:grid-cols-2 gap-4">
                  {feedbacks?.data.length > 0 &&
                    feedbacks.data.map((feedback) => (
                      <FeedbackItem key={feedback._id} feedback={feedback} />
                    ))}
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
                <p className="text-2xl font-medium flex items-center gap-2">
                  ৳{course.fee}{" "}
                  {course.prevFee > course.fee && (
                    <del className="dark:text-slate-400 text-lg">
                      ৳{course.prevFee}
                    </del>
                  )}
                </p>
                <Link href={`/enroll/${course.slug}`}>
                  <Button className="bg-gradient text-white md:w-full">
                    কোর্সটিতে ইনরোল করুন
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const response = await fetch(`${APP_URL}/api/course/${slug}`);
  const courseData = await response.json();
  return {
    props: {
      courseData,
    },
    notFound: response.status === 200 ? false : true,
  };
};
