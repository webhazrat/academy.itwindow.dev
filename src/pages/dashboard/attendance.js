import DashboardLayout from "@/src/components/DashboardLayout";
import Label from "@/src/components/Label";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import { Input } from "@/src/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useToast } from "@/src/components/ui/use-toast";
import { fetcher, formatDateTime } from "@/src/lib/utils";
import { checkAdmin } from "@/src/middleware/clientAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

export default function Attendance() {
  const router = useRouter();
  const { batchId, date } = router.query;
  const { toast } = useToast();
  const [batch, setBatch] = useState();
  const [url, setUrl] = useState(null);
  const { data, isLoading } = useSWR(
    `/api/batches?pageSize=100&sortBy=createdAt&sortOrder=desc`,
    fetcher
  );
  const batches = data?.data;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    formState: { isSubmitting: isSubmitting2 },
    reset: reset2,
  } = useForm();

  const {
    data: data2,
    isLoading: isLoading2,
    mutate: mutate2,
  } = useSWR(url, fetcher);
  const attendances = data2?.data;

  // attendances fetch with batch wise
  const batchDateAttendance = async (data) => {
    reset2();
    const date = encodeURIComponent(data.date.toISOString());
    const batchId = data.batchId;
    router.push(`?batchId=${batchId}&date=${date}`);
    batchFilter(batchId);
    setUrl(`/api/attendances/batch?batchId=${batchId}&date=${date}`);
  };

  // attendance submit
  const handleAttendance = async (data) => {
    const attendances = Object.keys(data.attendance).map((key) => ({
      _id: key,
      status: data.attendance[key],
    }));
    const formData = { attendances };
    try {
      const response = await fetch(`/api/attendances/create`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createResponse = await response.json();
      if (response.ok) {
        toast({
          variant: "success",
          title: createResponse.title,
          description: createResponse.message,
        });
        mutate2(url);
      }
      reset2();
    } catch (error) {
      console.log({ handleAttendanceCatch: error });
    }
  };

  // batches find with batchId to get batch details
  const batchFilter = (batchId) => {
    const batch = batches.find((batch) => batch._id === batchId);
    setBatch(batch);
  };

  // attendances fetch when reload the url with params
  useEffect(() => {
    if (batchId && date) {
      setUrl(`/api/attendances/batch?batchId=${batchId}&date=${date}`);
    }
  }, []);

  // batch details when reload the url with params
  useEffect(() => {
    !isLoading && batchFilter(batchId);
  }, [isLoading]);

  return (
    <DashboardLayout>
      <div>
        <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
          <h1 className="text-lg font-semibold">অ্যাটেনডেন্স</h1>
        </div>
        <div className="p-7">
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="space-y-5">
              <form
                className="space-y-4"
                onSubmit={handleSubmit(batchDateAttendance)}
              >
                <div>
                  <Controller
                    name="batchId"
                    control={control}
                    defaultValue={batchId}
                    render={({ field }) => (
                      <Select
                        id="batchId"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={date ? new Date(date) : new Date()}
                    render={({ field }) => (
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className="p-0"
                      />
                    )}
                  />
                </div>
                <div className="text-right">
                  <Button
                    disabled={isSubmitting}
                    size="sm"
                    type="submit"
                    className="text-white bg-gradient"
                  >
                    {isSubmitting && (
                      <Loader2 size={16} className="mr-2 animate-spin" />
                    )}
                    সাবমিট
                  </Button>
                </div>
              </form>
              {batch && (
                <div className="space-y-1 p-4 border rounded-md">
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
            </div>

            <form
              onSubmit={handleSubmit2(handleAttendance)}
              className="space-y-5 flex-1"
            >
              <table className="table-auto border-t border-collapse w-full rounded-md text-sm">
                <thead>
                  <tr>
                    <td className="border-b p-2"></td>
                    <td className="border-b p-2">নাম</td>
                    <td className="border-b p-2">মোবাইল নাম্বার</td>
                    <td className="border-b p-2">ঠিকানা</td>
                    <td className="border-b p-2">রেকর্ডেড</td>
                    <td className="border-b p-2"></td>
                  </tr>
                </thead>
                <tbody className="dark:text-slate-400">
                  {isLoading2 ? (
                    <tr>
                      <td colSpan={6} className="border-b py-3 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : attendances?.length > 0 ? (
                    attendances.map((attendance, index) => {
                      return (
                        <tr key={attendance._id} className="hover:bg-muted/50 ">
                          <td className="border-b p-2">{++index}</td>
                          <td className="border-b p-2">
                            {attendance.userId.name}
                          </td>
                          <td className="border-b p-2">
                            {attendance.userId.phone}
                          </td>
                          <td className="border-b p-2">
                            {attendance.userId.address}
                          </td>
                          <td className="border-b p-2">
                            {attendance.recorded ? (
                              <span className="text-green-400">True</span>
                            ) : (
                              <span className="text-red-400">False</span>
                            )}
                          </td>
                          <td className="border-b p-2">
                            <div className="hidden">
                              <Controller
                                name={`attendanceId.${attendance._id}`}
                                control={control2}
                                defaultValue={attendance._id}
                                render={({ field }) => (
                                  <Input {...field} className="mb-2" />
                                )}
                              />
                            </div>
                            <Controller
                              name={`attendance.${attendance._id}`}
                              control={control2}
                              defaultValue={attendance.status}
                              render={({ field }) => (
                                <RadioGroup
                                  {...field}
                                  className="flex items-center gap-4"
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <Label
                                    htmlFor={`present-${attendance._id}`}
                                    className="!mb-0 flex gap-2 items-center leading-none cursor-pointer text-sm"
                                  >
                                    <RadioGroupItem
                                      value="Present"
                                      id={`present-${attendance._id}`}
                                    />
                                    উপস্থিত
                                  </Label>
                                  <Label
                                    htmlFor={`absent-${attendance._id}`}
                                    className="!mb-0 flex gap-2 items-center leading-none cursor-pointer text-sm"
                                  >
                                    <RadioGroupItem
                                      value="Absent"
                                      id={`absent-${attendance._id}`}
                                    />
                                    অনুপস্থিত
                                  </Label>
                                  <Label
                                    htmlFor={`leave-${attendance._id}`}
                                    className="!mb-0 flex gap-2 items-center leading-none cursor-pointer text-sm"
                                  >
                                    <RadioGroupItem
                                      value="Leave"
                                      id={`leave-${attendance._id}`}
                                    />
                                    ছুটি
                                  </Label>
                                </RadioGroup>
                              )}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="border-b  py-3 text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="text-right">
                <Button
                  disabled={isSubmitting2 || !attendances?.length}
                  size="sm"
                  className="text-white bg-gradient"
                >
                  {isSubmitting2 && (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  )}
                  সাবমিট
                </Button>
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
