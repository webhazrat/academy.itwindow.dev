import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { formatDateTime } from "../lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";

export const UsersTableColumns = (setUser) => [
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
    cell: ({ row }) => {
      return formatDateTime(row.getValue("createdAt"), "MMMM do, yyyy");
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

export const CoursesTableColumns = (setPhoto, setCourse) => [
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
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order <ChevronsUpDown className="w-3 h-3 ml-2" />
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
    cell: ({ row }) => {
      return formatDateTime(row.getValue("createdAt"), "MMMM do, yyyy");
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

export const EnrollRequestsTableColumns = (setPayment) => [
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
          Course Title <ChevronsUpDown size={12} className="ml-2" />
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
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={`${status === "Pending" && "text-yellow-400"} ${
            (status === "Completed" || status === "Ended") && "text-green-400"
          }`}
        >
          {status}
        </span>
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
              onClick={() => {
                setPayment(enroll);
              }}
            >
              পেমেন্টস
            </DropdownMenuItem>
            <DropdownMenuItem>ইডিট</DropdownMenuItem>
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

export const BatchesTableColumns = () => [
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
