import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import SeminarCreate from "@/src/components/SeminarCreate";
import SeminarUpdate from "@/src/components/SeminarUpdate";
import { SeminarsTableColumns } from "@/src/components/TableColumns";
import { fetcher } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Seminars() {
  const [editSeminar, setEditSeminar] = useState(null);
  const router = useRouter();
  const { page, search } = router.query;
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search ? search : "");
  const { data, isLoading, mutate } = useSWR(
    `/api/seminars?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}&sortBy=createdAt&sortOrder=desc`,
    fetcher
  );

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">ফ্রি সেমিনারসমূহ</h1>
          <SeminarCreate mutate={mutate} />
        </div>
        <div className="p-7">
          <DataTable
            isLoading={isLoading}
            columns={SeminarsTableColumns(setEditSeminar)}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {editSeminar && (
            <SeminarUpdate
              seminar={editSeminar}
              setSeminar={setEditSeminar}
              mutate={mutate}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  return checkAdmin(context);
}
