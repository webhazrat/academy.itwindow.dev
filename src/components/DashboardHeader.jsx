import { AlignLeft, Bell, Home } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <>
      <div className="h-14 px-4 flex items-center">
        <div className="flex justify-between items-center w-full">
          <Button variant="ghost" size="sm">
            <AlignLeft size={18} />
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Bell size={18} />
            </Button>
            <Link href={"/"}>
              <Button variant="ghost" size="sm">
                <Home size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
