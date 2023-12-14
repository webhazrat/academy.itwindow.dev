import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { fetcher } from "@/src/lib/utils";
import { useState } from "react";
import useSWR from "swr";
import UserUpdate from "@/src/components/UserUpdate";
import { useRouter } from "next/router";
import { UsersTableColumns } from "@/src/components/TableColumns";

export default function Users() {
  const router = useRouter();
  const { page, search } = router.query;
  const [user, setUser] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search ? search : "");
  const { data, isLoading, mutate } = useSWR(
    `/api/users?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}&sortBy=createdAt&sortOrder=desc`,
    fetcher
  );

  console.log("index");

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">ইউজারস</h1>
        </div>
        <div className="p-7">
          <DataTable
            isLoading={isLoading}
            columns={UsersTableColumns(setUser)}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            columnVisible={{ image: false }}
          />

          {user && <UserUpdate user={user} setUser={setUser} mutate={mutate} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
export async function getServerSideProps(context) {
  return checkAdmin(context);
}
