import Head from "next/head";
import HeaderNavigation from "./HeaderNavigation";
import Footer from "./Footer";
import styles from "@/src/styles/Layout.module.css";

export default function Layout({ children, border }) {
  return (
    <>
      <Head>
        <title>ITWINDOW - Enhance Yourself</title>
        <meta
          name="description"
          content="You are providing our popular IT courses via this website"
        />
      </Head>
      <main className={styles.font}>
        <div className={`${border && "border-b"}`}>
          <div className="container">
            <HeaderNavigation />
          </div>
        </div>
        {children}
        <div className="bg-slate-50 dark:bg-[#081226]">
          <div className="container">
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
