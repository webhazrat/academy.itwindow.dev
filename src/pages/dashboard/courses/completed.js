import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import EnrollPayments from "@/src/components/EnrollPayments";
import { EnrollRequestsTableColumns } from "@/src/components/TableColumns";
import { fetcher } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function CourseCompleted() {
  const router = useRouter();
  const { page, search } = router.query;
  const [payment, setPayment] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 2,
  });
  const [globalFilter, setGlobalFilter] = useState(search ? search : "");
  const { data, isLoading, mutate } = useSWR(
    `/api/enrolls?status=Ended&pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}&sortBy=createdAt&sortOrder=desc`,
    fetcher
  );

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">কোর্স কমপ্লিটেড</h1>
        </div>
        <div className="p-7">
          <DataTable
            isLoading={isLoading}
            columns={EnrollRequestsTableColumns(setPayment)}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            columnVisible={{ userId_image: false }}
          />

          {payment && (
            <EnrollPayments
              enroll={payment}
              setEnroll={setPayment}
              enrollMutate={mutate}
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
