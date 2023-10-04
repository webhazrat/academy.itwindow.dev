import DashboardHeader from "./DashboardHeader";
import DashboardSideNav from "./DashboardSideNav";
import styles from "@/src/styles/DashboardLayout.module.css";

export default function DashboardLayout({ children }) {
  return (
    <>
      <main className={styles.font}>
        <DashboardHeader />
        <DashboardSideNav />
        {children}
      </main>
    </>
  );
}
