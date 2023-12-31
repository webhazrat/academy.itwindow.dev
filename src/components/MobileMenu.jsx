import { Menu } from "lucide-react";
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
import { useSession } from "next-auth/react";

export default function MobileMenu({ navLinks, courses }) {
  const { data: session } = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu size={18} />
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
                      <div className="flex flex-col gap-4 dark:text-slate-400">
                        {link.id === "courses"
                          ? courses?.length > 0 &&
                            courses.map((course) => (
                              <Link
                                key={course._id}
                                href={`/courses/${course.slug}`}
                              >
                                <a>{course.title}</a>
                              </Link>
                            ))
                          : link.sub.map((subLink) => (
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
            {!session && (
              <AccordionItem className="border-0">
                <Link href={"/login"}>
                  <a>লগইন</a>
                </Link>
              </AccordionItem>
            )}
          </Accordion>
          {!session && (
            <Link href={"/join"}>
              <Button
                className="bg-gradient text-white text-[14px] mt-4 w-full"
                size="sm"
              >
                সাইন আপ
              </Button>
            </Link>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
