import DashboardLayout from "@/src/components/DashboardLayout";
import { checkAdmin } from "@/src/lib/auth";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="">
        <h1>Dashboard</h1>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  return checkAdmin(context);
}
