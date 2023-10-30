import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import Label from "./Label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackSchema } from "../lib/validation";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

export default function MyFeedback({ courseId }) {
  const [isOpen, setIsOpen] = useState(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(FeedbackSchema),
  });

  const handleFeedback = async (data) => {
    data.courseId = courseId;
    try {
      const response = await fetch(`/api/feedback/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const feedbackResponse = await response.json();
      if (response.ok) {
        reset();
        clearErrors();
        setIsOpen(null);
        toast({
          variant: "success",
          title: feedbackResponse.title,
          description: feedbackResponse.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: feedbackResponse.title,
          description: feedbackResponse.message,
        });
      }
    } catch (error) {
      console.log({ handleFeedbackCatch: error });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <a className="cursor-pointer">ফিডব্যাক দিন</a>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-7">
          <DialogTitle>ফিডব্যাক</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
          <div className="p-7 pt-0">
            <form className="space-y-4" onSubmit={handleSubmit(handleFeedback)}>
              <div className="space-y-2">
                <Label htmlFor="star">
                  স্টার <span className="text-red-400">*</span>
                </Label>
                <Input type="text" {...register("star")} />
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
                <Textarea id="comment" {...register("comment")} />
                {errors.comment && (
                  <p className="text-sm dark:text-red-400">
                    {errors.comment.message}
                  </p>
                )}
              </div>
              <div className="text-right">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient text-white"
                >
                  {isSubmitting && (
                    <Loader2 size={16} className="mr-2 animate-spin" />
                  )}
                  সাবমিট
                </Button>
              </div>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
