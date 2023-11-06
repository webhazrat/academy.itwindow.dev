import { Button } from "@/src/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
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
import Label from "./Label";
import Alert from "./Alert";
import { BatchEnrollSchema } from "../lib/validation";
import { format, parse } from "date-fns";

export default function AddEnrollInBatch({ batch, setBatch }) {
  const { toast } = useToast();
  const { data, isLoading, mutate } = useSWR(
    `/api/enrolls/course?status=Completed&courseId=${batch.courseId._id}`,
    fetcher
  );
  const courseWiseEnrolls = data?.data;

  const {
    data: data2,
    isLoading: isLoading2,
    mutate: mutate2,
  } = useSWR(`/api/enrolls/batch?batchId=${batch._id}`, fetcher);
  const batchWiseEnrolls = data2?.data;

  const filteredEnrolls = courseWiseEnrolls?.filter(
    (enroll) =>
      !batchWiseEnrolls?.some(
        (student) => student.userId._id === enroll.userId._id
      )
  );

  // add student to batch
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(BatchEnrollSchema),
  });

  // add batch to an enroll
  const batchAddInEnroll = async (data) => {
    data.batchId = batch._id;
    try {
      const response = await fetch(`/api/enroll/update?id=${data.enrollId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updateResponse = await response.json();
      if (!response.ok) {
        // server custom zod pattern error
        if (updateResponse?.errors?.length > 0) {
          updateResponse.errors.forEach((error) => {
            setError(error.field, {
              type: "server",
              message: error.message,
            });
          });
        }
        toast({
          variant: "destructive",
          title: updateResponse.title,
          description: updateResponse.message,
        });
      } else {
        toast({
          variant: "success",
          title: updateResponse.title,
          description: updateResponse.message,
        });
        mutate2();
        reset({ enrollId: "" });
        clearErrors();
      }
    } catch (error) {
      console.log({ addBatchInEnrolllCatch: error });
    }
  };

  // remove student from a bacth
  const removeEnrollFromBatch = async (id) => {
    try {
      const response = await fetch(`/api/enroll/update?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ type: "unset", batchId: "" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updateResponse = await response.json();
      if (response.ok) {
        mutate2();
        toast({
          variant: "success",
          title: updateResponse.title,
          description: "সঠিকভাবে ইনরোল ব্যাচ থেকে রিমুভ হয়েছে",
        });
      }
    } catch (error) {
      console.log({ removeEnrollFromBatchCatch: error });
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
                  {batch.code}
                </p>
                <p>
                  <span className="dark:text-slate-400">কোর্স:</span>{" "}
                  {batch.courseId.title}
                </p>
                <p>
                  <span className="dark:text-slate-400">ক্লাস ডে:</span>{" "}
                  {batch.days?.join(", ")}
                </p>
                <p>
                  <span className="dark:text-slate-400">ক্লাস টাইম:</span>{" "}
                  {format(parse(batch.time, "HH:mm", new Date()), "hh:mm a")}
                </p>
              </div>
              {batch.status !== "Ended" && (
                <form onSubmit={handleSubmit(batchAddInEnroll)}>
                  <Label>ব্যাচে ইনরোল সংযুক্ত</Label>
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-1">
                      <Controller
                        name="enrollId"
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
                                      value={enroll._id}
                                    >
                                      {enroll.userId.name} -{" "}
                                      {enroll.userId.phone}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.enrollId && (
                        <p className="text-sm text-red-400">
                          {errors.enrollId.message}
                        </p>
                      )}
                    </div>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-gradient text-white flex-shrink-0"
                    >
                      {isSubmitting && (
                        <Loader2 size={16} className="mr-2 animate-spin" />
                      )}
                      সংযুক্ত করুন
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b p-2 pl-0">ব্যাচে সংযুক্ত তারিখ</td>
                  <td className="border-b p-2">নাম</td>
                  <td className="border-b p-2">মোবাইল নাম্বার</td>
                  <td className="border-b p-2">ঠিকানা</td>
                  <td className="border-b p-2 pr-0"></td>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr className={`dark:text-slate-400 text-sm`}>
                    <td colSpan={5} className="text-center border-b p-3">
                      Loading...
                    </td>
                  </tr>
                ) : batchWiseEnrolls?.length > 0 ? (
                  batchWiseEnrolls.map((enroll) => (
                    <tr
                      className={`dark:text-slate-400 text-sm`}
                      key={enroll._id}
                    >
                      <td className="border-b py-2">
                        {format(new Date(enroll.createdAt), "PPP")}
                      </td>
                      <td className="border-b p-2">{enroll.userId.name}</td>
                      <td className="border-b p-2">{enroll.userId.phone}</td>
                      <td className={`border-b p-2`}>
                        {enroll.userId.address}
                      </td>
                      <td className="border-b p-2">
                        <Alert
                          title="আপনি কি এই স্টুডেন্ট কে এই ব্যাচ থেকে রিমুভ করতে চান?"
                          description="এই স্টুডেন্ট এই ব্যাচ থেকে রিমুভ হয়ে যাবে, তারপর এই ব্যাচে বিদ্যমান থাকবে না। আপনি কি নিশ্চিত রিমুভ করতে।"
                          onClick={() => removeEnrollFromBatch(enroll._id)}
                        >
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="py-0 text-red-400 hover:text-red-400"
                          >
                            <Trash2 size={12} className="mr-2" /> রিমুভ
                          </Button>
                        </Alert>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className={`dark:text-slate-400 text-sm`}>
                    <td colSpan={5} className="text-center border-b p-3">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
