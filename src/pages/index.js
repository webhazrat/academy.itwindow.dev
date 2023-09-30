import Head from "next/head";
import Banner from "../components/Banner";
import HeaderNavigation from "../components/HeaderNavigation";
import CourseItem from "../components/CourseItem";
import { courses, features, whyUs } from "../constants";
import Link from "next/link";
import ListItem from "../components/ListItem";
import FeatureItem from "../components/FeatureItem";

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
    </>
  );
}
