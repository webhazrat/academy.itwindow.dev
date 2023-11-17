import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import { PaticipantsTableColumns } from "@/src/components/TableColumns";
import { fetcher } from "@/src/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Participants() {
  const router = useRouter();
  const { page, search, seminarId } = router.query;
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search ? search : "");

  const { data, isLoading } = useSWR(
    seminarId
      ? `/api/participants/seminar?seminarId=${seminarId}&pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}&sortBy=createdAt&sortOrder=desc`
      : null,
    fetcher
  );

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">অংশগ্রহনকারী</h1>
        </div>
        <div className="p-7">
          <DataTable
            isLoading={isLoading}
            columns={PaticipantsTableColumns()}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
