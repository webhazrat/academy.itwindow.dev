import DashboardLayout from "@/src/components/DashboardLayout";
import Label from "@/src/components/Label";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { CoursePhotoSchema, CourseSchema } from "@/src/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [showSelectedImage, setShowSelectedImage] = useState(null);
  const { toast } = useToast();
  const {
    control,
    register,
    unregister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      topics: [{ value: "" }],
      details: [{ question: "", answer: "" }],
      requirements: [{ value: "" }],
      knows: [{ value: "" }],
      hows: [{ value: "" }],
    },
  });

  const topics = useFieldArray({
    name: "topics",
    control,
  });

  const details = useFieldArray({
    name: "details",
    control,
  });

  const requirements = useFieldArray({
    name: "requirements",
    control,
  });

  const knows = useFieldArray({
    name: "knows",
    control,
  });

  const hows = useFieldArray({
    name: "hows",
    control,
  });

  const handleCourse = async (data) => {
    try {
      CoursePhotoSchema.parse({ file });
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/course/coursePhoto", {
        method: "POST",
        body: formData,
      });
      const photoResonse = await response.json();
      const { data: image } = photoResonse;
      if (response.ok) {
        // data set to data variable
        const allData = {
          ...data,
          image,
        };
        // second request
        const response2 = await fetch("/api/course/create", {
          method: "POST",
          body: JSON.stringify(allData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const createResponse = await response2.json();
        if (!response2.ok) {
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
            variant: "sccess",
            title: createResponse.title,
            description: createResponse.message,
          });
          reset();
          clearErrors();
          setShowSelectedImage(null);
          setFile(null);
        }
      }
    } catch (error) {
      // for CoursePhotoSchema
      if (error instanceof z.ZodError) {
        error.errors.forEach((error) => {
          setError(error.path.join("."), {
            type: "manual",
            message: error.message,
          });
        });
      }
      console.log({ courseCreateCatch: error });
    }
  };

  // onChange image with zod validation
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    try {
      CoursePhotoSchema.parse({ file });
      const imageUrl = URL.createObjectURL(file);
      setShowSelectedImage(imageUrl);
      clearErrors("file");
    } catch (error) {
      setShowSelectedImage(null);
      setError("file", {
        type: "manual",
        message: error.errors[0].message,
      });
    }
  };

  return (
    <DashboardLayout>
      <div>
        <form onSubmit={handleSubmit(handleCourse)}>
          <div className="py-3 px-7 flex items-center justify-between bg-slate-50 dark:bg-slate-800 dark:bg-opacity-30">
            <h1 className="text-lg font-semibold">নতুন কোর্স সংযুক্ত</h1>
            <div className="flex gap-5 items-center">
              <Link href="/dashboard/courses">সব কোর্সসমূহ</Link>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                variant="outline"
              >
                {isSubmitting && (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                )}
                সংযুক্ত করুন
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-[8fr_4fr] gap-5 p-7">
            <div className="flex-1">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">কোর্স টাইটেল</Label>
                  <Input type="text" id="title" {...register("title")} />
                  {errors.title && (
                    <p className="text-sm text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">স্লাগ</Label>
                  <p className="text-sm text-slate-400">
                    এই ইনপুট বক্সে ইংরেজিতে ইউআরএল ইনপুট করতে হবে।
                    (slug-will-be-like)
                  </p>
                  <Input type="text" id="slug" {...register("slug")} />
                  {errors.slug && (
                    <p className="text-sm text-red-400">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">ছোট বিবরণ</Label>
                  <Textarea rows="2" id="excerpt" {...register("excerpt")} />
                  {errors.excerpt && (
                    <p className="text-sm text-red-400">
                      {errors.excerpt.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">বিবরণ</Label>
                  <Textarea
                    rows="4"
                    id="description"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-400">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="topics">কোর্সে যা শিখবেন</Label>
                  {topics.fields.map((field, index) => (
                    <div key={field.id} className="space-y-2">
                      <div className="relative">
                        <Input
                          id="topics"
                          type="text"
                          {...register(`topics.${index}.value`)}
                          defaultValue={field.value}
                        />
                        {index !== 0 && (
                          <Button
                            className="absolute top-0 right-0"
                            variant="ghost"
                            onClick={() => {
                              topics.remove(index);
                              unregister(`topics.${index}`);
                            }}
                          >
                            <Minus size={10} />
                          </Button>
                        )}
                      </div>
                      {errors.topics?.[index]?.value && (
                        <p className="text-sm text-red-400">
                          {errors.topics[index].value.message}
                        </p>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => topics.append({ value: "" })}
                  >
                    আরো
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="details">কোর্স সম্পর্কে বিস্তারিত</Label>
                  {details.fields.map((field, index) => (
                    <div key={field.id}>
                      <div className="space-y-2">
                        <div className="relative">
                          <Input
                            id="details"
                            type="text"
                            {...register(`details.${index}.question`)}
                          />
                          {index !== 0 && (
                            <Button
                              className="absolute top-0 right-0"
                              variant="ghost"
                              onClick={() => {
                                details.remove(index);
                                unregister(`details.${index}`);
                              }}
                            >
                              <Minus size={10} />
                            </Button>
                          )}
                        </div>
                        <Textarea
                          rows="2"
                          {...register(`details.${index}.answer`)}
                        />
                        {(errors.details?.[index]?.question ||
                          errors.details?.[index]?.answer) && (
                          <p className="text-sm text-red-400">
                            {errors.details?.[index]?.question?.message ||
                              errors.details?.[index]?.answer?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => details.append({ question: "", answer: "" })}
                  >
                    আরো
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="file">ইমেজ</Label>
                  {showSelectedImage && (
                    <Image
                      src={`${showSelectedImage}`}
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
                    <p className="text-sm text-red-400">
                      {errors.file.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">
                    কোর্সটির জন্য যা যা প্রয়োজন
                  </Label>
                  {requirements.fields.map((field, index) => (
                    <div key={field.id} className="space-y-2">
                      <div className="relative">
                        <Input
                          type="text"
                          id="requirements"
                          {...register(`requirements.${index}.value`)}
                        />
                        {index !== 0 && (
                          <Button
                            className="absolute top-0 right-0"
                            variant="ghost"
                            onClick={() => {
                              requirements.remove(index);
                              unregister(`requirements.${index}`);
                            }}
                          >
                            <Minus size={10} />
                          </Button>
                        )}
                      </div>
                      {errors.requirements?.[index]?.value && (
                        <p className="text-sm text-red-400">
                          {errors.requirements[index].value.message}
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => requirements.append({ value: "" })}
                  >
                    আরো
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="knows">কোর্সটির করতে যা জানতে হবে</Label>
                  {knows.fields.map((field, index) => (
                    <div key={field.id} className="space-y-2">
                      <div className="relative">
                        <Input
                          type="text"
                          id="knows"
                          {...register(`knows.${index}.value`)}
                        />
                        {index !== 0 && (
                          <Button
                            className="absolute top-0 right-0"
                            variant="ghost"
                            onClick={() => {
                              knows.remove(index);
                              unregister(`knows.${index}`);
                            }}
                          >
                            <Minus size={10} />
                          </Button>
                        )}
                      </div>
                      {errors.knows?.[index]?.value && (
                        <p className="text-sm text-red-400">
                          {errors.knows[index].value.message}
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => knows.append({ value: "" })}
                  >
                    আরো
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hows">কিভাবে কোর্সটি করবেন?</Label>
                  {hows.fields.map((field, index) => (
                    <div key={field.id} className="space-y-2">
                      <div className="relative">
                        <Textarea
                          rows="2"
                          id="hows"
                          {...register(`hows.${index}.value`)}
                        />
                        {index !== 0 && (
                          <Button
                            className="absolute top-0 right-0"
                            variant="ghost"
                            onClick={() => {
                              hows.remove(index);
                              unregister(`hows.${index}`);
                            }}
                          >
                            <Minus size={10} />
                          </Button>
                        )}
                      </div>
                      {errors.hows?.[index]?.value && (
                        <p className="text-sm text-red-400">
                          {errors.hows[index].value.message}
                        </p>
                      )}
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => hows.append({ value: "" })}
                  >
                    আরো
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">কোর্স ফি</Label>
                  <Input type="text" id="fee" {...register("fee")} />
                  {errors.fee && (
                    <p className="text-sm text-red-400">{errors.fee.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
