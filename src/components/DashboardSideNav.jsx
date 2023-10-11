import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/router";
import { dashboardSideNav } from "../constants";
import { isActive } from "../lib/utils";
import DynamicIcon from "./DynamicIcon";

export default function DashboardSideNav({ theme }) {
  const router = useRouter();
  return (
    <>
      <div className="w-72 flex-shrink-0 border-r">
        <div className="p-3 flex items-center h-14">
          <Link href={"/"}>
            <a className="inline-block h-8">
              <Image
                src={
                  theme === "light"
                    ? "/itwindow-logo-light.svg"
                    : "/itwindow-logo-dark.svg"
                }
                width={136}
                height={32}
                alt="itwindow-logo"
              />
            </a>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh_-_56px)] py-3 border-t">
          <div className="space-y-3">
            {dashboardSideNav.map((nav) => (
              <div className="px-3 py-2" key={nav.id}>
                <h2 className="mb-2 px-4 text-base font-semibold">
                  {nav.title}
                </h2>
                <div className="space-y-1">
                  {nav.navs.map((link) => {
                    const active = isActive(router.pathname, link.href);
                    return (
                      <Link href={link.href} key={link.id}>
                        <Button
                          variant={active ? "secondary" : "ghost"}
                          className={`w-full justify-start ${
                            !active && "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <DynamicIcon
                            iconName={link.icon}
                            size={18}
                            className="mr-3"
                          />
                          {link.title}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
