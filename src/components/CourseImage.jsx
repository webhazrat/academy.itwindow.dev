import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Label from "./Label";
import { useState } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { CourseImageSchema } from "../lib/validation";
import { z } from "zod";
import { useToast } from "./ui/use-toast";
import { ScrollArea } from "./ui/scroll-area";

export default function CourseImage({ course, setCourse, mutate }) {
  const [showSelectedImage, setShowSelectedImage] = useState(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  // onChange image with zod validation
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setShowSelectedImage(null);
    if (file.type.startsWith("image/")) {
      clearErrors();
      const imageUrl = URL.createObjectURL(file);
      setShowSelectedImage(imageUrl);
    }
  };

  const handleImageSubmit = async (data) => {
    try {
      CourseImageSchema.parse({ file: data.file[0] });
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("id", course._id);
      const response = await fetch(`/api/course/image`, {
        method: "POST",
        body: formData,
      });
      const imageResonse = await response.json();
      if (response.ok) {
        toast({
          variant: "success",
          title: imageResonse.title,
          description: imageResonse.message,
        });
        mutate();
        setCourse(null);
      }
      console.log({ courseImageResponse: imageResonse });
    } catch (error) {
      // for CourseImageSchema
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          setError(error.path.join("."), {
            type: "manual",
            message: error.message,
          });
        });
      }
      console.log({ courseImageCatch: error });
    }
  };

  return (
    <Dialog open={course} onOpenChange={setCourse}>
      <DialogContent className="p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle> কোর্স ({course.title})</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleImageSubmit)}>
          <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
            <div className="space-y-4 p-7">
              <div className="space-y-2">
                <Label htmlFor="file">ইমেজ</Label>
                {(course.image || showSelectedImage) && (
                  <Image
                    src={`${
                      showSelectedImage
                        ? showSelectedImage
                        : `/courses/${course.image}`
                    }`}
                    height={80}
                    width={80}
                    className="rounded-md"
                  />
                )}
                <Input
                  type="file"
                  id="file"
                  {...register("file")}
                  onChange={handleImageChange}
                />
                {errors.file && (
                  <p className="text-sm text-red-400">{errors.file.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-gradient text-white"
                disabled={isSubmitting || !showSelectedImage}
              >
                {isSubmitting && (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                )}
                আপলোড করুন
              </Button>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
