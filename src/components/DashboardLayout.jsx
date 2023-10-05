import Head from "next/head";
import DashboardHeader from "./DashboardHeader";
import DashboardSideNav from "./DashboardSideNav";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Head>
        <title>Dashboard | ITWINDOW - Enhance Yourself</title>
      </Head>
      <main style={{ fontSize: "15px" }}>
        <DashboardHeader />
        <div className="flex">
          <DashboardSideNav />
          {children}
        </div>
      </main>
    </>
  );
}
