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
import MobileMenu from "./MobileMenu";

export default function HeaderNavigation() {
  const { theme, setTheme } = useTheme();
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

      <MobileMenu navLinks={mainNavs} theme={theme} setTheme={setTheme} />

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
                    <div className="grid grid-cols-2 gap-4 p-10 w-[600px]">
                      {link.sub.map((subLink) => (
                        <Link key={subLink.id} href={subLink.href}>
                          <a className="flex items-center gap-3 transition-all hover:text-gradient">
                            <Image src={subLink.icon} width={18} height={18} />{" "}
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
        <Link href={"/"}>
          <a>
            <Search size={16} />
          </a>
        </Link>
        <Link href={"/login"}>
          <Button className="bg-gradient text-white text-[14px]" size="sm">
            লগইন / সাইন আপ
          </Button>
        </Link>
      </div>
    </div>
  );
}
