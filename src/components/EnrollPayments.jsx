import useSWR from "swr";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { fetcher, statusColor, total } from "../lib/utils";
import { Input } from "./ui/input";
import { Loader2, Pencil, Plus } from "lucide-react";
import { Button } from "./ui/button";
import Label from "./Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentSchema } from "../lib/validation";
import { useToast } from "./ui/use-toast";
import Image from "next/image";
import { format } from "date-fns";

export default function EnrollPayments({ enroll, setEnroll, enrollMutate }) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    data: {},
    type: "",
  });
  const { data, isLoading, mutate } = useSWR(
    `/api/payment/enroll?enrollId=${enroll._id}`,
    fetcher
  );
  const payments = data?.data;

  // create and update form
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(PaymentSchema),
  });

  // enroll status form
  const { control: control2, handleSubmit: handleSubmit2 } = useForm({
    defaultValues: {
      status: enroll.status,
    },
  });

  const totalPayment = total(payments, "Approved");

  const handlePaymentSubmit = async (data) => {
    if (form.type === "update") {
      try {
        const response = await fetch(
          `/api/payment/update?id=${form.data._id}`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
          mutate();
          clearErrors();
          setForm({ data: "", type: "" });
        }
      } catch (error) {
        console.log({ accountUpdateCatch: error });
      }
    }

    if (form.type === "create") {
      (data.enrollId = enroll._id), (data.userId = enroll.userId._id);
      try {
        const response = await fetch(`/api/payment/create`, {
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
          clearErrors();
          setForm({ data: "", type: "" });
        }
      } catch (error) {
        console.log({ accountCreateCatch: error });
      }
    }
  };

  const handleForm = (data, type) => {
    setForm({ data, type });
    if (type === "update") {
      reset(data);
    } else {
      reset({
        paymentMethod: "",
        transactionId: "",
        amount: "",
        status: "",
        comment: "",
      });
    }
  };

  // enroll status update method
  const handleStatusSubmit = async (data) => {
    try {
      const response = await fetch(`/api/enroll/update?id=${enroll._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updateResponse = await response.json();
      if (response.ok) {
        enrollMutate();
        setEnroll(null);
        toast({
          variant: "success",
          title: updateResponse.title,
          description: updateResponse.message,
        });
      }
    } catch (error) {
      console.log({ enrollStatusUpdateCatch: error });
    }
  };

  return (
    <Dialog open={enroll} onOpenChange={setEnroll}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-7 pb-0">
          <DialogTitle>ইনরোল বিবরণ</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(100vh_-_100px)] h-full">
          <div className="p-7 space-y-5">
            <div className="grid grid-cols-[7fr_5fr]">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src={`/uploads/${enroll.userId.image}`}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="dark:text-slate-400">নাম:</span>{" "}
                    {enroll.userId.name}
                  </p>
                  <p>
                    <span className="dark:text-slate-400">মোবাইল নাম্বার:</span>{" "}
                    {enroll.userId.phone}
                  </p>
                  <p>
                    <span className="dark:text-slate-400">ঠিকানা:</span>{" "}
                    {enroll.userId.address}
                  </p>
                  <p>
                    <span className="dark:text-slate-400">
                      সর্বশেষ শিক্ষাগত যোগ্যতা:
                    </span>{" "}
                    {enroll.userId.education}
                  </p>
                  <p>
                    <span className="dark:text-slate-400">প্রতিষ্ঠান:</span>{" "}
                    {enroll.userId.institute}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-between">
                <div className="space-y-1">
                  <p>
                    <span className="dark:text-slate-400">কোর্স:</span>{" "}
                    {enroll.courseId.title}
                  </p>
                  <p>
                    <span className="dark:text-slate-400">ফি:</span> ৳
                    {enroll.fee}
                  </p>
                </div>

                <div className="space-y-3">
                  <form onSubmit={handleSubmit2(handleStatusSubmit)}>
                    <div className="flex gap-3">
                      <Controller
                        name="status"
                        control={control2}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="Ended">Ended</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-gradient text-white"
                      >
                        আপডেট
                      </Button>
                    </div>
                  </form>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      onClick={() => handleForm("", "")}
                      variant="ghost"
                    >
                      বাতিল
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleForm("", "create")}
                      variant="outline"
                    >
                      <Plus size={14} className="mr-2" /> পেমেন্ট
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {form.type && (
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handlePaymentSubmit)}
              >
                <div className="grid lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">পেমেন্ট মেথড</Label>
                    <Controller
                      name="paymentMethod"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Select
                            id="paymentMethod"
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Bkash">Bkash</SelectItem>
                                <SelectItem value="Nagad">Nagad</SelectItem>
                                <SelectItem value="Rocket">Rocket</SelectItem>
                                <SelectItem value="Cash">Cash</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        );
                      }}
                    />
                    {errors.paymentMethod && (
                      <p className="text-sm text-red-400">
                        {errors.paymentMethod.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transactionId">ট্রানজেকশন আইডি</Label>
                    <Controller
                      name="transactionId"
                      control={control}
                      render={({ field }) => (
                        <Input id="transactionId" type="text" {...field} />
                      )}
                    />
                    {errors.transactionId && (
                      <p className="text-sm text-red-400">
                        {errors.transactionId.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">অ্যামাউন্ট</Label>
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => {
                        return <Input id="amount" type="text" {...field} />;
                      }}
                    />
                    {errors.amount && (
                      <p className="text-sm text-red-400">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="status">স্ট্যাটাস</Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="status"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Canceled">Canceled</SelectItem>
                              <SelectItem value="Approved">Approved</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment">কমেন্ট</Label>
                  <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => <Textarea id="comment" {...field} />}
                  />
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
                    {form.type === "create" ? "সাবমিট" : "আপডেট"}
                  </Button>
                </div>
              </form>
            )}

            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b p-2 pr-0"></td>
                  <td className="border-b p-2 pl-0">তারিখ</td>
                  <td className="border-b p-2">মেথড</td>
                  <td className="border-b p-2">ট্রানজেকশন আইডি</td>
                  <td className="border-b p-2">স্ট্যাটাস</td>
                  <td className="border-b p-2">কমেন্ট</td>
                  <td className="border-b p-2">অ্যামাউন্ট</td>
                </tr>
              </thead>
              <tbody className="dark:text-slate-400">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="border-b py-3 text-center text-sm"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : payments.length > 0 ? (
                  <>
                    {payments.map((payment) => (
                      <tr
                        key={payment._id}
                        className={`text-sm ${
                          payment._id === form.data._id &&
                          "bg-slate-50 dark:bg-slate-800"
                        }`}
                      >
                        <td className="border-b p-2">
                          <Button
                            disabled={payment._id === form.data._id}
                            type="button"
                            onClick={() => handleForm(payment, "update")}
                            size="sm"
                            variant="outline"
                            className="p-0 h-7 w-7"
                          >
                            <Pencil size={12} />
                          </Button>
                        </td>
                        <td className="border-b py-2">
                          {format(new Date(payment.createdAt), "PPP")}
                        </td>
                        <td className="border-b p-2">
                          {payment.paymentMethod}
                        </td>
                        <td className="border-b p-2">
                          {payment.transactionId}
                        </td>
                        <td
                          className={`border-b p-2 ${statusColor(
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </td>
                        <td className="border-b p-2">{payment.comment}</td>
                        <td className="border-b p-2 text-right">
                          {payment.amount}
                        </td>
                      </tr>
                    ))}
                    <tr className="text-white">
                      <td colSpan={5}></td>
                      <td className="border-b p-2 text-right">
                        মোট পেইড{" "}
                        <span>({(totalPayment / enroll.fee) * 100}%)</span>
                      </td>
                      <td className="border-b p-2 text-right">
                        {totalPayment}
                      </td>
                    </tr>
                    <tr className="text-white">
                      <td colSpan={5}></td>
                      <td className="p-2 text-right">পাওনা</td>
                      <td className="p-2 text-right">
                        {enroll.fee - totalPayment}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="border-b py-3 text-center text-sm"
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
