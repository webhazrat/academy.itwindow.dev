import Head from "next/head";
import Banner from "../components/Banner";
import HeaderNavigation from "../components/HeaderNavigation";

export default function Home() {
  return (
    <>
      <Head>
        <title>ITWINDOW - Enhance Yourself</title>
        <meta
          name="description"
          content="You are providing our popular IT courses via this website"
        />
      </Head>
      <div className="container">
        <HeaderNavigation />
      </div>

      <div className="container">
        <Banner />
      </div>
    </>
  );
}
