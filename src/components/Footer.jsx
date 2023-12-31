import { Mail, MapPin, Phone } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { isActive } from "../lib/utils";
import { quickLinks } from "../constants";

export default function Footer() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <div>
      <div className="grid md:grid-cols-[5fr_3fr_4fr] gap-12 py-12">
        <div className="lg:pr-14">
          <Link href={"/"}>
            <a>
              <Image
                src={
                  theme === "light"
                    ? "/itwindow-logo-light.svg"
                    : "/itwindow-logo-dark.svg"
                }
                width={136}
                height={36}
                alt="itwindow-logo"
              />
            </a>
          </Link>
          <p className="dark:text-slate-400 mt-3">
            আমাদের স্কিল ডেভেলপমেন্ট কোর্সগুলি আপনাকে প্রয়োজনীয় স্কিল এবং
            জ্ঞান সরবরাহ করে, যা আপনার সাক্ষরতা বা ক্যারিয়ার এবং উচ্চতর শিক্ষা
            আপনার লক্ষ্যে সাহায্য করতে সম্মুখীন করতে সাহায্য করতে পারে।
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-6">কুইক লিংক</h3>
          <div className="dark:text-slate-400 flex flex-col gap-3">
            {quickLinks.length > 0 &&
              quickLinks.map((link) => (
                <Link key={link.id} href={link.href}>
                  <a
                    className={`${
                      isActive(router.asPath, link.href) && "text-gradient"
                    }`}
                  >
                    {link.title}
                  </a>
                </Link>
              ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-6">যোগাযাগ</h3>
          <div className="dark:text-slate-400 flex flex-col gap-3 mb-5">
            <a href="#" className="flex items-center gap-3">
              <Phone size={16} className="flex-shrink-0" /> +8801712 122501
            </a>
            <a href="#" className="flex items-center gap-3">
              <Mail size={16} className="flex-shrink-0" /> support@itwindow.dev
            </a>
            <a href="#" className="flex items-center gap-3">
              <MapPin size={16} className="flex-shrink-0" /> মহিশালবাড়ী গোরস্থান
              মেইন গেটের বিপরীতে, রেলবাজার রোড, গোদাগাড়ী, রাজশাহী - 6290
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a target="_blank" href="https://www.facebook.com/itwindow.dev">
              <Image
                src={"/socials/facebook.svg"}
                width={16}
                height={16}
                alt="facebook"
              />
            </a>
            <a target="_blank" href="https://twitter.com/webhazrat">
              <Image
                src={"/socials/twitter.svg"}
                width={16}
                height={16}
                alt="twitter"
              />
            </a>
            <a target="_blank" href="https://www.instagram.com/itwindow.dev/">
              <Image
                src={"/socials/instagram.svg"}
                width={16}
                height={16}
                alt="twitter"
              />
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/itwindow">
              <Image
                src={"/socials/linkedin.svg"}
                width={16}
                height={16}
                alt="twitter"
              />
            </a>
            <a target="_blank" href="https://www.youtube.com/@y.itwindow">
              <Image
                src={"/socials/youtube.svg"}
                width={16}
                height={16}
                alt="twitter"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="dark:text-slate-400 border-t py-8 text-center">
        কপিরাইট ©2023 আইটিউইন্ডো সর্বস্বত্ব সংরক্ষিত।
      </div>
    </div>
  );
}
