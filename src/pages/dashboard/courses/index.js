import DashboardLayout from "@/src/components/DashboardLayout";
import { DataTable } from "@/src/components/DataTable";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ChevronsUpDown, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";

export const columns = [
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
    accessorKey: "desc",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Desc <ChevronsUpDown className="w-3 h-3 ml-2" />
        </button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category <ChevronsUpDown className="w-3 h-3 ml-2" />
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const service = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 ring-0 focus-visible:ring-transparent"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Add</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(service.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover:!text-red-500">
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const data = [
  {
    id: "1",
    title: "Website Development",
    desc: "Build your website creative and professional with expert team",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "2",
    title: "Web Application Development",
    desc: "Elevate your business with expert web application development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "3",
    title: "Wordpress Theme and Plugin Development",
    desc: "Build your website creative and professional with expert team",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "4",
    title: "Ecommerce Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "5",
    title: "Mobile Application Development",
    desc: "Build your website creative and professional with expert team",
    category: "App development",
    status: "Active",
  },
  {
    id: "6",
    title: "Custom CMS Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "7",
    title: "SEO Optimization",
    desc: "Build your website creative and professional with expert team",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "8",
    title: "UI UX Design",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Interface Design",
    status: "Active",
  },
  {
    id: "9",
    title: "T-shirt Print on Deman",
    desc: "Build your website creative and professional with expert team",
    category: "Design",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
  {
    id: "10",
    title: "Domain and Hosting Development",
    desc: "Elevate Your Business with Expert Web Application Development",
    category: "Full Stack",
    status: "Active",
  },
];

export default function Courses() {
  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">কোর্সসমূহ</h1>
          <Link href={"/dashboard/courses/add-course"}>
            <Button size="sm" variant="outline">
              <Plus size={14} className="mr-2" /> কোর্স সংযুক্ত করুন
            </Button>
          </Link>
        </div>
        <div className="p-7">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </DashboardLayout>
  );
}
