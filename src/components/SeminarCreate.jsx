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
import { SeminarSchema } from "../lib/validation";

export default function SeminarCreate({ mutate }) {
  const [isOpen, setIsOpen] = useState(null);

  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(SeminarSchema),
  });

  // seminar create data submit
  const handleSeminar = async (data) => {
    try {
      const response = await fetch("/api/seminar/create", {
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
      console.log({ seminarCreateCatch: error });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus size={14} className="mr-2" /> সেমিনার সংযুক্ত করুন
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>নতুন সেমিনার</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSeminar)}>
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
                <Label htmlFor="title">
                  টাইটেল <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input type="text" id="title" {...field} />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">
                  শর্ট ডেসক্রিপশন <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="shortDescription"
                  control={control}
                  render={({ field }) => (
                    <Textarea id="shortDescription" {...field} />
                  )}
                />
                {errors.shortDescription && (
                  <p className="text-sm text-red-400">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  ডেসক্রিপশন <span className="text-red-400">*</span>
                </Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea id="description" {...field} />
                  )}
                />
                {errors.description && (
                  <p className="text-sm text-red-400">
                    {errors.description.message}
                  </p>
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
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Unpublished">
                            Unpublished
                          </SelectItem>
                          <SelectItem value="Ended">Ended</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
