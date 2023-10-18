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
    refer: z
      .string()
      .optional()
      .refine(
        (phone) =>
          phone === "" ||
          phone === undefined ||
          /^(01[3456789]\d{8})$/.test(phone),
        {
          message: "সঠিক মোবাইল নাম্বার ইনপুট করুন।",
        }
      ),
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

// forgot password form validation
export const ForgotPasswordSchema = z
  .object({
    password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে আট অক্ষরের হতে হবে।"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "অবশ্যই উপরের পাসওয়ার্ডে সাথে মিলতে হবে।",
    path: ["confirmPassword"],
  });

// login form validation
export const LoginSchema = z.object({
  phone: z
    .string()
    .min(1, "মোবাইল নাম্বার ইনপুট করুন।")
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন।"),
  password: z.string().min(1, "পাসওয়ার্ড ইনপুট করুন।"),
});

// final user sign up data submit form validation
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

// course submit form validation
export const CourseSchema = z.object({
  title: z.string().min(1, "কোর্স টাইটেল ইনপুট করুন।"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "সঠিক স্লাগ ইনপুট করুন।"),
  excerpt: z.string().min(1, "ছোট বিবরণ ইনপুট করুন।"),
  description: z.string().min(1, "বিবরণ ইনপুট করুন।"),
  topics: z.array(
    z.object({
      value: z.string().min(1, "কোর্সে শিক্ষানীয় বিষয় ইনপুট করুন।"),
    })
  ),
  details: z.array(
    z.object({
      question: z.string().min(1, "কোর্সের বিস্তারিত ইনপুট করুন।"),
      answer: z.string().min(1, "কোর্সের বিস্তারিত ইনপুট করুন।"),
    })
  ),
  requirements: z.array(
    z.object({
      value: z.string().min(1, "কোর্স করতে প্রয়োজনীয় বিষয় ইনপুট করুন।"),
    })
  ),
  knows: z.array(
    z.object({
      value: z.string().min(1, "কোর্স করতে জ্ঞাত বিষয় ইনপুট করুন।"),
    })
  ),
  hows: z.array(
    z.object({
      value: z.string().min(1, "কোর্সটি কিভাবে করবে তা ইনপুট করুন।"),
    })
  ),
  fee: z
    .string()
    .min(1, "কোর্স ফি ইনপুট করুন।")
    .refine((value) => !isNaN(value), {
      message: "কোর্স ফি নাম্বারে ইনপুট করুন।",
    }),
});

// course image form validation
export const CourseImageSchema = z.object({
  file: z.any().refine(
    (file) => {
      if (!file) {
        return false;
      }
      if (!file.type.startsWith("image/") || file.size > 1 * 1024 * 1024) {
        return false;
      }
      return true;
    },
    {
      message: "ইমেজ টাইপ (jpg, jpeg, png or svg) এবং সাইজ 1MB এর কম হতে হবে।",
    }
  ),
});

// password change form validation
export const ChangePasswordSchema = z
  .object({
    prevPassword: z.string().min(8, "পাসওয়ার্ড কমপক্ষে আট অক্ষরের হতে হবে"),
    newPassword: z.string().min(8, "নতুন পাসওয়ার্ড কমপক্ষে আট অক্ষরের হতে হবে"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "অবশ্যই উপরের পাসওয়ার্ডে সাথে মিলতে হবে",
    path: ["confirmPassword"],
  });

export const EnrollSchema = z
  .object({
    paymentMethod: z.enum(["bkash", "nagad", "rocket", "cash"]),
    transactionId: z.string().optional(),
    amount: z
      .string()
      .optional()
      .refine((value) => !isNaN(value), {
        message: "পেমেন্ট অ্যামাউন্ট সংখ্যা হতে হবে",
      }),
  })
  .refine(
    (data) => {
      return data.paymentMethod === "cash" || !!data.transactionId;
    },
    {
      path: ["transactionId"],
      message: "ট্রানজেকশন আইডি ইনপুট করুন",
    }
  )
  .refine(
    (data) => {
      return data.paymentMethod === "cash" || !!data.amount;
    },
    {
      path: ["amount"],
      message: "পেমেন্ট অ্যামাউন্ট ইনপুট করুন",
    }
  );
