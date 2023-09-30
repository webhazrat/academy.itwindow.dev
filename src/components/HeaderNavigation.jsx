import Image from "next/image";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
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
import { Button } from "./ui/button";
import ThemeChanger from "./ThemeChanger";
import { useTheme } from "next-themes";

export default function HeaderNavigation() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="py-4 flex justify-between items-center dark:text-white text-[15px]">
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
      <button className="lg:hidden">
        <Menu size={20} />
      </button>
      <div className="hidden lg:flex items-center gap-[26px]">
        <NavigationMenu>
          <NavigationMenuList className="flex">
            {mainNavs.map((link) => {
              const menu = link.href ? (
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link.title}
                  </NavigationMenuLink>
                </Link>
              ) : (
                <>
                  <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="dark:bg-background">
                    <div className="grid gap-3 p-6 w-[300px]">
                      {link.sub.map((subLink) => (
                        <Link key={subLink.id} href={subLink.href}>
                          {subLink.title}
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
        <Link href={"/"}>
          <a>
            <Search size={16} />
          </a>
        </Link>
        <Link href={"/"}>
          <Button className="bg-gradient text-white text-[14px]" size="sm">
            লগইন / সাইন আপ
          </Button>
        </Link>
      </div>
    </div>
  );
}
