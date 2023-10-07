import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ScrollArea } from "./ui/scroll-area";
import {
  BadgeDollarSign,
  Blocks,
  ClipboardEdit,
  FolderOpen,
  GanttChartSquare,
  GraduationCap,
  Grid2X2,
  LayoutDashboard,
  MonitorPlay,
  Shapes,
  Tv,
  UserPlus2,
  Users2,
} from "lucide-react";

export default function DashboardSideNav() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <div className="w-72 border-r">
        <div className="p-3 flex items-center h-14">
          <Link href={"/"}>
            <a className="inline-block h-8">
              <Image
                src={
                  theme === "light"
                    ? "/itwindow-logo-light.svg"
                    : "/itwindow-logo-dark.svg"
                }
                width={136}
                height={32}
                alt="itwindow-logo"
              />
            </a>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh_-_56px)] py-3 border-t">
          <div className="space-y-3">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-base font-semibold">Discover</h2>
              <div className="space-y-1">
                <Link href={"/"}>
                  <Button variant="secondary" className="w-full justify-start">
                    <LayoutDashboard size={18} className="mr-3" />
                    Dashboard
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <Grid2X2 size={18} className="mr-3" />
                    Browse
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-base font-semibold">Academy</h2>
              <div className="space-y-1">
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <GanttChartSquare size={18} className="mr-3" />
                    Courses
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <Shapes size={18} className="mr-3" />
                    Quizzes
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <ClipboardEdit size={18} className="mr-3" />
                    Assignments
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <Tv size={18} className="mr-3" />
                    Announcement
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <GraduationCap size={18} className="mr-3" />
                    Students
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-base font-semibold">Finance</h2>
              <div className="space-y-1">
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <BadgeDollarSign size={18} className="mr-3" />
                    Earnings
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <FolderOpen size={18} className="mr-3" />
                    Reports
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-base font-semibold">
                Human Resources
              </h2>
              <div className="space-y-1">
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <Users2 size={18} className="mr-3" />
                    Users
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-600 dark:text-slate-400"
                  >
                    <UserPlus2 size={18} className="mr-3" />
                    Members
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
