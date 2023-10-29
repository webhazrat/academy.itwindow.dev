import Label from "@/src/components/Label";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { CalendarIcon, Loader2 } from "lucide-react";
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
import { BatchSchema } from "../lib/validation";
import { useToast } from "./ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format, isValid } from "date-fns";

export default function BatchUpdate({ batch, setBatch, mutate }) {
  const { data } = useSWR(
    "/api/courses?sortBy=createdAt&sortOrder=asc",
    fetcher
  );
  const courses = data?.data;
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(BatchSchema),
    defaultValues: {
      ...batch,
      courseId: batch.courseId._id,
    },
  });

  const allDays = [
    "শনিবার",
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
  ];

  // class days value set to useForm
  const handleToggleChange = (day) => {
    const days = getValues("days");
    if (days.includes(day)) {
      setValue(
        "days",
        days.filter((i) => i !== day)
      );
    } else {
      setValue("days", [...days, day]);
    }
  };

  // batch update data submit
  const handleBatch = async (data) => {
    try {
      const response = await fetch(`/api/batch/update?id=${batch._id}`, {
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
      } else {
        toast({
          variant: "success",
          title: updateResponse.title,
          description: updateResponse.message,
        });
        mutate();
        clearErrors();
        setBatch(null);
      }
    } catch (error) {
      console.log({ batchUpdateCatch: error });
    }
  };

  return (
    <Dialog open={batch} onOpenChange={setBatch}>
      <DialogContent className="p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>ব্যাচ আপডেট</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleBatch)}>
          <div className="fixed w-full bottom-0 px-7 left-0 dark:bg-background rounded-b-md z-40 border-t h-16 flex justify-end items-center">
            <Button
              type="submit"
              className="bg-gradient text-white"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 size={16} className="mr-2 animate-spin" />
              )}
              আপডেট করুন
            </Button>
          </div>
          <ScrollArea className="max-h-[calc(100vh_-_200px)] overflow-y-auto mb-16">
            <div className="space-y-5 p-7">
              <div className="space-y-2">
                <Label htmlFor="courseId">
                  কোর্স <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="courseId"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {courses?.length > 0 &&
                            courses.map((course) => (
                              <SelectItem key={course._id} value={course._id}>
                                {course.title}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.courseId && (
                  <p className="text-sm text-red-400">
                    {errors.courseId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">
                  ব্যাচ আইডি <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="code"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="BATCHXX"
                      id="code"
                      {...field}
                    />
                  )}
                />
                {errors.code && (
                  <p className="text-sm text-red-400">{errors.code.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="days">
                  ক্লাস ডে <span className="text-red-400">*</span>
                </Label>
                <div className="flex flex-wrap items-center gap-2">
                  {allDays.map((day) => (
                    <Controller
                      key={day}
                      name="days"
                      control={control}
                      render={({ field }) => {
                        return (
                          <label
                            className={`h-10 px-4 flex items-center rounded-md cursor-pointer border border-input hover:bg-accent hover:text-accent-foreground mb-0 transition-colors dark:text-slate-400 text-sm ${
                              field.value?.includes(day) &&
                              "bg-accent dark:!text-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              {...field}
                              onChange={() => handleToggleChange(day)}
                              checked={field.value?.includes(day)}
                            />
                            {day}
                          </label>
                        );
                      }}
                    />
                  ))}
                </div>
                {errors.days && (
                  <p className="text-sm text-red-400">{errors.days.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">ক্লাস শুরুর তারিখ</Label>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className="w-full flex justify-between dark:text-slate-400"
                          >
                            {field.value && isValid(new Date(field.value)) ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span></span>
                            )}

                            <CalendarIcon size={16} />
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
                    );
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  সময় <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <Input type="time" id="time" {...field} />
                  )}
                />
                {errors.time && (
                  <p className="text-sm text-red-400">{errors.time.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">স্ট্যাটাস</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="status"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Ongoing">Ongoing</SelectItem>
                          <SelectItem value="Ended">Ended</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.time && (
                  <p className="text-sm text-red-400">{errors.time.message}</p>
                )}
              </div>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
