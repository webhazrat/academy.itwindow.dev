import Head from "next/head";
import DashboardHeader from "./DashboardHeader";
import DashboardSideNav from "./DashboardSideNav";
import { useTheme } from "next-themes";
import { ScrollArea } from "./ui/scroll-area";

export default function DashboardLayout({ children }) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Head>
        <title>Dashboard | ITWINDOW - Enhance Yourself</title>
      </Head>
      <main>
        <div className="flex">
          <DashboardSideNav theme={theme} />
          <div className="flex-1">
            <DashboardHeader theme={theme} setTheme={setTheme} />
            <ScrollArea className="h-[calc(100vh_-_56px)] border-t">
              <div>{children}</div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </>
  );
}
