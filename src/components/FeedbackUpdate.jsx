import Label from "@/src/components/Label";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
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
import { Textarea } from "./ui/textarea";
import { FeedbackSchema } from "../lib/validation";

export default function FeedbackUpdate({ feedback, setFeedback, mutate }) {
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      ...feedback,
    },
  });

  console.log({ feedback });

  // feedback update data submit
  const handleFeedback = async (data) => {
    data._id = feedback._id;
    console.log({ data });
    // try {
    //   const response = await fetch(`/api/batch/update?id=${batch._id}`, {
    //     method: "PUT",
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const updateResponse = await response.json();
    //   if (!response.ok) {
    //     // server custom zod pattern error
    //     if (updateResponse?.errors?.length > 0) {
    //       updateResponse.errors.forEach((error) => {
    //         setError(error.field, {
    //           type: "server",
    //           message: error.message,
    //         });
    //       });
    //     }
    //   } else {
    //     toast({
    //       variant: "success",
    //       title: updateResponse.title,
    //       description: updateResponse.message,
    //     });
    //     mutate();
    //     clearErrors();
    //     setBatch(null);
    //   }
    // } catch (error) {
    //   console.log({ batchUpdateCatch: error });
    // }
  };

  return (
    <Dialog open={feedback} onOpenChange={setFeedback}>
      <DialogContent className="p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>ফিডব্যাক আপডেট</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFeedback)}>
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
                <Label htmlFor="star">
                  স্টার <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="star"
                  control={control}
                  render={({ field }) => <Input type="text" {...field} />}
                />

                {errors.star && (
                  <p className="text-sm dark:text-red-400">
                    {errors.star.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">
                  মন্তব্য <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="comment"
                  control={control}
                  render={({ field }) => <Textarea id="comment" {...field} />}
                />

                {errors.comment && (
                  <p className="text-sm dark:text-red-400">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  স্ট্যাটাস <span className="text-red-400">*</span>
                </Label>
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
