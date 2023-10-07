import { AlignLeft, Bell } from "lucide-react";
import { Button } from "./ui/button";
import LoggedDropdown from "./LoggedDropdown";

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
            <LoggedDropdown />
          </div>
        </div>
      </div>
    </>
  );
}
