import { Button } from "@/src/components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import useSWR from "swr";
import { fetcher, formatDateTime } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { BatchStudentSchema } from "../lib/validation";

export default function AddStudents({ batch, setBatch }) {
  const { toast } = useToast();
  const { data, isLoading } = useSWR(
    `/api/enrolls/filter?status=Completed&courseId=${batch.courseId._id}`,
    fetcher
  );
  const enrolls = data?.data;

  const {
    data: data2,
    isLoading: isLoading2,
    mutate: mutate2,
  } = useSWR(`/api/student/batch?id=${batch._id}`, fetcher);
  const students = data2?.data;

  const filteredEnrolls = enrolls?.filter(
    (enroll) =>
      !students?.some((student) => student.userId._id === enroll.userId._id)
  );

  console.log({ enrolls });

  console.log({ batch });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(BatchStudentSchema),
  });

  // student data submit to a batch
  const handleStudent = async (data) => {
    (data.batchId = batch._id), (data.courseId = batch.courseId._id);
    try {
      const response = await fetch(`/api/student/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createResponse = await response.json();
      if (!response.ok) {
        // server custom zod pattern error
        if (createResponse?.errors?.length > 0) {
          createResponse.errors.forEach((error) => {
            setError(error.field, {
              type: "server",
              message: error.message,
            });
          });
        }
        toast({
          variant: "destructive",
          title: createResponse.title,
          description: createResponse.message,
        });
      } else {
        toast({
          variant: "success",
          title: createResponse.title,
          description: createResponse.message,
        });
        mutate2();
        reset({ userId: "" });
        clearErrors();
      }
    } catch (error) {
      console.log({ batchStudentAddCatch: error });
    }
  };

  return (
    <Dialog open={batch} onOpenChange={setBatch}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>স্টুডেন্টস</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_200px)] overflow-y-auto">
          <div className="space-y-5 p-7">
            <div className="grid grid-cols-2">
              <div className="space-y-1">
                <p>
                  <span className="dark:text-slate-400">ব্যাচ কোড:</span>{" "}
                  {batch.batchCode}
                </p>
                <p>
                  <span className="dark:text-slate-400">কোর্স:</span>{" "}
                  {batch.courseId.title}
                </p>
                <p>
                  <span className="dark:text-slate-400">ক্লাস ডে:</span>{" "}
                  {batch.classDays.join(", ")}
                </p>
                <p>
                  <span className="dark:text-slate-400">ক্লাস টাইম:</span>{" "}
                  {formatDateTime(batch.time, "hh:mm a")}
                </p>
              </div>
              {batch.status !== "Ended" && (
                <form onSubmit={handleSubmit(handleSubmit)}>
                  <div className="flex gap-3">
                    <Controller
                      name="userId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {filteredEnrolls?.length > 0 &&
                                filteredEnrolls.map((enroll) => (
                                  <SelectItem
                                    key={enroll._id}
                                    value={enroll.userId._id}
                                  >
                                    {enroll.userId.name} - {enroll.userId.phone}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Button
                      type="submit"
                      className="bg-gradient text-white flex-shrink-0"
                    >
                      সংযুক্ত করুন
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b p-2 pr-0"></td>
                  <td className="border-b p-2 pl-0">ব্যাচে সংযুক্ত তারিখ</td>
                  <td className="border-b p-2">নাম</td>
                  <td className="border-b p-2">মোবাইল নাম্বার</td>
                  <td className="border-b p-2">ঠিকানা</td>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr className={`dark:text-slate-400 text-sm`}>
                    <td colSpan={5} className="text-center">
                      Loading...
                    </td>
                  </tr>
                )}
                {students?.length > 0 &&
                  students.map((student) => (
                    <tr
                      className={`dark:text-slate-400 text-sm`}
                      key={student._id}
                    >
                      <td className="border-b p-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="p-0 h-7 w-7"
                        >
                          <Pencil size={12} />
                        </Button>
                      </td>
                      <td className="border-b py-2">
                        {formatDateTime(student.createdAt, "MMMM do, yyyy")}
                      </td>
                      <td className="border-b p-2">{student.userId.name}</td>
                      <td className="border-b p-2">{student.userId.phone}</td>
                      <td className={`border-b p-2`}>
                        {student.userId.address}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
