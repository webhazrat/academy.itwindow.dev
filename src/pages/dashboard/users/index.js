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
import { checkAdmin } from "@/src/middleware/clientAuth";
import { fetcher } from "@/src/lib/utils";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import UserUpdate from "@/src/components/UserUpdate";

export default function Users() {
  const [user, setUser] = useState(null);
  const { data, isLoading, mutate } = useSWR(
    "/api/users?sortBy=createdAt&sortOrder=desc",
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name <ChevronsUpDown className="w-3 h-3 ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone <ChevronsUpDown className="w-3 h-3 ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Address <ChevronsUpDown className="w-3 h-3 ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role <ChevronsUpDown className="w-3 h-3 ml-2" />
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
            Status <ChevronsUpDown className="w-3 h-3 ml-2" />
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
            CreatedAt <ChevronsUpDown className="w-3 h-3 ml-2" />
          </button>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
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
                onClick={() => {
                  setUser(user);
                }}
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
          <h1 className="text-lg font-semibold">ইউজারস</h1>
        </div>
        <div className="p-7">
          {isLoading && <p>Loading...</p>}
          {!isLoading && <DataTable columns={columns} data={data.data} />}

          {user && <UserUpdate user={user} setUser={setUser} mutate={mutate} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
export async function getServerSideProps(context) {
  return checkAdmin(context);
}
