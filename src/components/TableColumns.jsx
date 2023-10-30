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
import Image from "next/image";
import { th } from "date-fns/locale";
import { format, parse, parseISO } from "date-fns";

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
    accessorKey: "image",
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
    cell: ({ row }) => {
      const image = row.getValue("image")
        ? `/uploads/${row.getValue("image")}`
        : "/no-photo.png";
      return (
        <div className="flex gap-2 items-center">
          <div className="flex flex-shrink-0">
            <Image
              src={image}
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
          {row.getValue("name")}
        </div>
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
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={`${status === "Verified" && "text-green-400"} ${
            (status === "Unverified" || status === "Suspended") &&
            "text-red-400"
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
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={`${status === "Unpublished" && "text-yellow-400"} ${
            status === "Published" && "text-green-400"
          }`}
        >
          {status}
        </span>
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
  { accessorKey: "userId.image", enableHiding: false },
  {
    accessorKey: "userId.name",
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
    cell: ({ row }) => {
      const image = row.getValue("userId_image")
        ? `/uploads/${row.getValue("userId_image")}`
        : "/no-photo.png";
      return (
        <div className="flex gap-2 items-center">
          <div className="flex flex-shrink-0">
            <Image
              src={image}
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
          {row.getValue("userId_name")}
        </div>
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
    accessorKey: "batchId.code",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Batch <ChevronsUpDown size={12} className="ml-2" />
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

export const BatchesTableColumns = (setBatch, setStudent) => [
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
    accessorKey: "code",
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
    accessorKey: "days",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Days <ChevronsUpDown size={12} className="ml-2" />
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
      return format(
        parse(row.getValue("time"), "HH:mm", new Date()),
        "hh:mm a"
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
            (status === "Ongoing" || status === "Ended") && "text-green-400"
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
      return format(new Date(row.getValue("createdAt")), "PPP");
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
              onClick={() => {
                setStudent(batch);
              }}
            >
              স্টুডেন্টস
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setBatch(batch);
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

export const FeedbacksTableColumns = (setFeedback) => [
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
          Course Title <ChevronsUpDown className="w-3 h-3 ml-2" />
        </button>
      );
    },
  },
  {
    accessorKey: "userId.name",
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
    accessorKey: "userId.phone",
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
    accessorKey: "star",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Star <ChevronsUpDown className="w-3 h-3 ml-2" />
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
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={`${status === "Pending" && "text-yellow-400"} ${
            status === "Approved" && "text-green-400"
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
          CreatedAt <ChevronsUpDown className="w-3 h-3 ml-2" />
        </button>
      );
    },
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "PPP");
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const feedback = row.original;
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
                setFeedback(feedback);
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
