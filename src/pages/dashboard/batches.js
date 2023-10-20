import BatchCreate from "@/src/components/BatchCreate";
import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { fetcher, formatDateTime } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Batches() {
  const router = useRouter();
  const { page } = router.query;
  const [pagination, setPagination] = useState({
    pageIndex: page ? page - 1 : 0,
    pageSize: 2,
  });
  const { data, isLoading, mutate } = useSWR(
    `/api/batches??pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}&sortBy=createdAt&sortOrder=desc`,
    fetcher
  );
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "courseId.title",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "batchCode",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Batch Code <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "classDays",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Class Days <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Time <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
      cell: ({ row }) => {
        return formatDateTime(row.getValue("time"), "hh:mm a");
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CreatedAt <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
      cell: ({ row }) => {
        return formatDateTime(row.getValue("createdAt"), "MMMM do, yyyy");
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const batch = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 ring-0 focus-visible:ring-transparent"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
              // onClick={() => {
              //   setPhoto(course);
              // }}
              >
                স্টুডেন্টস
              </DropdownMenuItem>
              <DropdownMenuItem
              // onClick={() => {
              //   setCourse(course);
              // }}
              >
                ইডিট
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 hover:!text-red-500">
                ডিলিট
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">ব্যাচসমূহ</h1>
          <BatchCreate />
        </div>
        <div className="p-7">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <DataTable
              columns={columns}
              data={data}
              pagination={pagination}
              setPagination={setPagination}
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
