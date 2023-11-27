import useSWR from "swr";
import Layout from "../components/Layout";
import { fetcher } from "../lib/utils";
import Label from "../components/Label";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParticipantSchema } from "../lib/validation";
import { useToast } from "../components/ui/use-toast";

export default function Seminar() {
  const { toast } = useToast();
  const { data: seminarsData } = useSWR(
    `/api/seminars?status=Published&pageSize=3&sortBy=createdAt&sortOrder=asc`,
    fetcher
  );
  const seminars = seminarsData?.data;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(ParticipantSchema),
  });

  const handleParticipant = async (data) => {
    data.seminarId = seminars[0]._id;
    try {
      const response = await fetch("/api/participant/create", {
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
        toast({
          variant: "destructive",
          title: createResponse.title,
          description: createResponse.message,
        });
      } else {
        toast({
          variant: "success",
          title: createResponse.title,
          description: createResponse.message,
        });
        reset();
        clearErrors();
      }
    } catch (error) {
      console.log({ participantCreateCatch: error });
    }
  };

  return (
    <>
      <Layout border>
        <div className="container my-20">
          <div className="max-w-3xl space-y-3">
            {seminars?.length > 0 ? (
              <div>
                <h1>{seminars?.[0]?.shortDescription}</h1>
                <p className="dark:text-slate-400">
                  {seminars?.[0]?.description}
                </p>

                <form
                  className="space-y-4"
                  onSubmit={handleSubmit(handleParticipant)}
                >
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        নাম <span className="text-red-400">*</span>
                      </Label>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input type="text" id="name" {...field} />
                        )}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        মোবাইল নাম্বার <span className="text-red-400">*</span>
                      </Label>
                      <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input type="text" id="phone" {...field} />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-400">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">
                        ঠিকানা <span className="text-red-400">*</span>
                      </Label>
                      <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input type="text" id="address" {...field} />
                        )}
                      />
                      {errors.address && (
                        <p className="text-sm text-red-400">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">পেশা</Label>
                      <Controller
                        name="occupation"
                        control={control}
                        render={({ field }) => (
                          <Input type="text" id="occupation" {...field} />
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">
                        সর্বশেষ শিক্ষাগত যোগ্যতা
                      </Label>
                      <Controller
                        name="education"
                        control={control}
                        render={({ field }) => (
                          <Input type="text" id="education" {...field} />
                        )}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="institute">প্রতিষ্ঠান</Label>
                      <Controller
                        name="institute"
                        control={control}
                        render={({ field }) => (
                          <Input type="text" id="institute" {...field} />
                        )}
                      />
                    </div>
                  </div>
                  <p className="dark:text-slate-400 text-sm">
                    [নোট: যদি পেশা স্টুডেন্ট হয় তাহলে প্রতিষ্ঠান হবে আপনার
                    শিক্ষা প্রতিষ্ঠান। আর যদি পেশা চাকরি বা অন্য কিছু হয় তাহলে
                    প্রতিষ্ঠান হবে আপনি যে প্রতিষ্ঠানে কর্মরত।]
                  </p>
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient text-white"
                    >
                      {isSubmitting && (
                        <Loader2 size={16} className="mr-2 animate-spin" />
                      )}{" "}
                      রেজিস্ট্রেশন
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <h1>কোন সেমিনার চলমান নাই।</h1>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
