import Label from "@/src/components/Label";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
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

export default function BatchCreate({ mutate }) {
  const [isOpen, setIsOpen] = useState(null);
  const { data, isLoading } = useSWR(
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
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(BatchSchema),
    defaultValues: {
      courseId: "",
      code: "",
      days: [],
      time: "",
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

  // batch create data submit
  const handleBatch = async (data) => {
    try {
      const response = await fetch("/api/batch/create", {
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
      } else {
        toast({
          variant: "success",
          title: createResponse.title,
          description: createResponse.message,
        });
        mutate();
        reset();
        clearErrors();
        setIsOpen(null);
      }
    } catch (error) {
      console.log({ batchCreateCatch: error });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus size={14} className="mr-2" /> ব্যাচ সংযুক্ত করুন
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>নতুন ব্যাচ সংযুক্ত</DialogTitle>
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
              সংযুক্ত করুন
            </Button>
          </div>
          <ScrollArea className="max-h-[calc(100vh_-_200px)] overflow-y-auto mb-16">
            <div className="space-y-5 p-7">
              <div className="space-y-2">
                <Label htmlFor="courseId">কোর্স</Label>
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
                <Label htmlFor="code">ব্যাচ আইডি</Label>
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
                <Label htmlFor="days">ক্লাস ডে</Label>
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
                              field.value.includes(day) &&
                              "bg-accent dark:!text-white"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              {...field}
                              onChange={() => handleToggleChange(day)}
                              checked={field.value.includes(day)}
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
                <Label htmlFor="time">সময়</Label>
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
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
