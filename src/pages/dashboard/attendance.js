import DashboardLayout from "@/src/components/DashboardLayout";
import Label from "@/src/components/Label";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { fetcher, formatDateTime } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

export default function Attendance() {
  const router = useRouter();
  const { batchId } = router.query;
  const [batch, setBatch] = useState();
  const [enrolls, setEnrolls] = useState();
  const { data, isLoading, mutate } = useSWR(
    `/api/batches?pageSize=100&sortBy=createdAt&sortOrder=desc`,
    fetcher
  );
  const batches = data?.data;

  useEffect(() => {
    if (!isLoading && batches.length > 0 && batchId) {
      fetchEnrolls(batchId);
    }
  }, [isLoading]);

  const batchOnChange = async (batchId) => {
    router.push(`?batchId=${batchId}`);
    fetchEnrolls(batchId);
  };

  const fetchEnrolls = async (batchId) => {
    try {
      const response = await fetch(`/api/enrolls/batch?batchId=${batchId}`);
      const fetchResponse = await response.json();
      if (response.ok) {
        const filter = batches?.filter((batch) => batch._id === batchId);
        setBatch(filter[0]);
        setEnrolls(fetchResponse.data);
      }
    } catch (error) {
      console.log({ batchOnChangeCatch: error });
    }
  };

  const { control, handleSubmit } = useForm();
  const handleAttendance = (data) => {
    console.log({ data });
  };

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">অ্যাটেনডেন্স</h1>
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <Label htmlFor="batchId" className="!mb-0">
              ব্যাচ
            </Label>
            <Select
              id="batchId"
              onValueChange={batchOnChange}
              defaultValue={batchId}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {batches?.length > 0 &&
                    batches.map((batch) => (
                      <SelectItem key={batch._id} value={batch._id}>
                        {batch.code} - {batch.courseId.title}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="p-7">
          <div className="space-y-4">
            {batch && (
              <div className="space-y-1">
                <p>
                  <span className="dark:text-slate-400">কোর্স:</span>{" "}
                  {batch?.courseId?.title}
                </p>
                <p>
                  <span className="dark:text-slate-400">ব্যাচ কোড:</span>{" "}
                  {batch?.code}
                </p>
                <p>
                  <span className="dark:text-slate-400">ক্লাস ডে:</span>{" "}
                  {batch?.days.join(", ")}
                </p>
                <p>
                  <span className="dark:text-slate-400">ক্লাস টাইম:</span>{" "}
                  {batch?.time && formatDateTime(batch?.time, "hh:mm a")}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit(handleAttendance)}>
              <div>
                <Label>তারিখ</Label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full flex justify-start dark:text-slate-400"
                        >
                          <CalendarIcon size={16} className="mr-2" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span></span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
              <table className="table-auto border-t border-collapse w-full rounded-md">
                <thead>
                  <tr>
                    <td className="border-b p-2"></td>
                    <td className="border-b p-2">নাম</td>
                    <td className="border-b p-2">মোবাইল নাম্বার</td>
                    <td className="border-b p-2">ঠিকানা</td>
                    <td className="border-b p-2"></td>
                  </tr>
                </thead>
                <tbody>
                  {enrolls?.length > 0 &&
                    enrolls.map((enroll, index) => {
                      return (
                        <tr
                          key={enroll._id}
                          className="dark:text-slate-400 text-sm"
                        >
                          <td className="border-b p-2">{++index}</td>
                          <td className="border-b p-2">{enroll.userId.name}</td>
                          <td className="border-b p-2">
                            {enroll.userId.phone}
                          </td>
                          <td className="border-b p-2">
                            {enroll.userId.address}
                          </td>
                          <td className="border-b p-2">
                            <Controller
                              name={`attendance.${enroll._id}`}
                              control={control}
                              defaultValue="Present"
                              render={({ field }) => (
                                <RadioGroup
                                  {...field}
                                  className="flex items-center gap-4"
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <Label
                                    htmlFor={`present-${enroll._id}`}
                                    className="!mb-0 flex gap-2 items-center leading-none cursor-pointer text-sm"
                                  >
                                    <RadioGroupItem
                                      value="Present"
                                      id={`present-${enroll._id}`}
                                    />
                                    উপস্থিত
                                  </Label>
                                  <Label
                                    htmlFor={`absent-${enroll._id}`}
                                    className="!mb-0 flex gap-2 items-center leading-none cursor-pointer text-sm"
                                  >
                                    <RadioGroupItem
                                      value="Absent"
                                      id={`absent-${enroll._id}`}
                                    />
                                    অনুপস্থিত
                                  </Label>
                                  <Label
                                    htmlFor={`leave-${enroll._id}`}
                                    className="!mb-0 flex gap-2 items-center leading-none cursor-pointer text-sm"
                                  >
                                    <RadioGroupItem
                                      value="Leave"
                                      id={`leave-${enroll._id}`}
                                    />
                                    ছুটি
                                  </Label>
                                </RadioGroup>
                              )}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="text-right">
                <Button className="text-white bg-gradient">সাবমিট</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export async function getServerSideProps(context) {
  return checkAdmin(context);
}
