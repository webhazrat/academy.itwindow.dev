import Layout from "./Layout";
import ProfileSideNav from "./ProfileSideNav";

export default function ProfileLayout({ children }) {
  return (
    <Layout border>
      <div className="container my-20">
        <div className="grid lg:grid-cols-[3fr_9fr] gap-5 items-start">
          <ProfileSideNav />
          {children}
        </div>
      </div>
    </Layout>
  );
}
