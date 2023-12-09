import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { mainNavs } from "../constants";
import ThemeChanger from "./ThemeChanger";
import { useTheme } from "next-themes";
import MobileMenu from "./MobileMenu";
import LoggedDropdown from "./LoggedDropdown";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useCourses } from "../hook/useCourses";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HeaderNavigation() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const { courses } = useCourses();

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router.asPath]);

  const isActive = (href) => {
    return currentPath === href;
  };

  const isParentActive = (href) => {
    return currentPath.split("/")[1] === href;
  };

  return (
    <div className="py-4 flex justify-between items-center dark:text-white text-[15px]">
      <Link href={"/"}>
        <a className="h-9">
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

      <div className="flex items-center gap-4">
        <div className="flex items-center lg:hidden">
          <ThemeChanger theme={theme} setTheme={setTheme} />
          <Button size="sm" variant="ghost">
            <Link href={"/"}>
              <a>
                <Search size={16} />
              </a>
            </Link>
          </Button>
          <MobileMenu navLinks={mainNavs} courses={courses} />
        </div>
        <div className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList className="flex">
              {mainNavs.map((link) => {
                const menu = link.href ? (
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} ${
                        isActive(link.href) ? "bg-accent" : ""
                      }`}
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </Link>
                ) : (
                  <>
                    <NavigationMenuTrigger
                      className={`${
                        isParentActive("courses") ? "bg-accent" : ""
                      }`}
                    >
                      {link.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="dark:bg-background">
                      <div className="grid grid-cols-2 p-6 w-[600px]">
                        {link.id === "courses"
                          ? courses?.length > 0 &&
                            courses.map((course) => (
                              <Link
                                key={course._id}
                                href={`/courses/${course.slug}`}
                              >
                                <Button
                                  variant={`${
                                    isActive(`/courses/${course.slug}`)
                                      ? "secondary"
                                      : "ghost"
                                  }`}
                                  className="justify-start gap-2"
                                >
                                  {course.icon && (
                                    <Image
                                      src={`/courses/${course.icon}`}
                                      width={18}
                                      height={18}
                                    />
                                  )}
                                  {course.title}
                                </Button>
                              </Link>
                            ))
                          : link.sub.map((subLink) => (
                              <Link key={subLink.id} href={subLink.href}>
                                <a className="flex items-center gap-3 transition-all hover:text-gradient">
                                  <Image
                                    src={subLink.icon}
                                    width={18}
                                    height={18}
                                  />{" "}
                                  {subLink.title}
                                </a>
                              </Link>
                            ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                );
                return (
                  <NavigationMenuItem key={link.id}>{menu}</NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeChanger theme={theme} setTheme={setTheme} />
          <Button size="sm" variant="ghost">
            <span className="sr-only">Search</span>
            <Search size={16} />
          </Button>
          {!session && (
            <>
              <Link href={"/login"}>লগইন</Link>
              <Link href={"/join"}>
                <Button className="bg-gradient ml-3 text-white" size="sm">
                  সাইন আপ করুন
                </Button>
              </Link>
            </>
          )}
        </div>
        {session && <LoggedDropdown />}
      </div>
    </div>
  );
}
