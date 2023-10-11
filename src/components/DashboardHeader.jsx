import { AlignLeft, Bell, Home } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import ThemeChanger from "./ThemeChanger";

export default function DashboardHeader({ theme, setTheme }) {
  return (
    <>
      <div className="h-14 px-4 flex items-center">
        <div className="flex justify-between items-center w-full">
          <Button variant="ghost" size="sm">
            <AlignLeft size={18} />
          </Button>

          <div className="flex items-center">
            <ThemeChanger theme={theme} setTheme={setTheme} />
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
