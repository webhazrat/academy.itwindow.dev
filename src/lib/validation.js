import { z } from "zod";

export const OtpSendSchema = z.object({
  phone: z
    .string()
    .min(1, "মোবাইল নাম্বার ইনপুট করুন।")
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন।"),
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

export const LoginSchema = z.object({
  phone: z
    .string()
    .min(1, "মোবাইল নাম্বার ইনপুট করুন।")
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন।"),
  password: z.string().min(1, "পাসওয়ার্ড ইনপুট করুন।"),
});

export const UserSchema = z.object({
  name: z.string().min(1, "পুরো নাম ইনপুট করুন।"),
  email: z.string().email("সঠিক ইমেল অ্যাড্রেস ইনপুট করুন।"),
  address: z.string().min(1, "বর্তমান ঠিকানা ইনপুট করুন।"),
  guardian: z.string().min(1, "অভিভাবকের ইনপুট করুন।"),
  guardianPhone: z
    .string()
    .min(1, "অভিভাবকের মোবাইল নাম্বার ইনপুট করুন।")
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন।"),
  education: z.string().min(1, "সর্বশেষ শিক্ষাগত যোগ্যতা ইনপুট করুন।"),
  institute: z.string().min(1, "প্রতিষ্ঠানের নাম ইনপুট করুন।"),
});
