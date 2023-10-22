import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseSchema } from "../lib/validation";
import Label from "./Label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Minus } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function CourseUpdate({ course, setCourse, mutate }) {
  const { toast } = useToast();
  const {
    control,
    register,
    unregister,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(CourseSchema),
    defaultValues: course,
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

  const handleCourseUpdate = async (data) => {
    try {
      const response = await fetch(`/api/course/update?id=${course._id}`, {
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
        setCourse(null);
        mutate();
        clearErrors();
      }
    } catch (error) {
      console.log({ courseUpdateCatch: error });
    }
  };

  return (
    <Dialog open={course} onOpenChange={setCourse}>
      <DialogContent className="max-w-5xl p-0">
        <DialogHeader className="p-7">
          <DialogTitle>কোর্স আপডেট</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCourseUpdate)}>
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
          <ScrollArea className="max-h-[calc(100vh_-_200px)] h-full mb-16">
            <div className="grid lg:grid-cols-2 gap-5 p-7 pt-0">
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
                            className={`${index !== 0 && "pr-12"}`}
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
                              className={`${index !== 0 && "pr-12"}`}
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
                      onClick={() =>
                        details.append({ question: "", answer: "" })
                      }
                    >
                      আরো
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-5">
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
                            className={`${index !== 0 && "pr-12"}`}
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
                            className={`${index !== 0 && "pr-12"}`}
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
                            className={`${index !== 0 && "pr-12"}`}
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
                      <p className="text-sm text-red-400">
                        {errors.fee.message}
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
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Published">
                                Published
                              </SelectItem>
                              <SelectItem value="Unpublished">
                                Unpublished
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">অর্ডার</Label>
                    <Input type="number" id="order" {...register("order")} />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
}
