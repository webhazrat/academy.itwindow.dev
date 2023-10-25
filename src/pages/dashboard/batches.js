import AddEnrollInBatch from "@/src/components/AddEnrollInBatch";
import BatchCreate from "@/src/components/BatchCreate";
import BatchUpdate from "@/src/components/BatchUpdate";
import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import { BatchesTableColumns } from "@/src/components/TableColumns";
import { fetcher } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Batches() {
  const [batch, setBatch] = useState(null);
  const [student, setStudent] = useState(null);
  const router = useRouter();
  const { page, search } = router.query;
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search ? search : "");
  const { data, isLoading, mutate } = useSWR(
    `/api/batches?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}&sortBy=createdAt&sortOrder=desc`,
    fetcher
  );

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">ব্যাচসমূহ</h1>
          <BatchCreate mutate={mutate} />
        </div>
        <div className="p-7">
          <DataTable
            isLoading={isLoading}
            columns={BatchesTableColumns(setBatch, setStudent)}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {batch && (
            <BatchUpdate batch={batch} setBatch={setBatch} mutate={mutate} />
          )}
          {student && (
            <AddEnrollInBatch
              batch={student}
              setBatch={setStudent}
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
