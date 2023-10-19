import AccountPayment from "@/src/components/AccountPayments";
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
import { fetcher } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

export default function EnrollRequests() {
  const [payment, setPayment] = useState(null);
  const { data, isLoading, mutate } = useSWR(
    "/api/enrolls?sortBy=createdAt&sortOrder=desc",
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
      accessorKey: "userId.name",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "userId.phone",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "userId.address",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Address <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "courseId.title",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "courseId.fee",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fee <ChevronsUpDown size={12} className="ml-2" />
          </button>
        );
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
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const enroll = row.original;
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
                রিভিউ
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setPayment(enroll);
                }}
              >
                পেমেন্টস
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
          <h1 className="text-lg font-semibold">ইনরোল রিকুয়েস্টস</h1>
        </div>
        <div className="p-7">
          {isLoading && <p>Loading...</p>}
          {!isLoading && <DataTable columns={columns} data={data.data} />}
          {payment && (
            <AccountPayment enroll={payment} setEnroll={setPayment} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  return checkAdmin(context);
}
