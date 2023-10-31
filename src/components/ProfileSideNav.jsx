import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { profileSideNav } from "../constants";
import { isActive } from "../lib/utils";

export default function ProfileSideNav() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col gap-2 border rounded-md p-2">
        {profileSideNav.map((link) => {
          const active = isActive(router.pathname, link.href);
          return (
            <Link href={link.href} key={link.id}>
              <Button
                className={`w-full justify-start ${
                  !active ? "dark:text-slate-400" : ""
                }`}
                variant={`${active ? "secondary" : "ghost"}`}
              >
                {link.title}
              </Button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
