import Head from "next/head";
import HeaderNavigation from "./HeaderNavigation";
import Footer from "./Footer";

export default function Layout({ children, border }) {
  return (
    <>
      <main>
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
