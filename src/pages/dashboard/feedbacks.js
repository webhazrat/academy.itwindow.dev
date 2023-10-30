import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import FeedbackUpdate from "@/src/components/FeedbackUpdate";
import { FeedbacksTableColumns } from "@/src/components/TableColumns";
import { fetcher } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Feedbacks() {
  const router = useRouter();
  const { page, search } = router.query;
  const [feedback, setFeedback] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");
  const { data, isLoading, mutate } = useSWR(
    `/api/feedbacks?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}&sortBy=createdAt&sortOrder=asc`,
    fetcher
  );
  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">ফিডব্যাক</h1>
        </div>
        <div className="p-7">
          <DataTable
            isLoading={isLoading}
            columns={FeedbacksTableColumns(setFeedback)}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />

          {feedback && (
            <FeedbackUpdate
              feedback={feedback}
              setFeedback={setFeedback}
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
