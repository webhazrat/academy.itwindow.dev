import { z } from "zod";

export const OtpSendSchema = z.object({
  phone: z
    .string()
    .min(1, "মোবাইল নাম্বার ইনপুট করুন।")
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন"),
});

export const UserRegisterSchema = z
  .object({
    name: z.string().min(1, "পুরো নাম ইনপুট করুন।"),
    password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে আট অক্ষরের হতে হবে।"),
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .default(false)
      .refine((data) => data === true, {
        message: "আপনাকে অবশ্যই শর্তাবলী মেনে নিতে হবে।",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "অবশ্যই উপরের পাসওয়ার্ডে সাথে মিলতে হবে।",
    path: ["confirmPassword"],
  });
