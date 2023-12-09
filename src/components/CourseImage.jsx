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
  const [showSelectedImage, setShowSelectedImage] = useState({
    icon: "",
    image: "",
  });

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
    const id = e.target.id;
    setShowSelectedImage((prev) => ({ ...prev, [id]: "" }));
    if (file && file.type.startsWith("image/")) {
      clearErrors();
      const url = URL.createObjectURL(file);
      setShowSelectedImage((prev) => ({ ...prev, [id]: url }));
    }
  };

  const handleImageSubmit = async (data) => {
    console.log({ data });
    try {
      CourseImageSchema.parse({ icon: data.icon[0], image: data.image[0] });
      const formData = new FormData();
      formData.append("icon", data.icon[0]);
      formData.append("image", data.image[0]);
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
      <DialogContent className="p-0 max-w-md">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle> কোর্স ({course.title})</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleImageSubmit)}>
          <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
            <div className="space-y-4 p-7">
              <div className="space-y-2">
                <Label htmlFor="icon">আইকন</Label>
                {(course.icon || showSelectedImage.icon) && (
                  <Image
                    src={`${
                      showSelectedImage.icon
                        ? showSelectedImage.icon
                        : `/courses/${course.icon}`
                    }`}
                    height={80}
                    width={80}
                    objectFit="contain"
                    className="rounded-md"
                  />
                )}
                <Input
                  type="file"
                  id="icon"
                  {...register("icon")}
                  onChange={handleImageChange}
                />
                {errors.icon && (
                  <p className="text-sm text-red-400">{errors.icon.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">ইমেজ</Label>
                {(course.image || showSelectedImage.image) && (
                  <Image
                    src={`${
                      showSelectedImage.image
                        ? showSelectedImage.image
                        : `/courses/${course.image}`
                    }`}
                    height="200"
                    width="400"
                    objectFit="contain"
                    className="rounded-md"
                  />
                )}
                <Input
                  type="file"
                  id="image"
                  {...register("image")}
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-sm text-red-400">{errors.image.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="bg-gradient text-white"
                disabled={
                  isSubmitting ||
                  (!showSelectedImage.icon && !showSelectedImage.image)
                }
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
