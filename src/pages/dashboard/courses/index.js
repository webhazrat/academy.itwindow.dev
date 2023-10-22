import CourseCreate from "@/src/components/CourseCreate";
import CourseImage from "@/src/components/CourseImage";
import CourseUpdate from "@/src/components/CourseUpdate";
import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { fetcher } from "@/src/lib/utils";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { CoursesTableColumns } from "@/src/components/TableColumns";

export default function Courses() {
  const router = useRouter();
  const { page, search } = router.query;
  const [course, setCourse] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState(search || "");
  const { data, isLoading, mutate } = useSWR(
    `/api/courses?pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&search=${globalFilter}&sortBy=createdAt&sortOrder=asc`,
    fetcher
  );

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">কোর্সসমূহ</h1>
          <CourseCreate mutate={mutate} />
        </div>
        <div className="p-7">
          <DataTable
            isLoading={isLoading}
            columns={CoursesTableColumns(setPhoto, setCourse)}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          {photo && (
            <CourseImage course={photo} setCourse={setPhoto} mutate={mutate} />
          )}
          {course && (
            <CourseUpdate
              course={course}
              setCourse={setCourse}
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
