import {
  Blocks,
  ChevronDown,
  Key,
  LogOut,
  Send,
  User,
  User2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function LoggedDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <User2 size={14} /> <span className="hidden sm:block">হযরত আলী</span>{" "}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="dark:text-slate-400">
          <Link href={"/profile"}>
            <DropdownMenuItem>
              <User size={16} className="mr-2" /> <span>প্রোফাইল</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/profile/my-courses"}>
            <DropdownMenuItem>
              <Blocks size={16} className="mr-2" /> <span>আমার কোর্সসমূহ</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/profile/change-password"}>
            <DropdownMenuItem>
              <Key size={16} className="mr-2" /> <span>পাসওয়ার্ড পরিবর্তন</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/profile/referral-enroll"}>
            <DropdownMenuItem>
              <Send size={16} className="mr-2" /> <span>রেফারেল লিংক</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut size={16} className="mr-2" /> <span>সাইন আউট</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
