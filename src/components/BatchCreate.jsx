import Label from "@/src/components/Label";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { CourseSchema } from "@/src/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Minus, Plus } from "lucide-react";
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

export default function BatchCreate({ mutate }) {
  const [isOpen, setIsOpen] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      classDays: [],
      batchId: "",
      time: "",
    },
  });

  const days = [
    "শনিবার",
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
  ];

  const handleToggleChange = (day) => {
    const classDays = getValues("classDays");
    if (classDays.includes(day)) {
      setValue(
        "classDays",
        classDays.filter((i) => i !== day)
      );
    } else {
      setValue("classDays", [...classDays, day]);
    }
  };

  const handleBatch = (data) => {
    console.log({ data });
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
                <Label htmlFor="batchId">ব্যাচ আইডি</Label>
                <Controller
                  name="batchId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="BATCHXX"
                      id="batchId"
                      {...field}
                    />
                  )}
                />

                {errors.batchId && (
                  <p className="text-sm text-red-400">
                    {errors.batchId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="classDays">ক্লাস ডে</Label>
                <div className="flex flex-wrap items-center gap-2">
                  {days.map((day) => (
                    <Controller
                      key={day}
                      name="classDays"
                      control={control}
                      render={({ field }) => {
                        return (
                          <label
                            className={`h-10 px-4 py-2 rounded-md cursor-pointer border border-input hover:bg-accent hover:text-accent-foreground mb-0 transition-colors dark:text-slate-400 text-sm ${
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
              </div>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
