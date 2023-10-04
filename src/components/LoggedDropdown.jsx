import { ChevronDown, User } from "lucide-react";
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
        <Button variant="outline">
          হযরত আলী <ChevronDown size={14} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/profile"}>
            <DropdownMenuItem>
              <User size={16} className="mr-2" /> <span>প্রোফাইল</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/profile"}>
            <DropdownMenuItem>
              <User size={16} className="mr-2" /> <span>প্রোফাইল</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/profile"}>
            <DropdownMenuItem>
              <User size={16} className="mr-2" /> <span>প্রোফাইল</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
