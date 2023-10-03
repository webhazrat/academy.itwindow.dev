import { Menu, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ThemeChanger from "./ThemeChanger";

export default function MobileMenu({ navLinks, theme, setTheme }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="ghost" className="lg:hidden">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 p-0">
        <ScrollArea className="flex flex-col gap-1 items-center mt-12 h-[calc(100vh_-_52px)] p-4 border-t">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <AccordionItem
                key={link.id}
                value={`item${link.id}`}
                className="border-0"
              >
                {link.href && (
                  <Link href={link.href}>
                    <a>{link.title}</a>
                  </Link>
                )}

                {!link.href && (
                  <>
                    <AccordionTrigger className="p-0">
                      {link.title}
                    </AccordionTrigger>
                    <AccordionContent className="border-t pt-3 mt-3">
                      <div className="flex flex-col gap-4">
                        {link.sub.map((subLink) => (
                          <Link key={subLink.id} href={subLink.href}>
                            <a>{subLink.title}</a>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </>
                )}
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex gap-5 py-5">
            <ThemeChanger theme={theme} setTheme={setTheme} />
            <Link href={"/"}>
              <a>
                <Search size={16} />
              </a>
            </Link>
          </div>
          <Link href={"/login"}>
            <Button className="bg-gradient text-white text-[14px]" size="sm">
              লগইন / সাইন আপ
            </Button>
          </Link>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
