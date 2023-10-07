import Head from "next/head";
import DashboardHeader from "./DashboardHeader";
import DashboardSideNav from "./DashboardSideNav";
import styles from "@/src/styles/DashboardLayout.module.css";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Head>
        <title>Dashboard | ITWINDOW - Enhance Yourself</title>
      </Head>
      <main className={styles.font}>
        <div className="flex">
          <DashboardSideNav />
          <div className="flex-1">
            <DashboardHeader />
            <div className="border-t p-4">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
