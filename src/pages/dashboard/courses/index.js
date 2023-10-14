import CourseCreate from "@/src/components/CourseCreate";
import CourseImage from "@/src/components/CourseImage";
import CourseUpdate from "@/src/components/CourseUpdate";
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
import { checkAdmin } from "@/src/lib/auth";
import { fetcher } from "@/src/lib/utils";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

export default function Courses() {
  const [course, setCourse] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { data, isLoading, mutate } = useSWR(
    "/api/course?sortBy=createdAt&sortOrder=desc",
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title <ChevronsUpDown className="w-3 h-3 ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "excerpt",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Short Description <ChevronsUpDown className="w-3 h-3 ml-2" />
          </button>
        );
      },
    },
    {
      accessorKey: "fee",
      header: ({ column }) => {
        return (
          <button
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fee <ChevronsUpDown className="w-3 h-3 ml-2" />
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
        const course = row.original;
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
                  setPhoto(course);
                }}
              >
                ফটো
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setCourse(course);
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
          <h1 className="text-lg font-semibold">কোর্সসমূহ</h1>
          <CourseCreate mutate={mutate} />
        </div>
        <div className="p-7">
          {isLoading && <p>Loading...</p>}
          {!isLoading && <DataTable columns={columns} data={data.data} />}
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