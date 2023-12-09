import * as z from "zod";

export const OtpSendSchema = z.object({
  phone: z
    .string()
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন"),
});

export const UserRegisterSchema = z
  .object({
    name: z
      .string()
      .refine((data) => data.trim() !== "", { message: "পুরো নাম ইনপুট করুন" }),
    password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে আট অক্ষরের হতে হবে"),
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
          message: "সঠিক মোবাইল নাম্বার ইনপুট করুন",
        }
      ),
    terms: z
      .boolean()
      .default(false)
      .refine((data) => data === true, {
        message: "আপনাকে অবশ্যই শর্তাবলী মেনে নিতে হবে",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "অবশ্যই উপরের পাসওয়ার্ডে সাথে মিলতে হবে",
    path: ["confirmPassword"],
  });

// forgot password form validation
export const ForgotPasswordSchema = z
  .object({
    password: z.string().min(8, "পাসওয়ার্ড কমপক্ষে আট অক্ষরের হতে হবে"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "অবশ্যই উপরের পাসওয়ার্ডে সাথে মিলতে হবে",
    path: ["confirmPassword"],
  });

// login form validation
export const LoginSchema = z.object({
  phone: z
    .string()
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন"),
  password: z
    .string()
    .refine((data) => data.trim() !== "", { message: "পাসওয়ার্ড ইনপুট করুন" }),
});

// user profile update
export const UserSchema = z.object({
  name: z
    .string()
    .refine((data) => data.trim() !== "", { message: "পুরো নাম ইনপুট করুন" }),
  email: z
    .string()
    .refine(
      (data) => data === "" || z.string().email().safeParse(data).success,
      {
        message: "সঠিক ইমেল অ্যাড্রেস ইনপুট করুন।",
      }
    )
    .optional(),
  address: z.string().refine((data) => data.trim() !== "", {
    message: "বর্তমান ঠিকানা ইনপুট করুন",
  }),
  guardian: z
    .string()
    .refine((data) => data.trim() !== "", { message: "অভিভাবকের ইনপুট করুন" }),
  guardianPhone: z
    .string()
    .regex(/^(01[3456789]\d{8})$/, "অভিভাবকের সঠিক মোবাইল নাম্বার ইনপুট করুন"),
  education: z.string().refine((data) => data.trim() !== "", {
    message: "সর্বশেষ শিক্ষাগত যোগ্যতা ইনপুট করুন",
  }),
  institute: z.string().refine((data) => data.trim() !== "", {
    message: "প্রতিষ্ঠানের নাম ইনপুট করুন",
  }),
});

// course submit form validation
export const CourseSchema = z.object({
  title: z.string().min(1, "কোর্স টাইটেল ইনপুট করুন"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "সঠিক স্লাগ ইনপুট করুন"),
  excerpt: z.string().min(1, "ছোট বিবরণ ইনপুট করুন"),
  description: z.string().min(1, "বিবরণ ইনপুট করুন"),
  topics: z.array(
    z.object({
      value: z.string().min(1, "কোর্সে শিক্ষানীয় বিষয় ইনপুট করুন"),
    })
  ),
  details: z.array(
    z.object({
      question: z.string().min(1, "কোর্সের বিস্তারিত ইনপুট করুন"),
      answer: z.string().min(1, "কোর্সের বিস্তারিত ইনপুট করুন"),
    })
  ),
  requirements: z.array(
    z.object({
      value: z.string().min(1, "কোর্স করতে প্রয়োজনীয় বিষয় ইনপুট করুন"),
    })
  ),
  knows: z.array(
    z.object({
      value: z.string().min(1, "কোর্স করতে জ্ঞাত বিষয় ইনপুট করুন"),
    })
  ),
  hows: z.array(
    z.object({
      value: z.string().min(1, "কোর্সটি কিভাবে করবে তা ইনপুট করুন"),
    })
  ),
  fee: z
    .string()
    .min(1, "কোর্স ফি ইনপুট করুন")
    .refine((value) => !isNaN(value), {
      message: "কোর্স ফি নাম্বারে ইনপুট করুন",
    }),
  prevFee: z.string().optional(),
  status: z.string().optional(),
  order: z.string().optional(),
});

// course image form validation
export const CourseImageSchema = z.object({
  icon: z.any().refine(
    (icon) => {
      if (
        icon &&
        (!icon.type.startsWith("image/") || icon.size > 1 * 1024 * 1024)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "আইকন টাইপ (jpg, jpeg, png or svg) এবং সাইজ 1MB এর কম হতে হবে",
    }
  ),
  image: z.any().refine(
    (image) => {
      if (
        image &&
        (!image.type.startsWith("image/") || image.size > 1 * 1024 * 1024)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "ইমেজ টাইপ (jpg, jpeg, png or svg) এবং সাইজ 1MB এর কম হতে হবে",
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

// enroll request in a course
export const PaymentSchema = z
  .object({
    paymentMethod: z
      .string()
      .refine((value) => ["Bkash", "Nagad", "Rocket", "Cash"].includes(value), {
        message: "সঠিক পেমেন্ট পদ্ধতি নির্বাচন করুন",
      }),
    transactionId: z.string().optional(),
    amount: z
      .string()
      .optional()
      .refine((value) => !isNaN(value), {
        message: "পেমেন্ট অ্যামাউন্ট সংখ্যা হতে হবে",
      }),
    status: z.string().optional(),
    comment: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.paymentMethod === "Cash" || !!data.transactionId;
    },
    {
      path: ["transactionId"],
      message: "ট্রানজেকশন আইডি ইনপুট করুন",
    }
  )
  .refine(
    (data) => {
      return !!data.amount;
    },
    {
      path: ["amount"],
      message: "পেমেন্ট অ্যামাউন্ট ইনপুট করুন",
    }
  );

// batch create schema validation
export const BatchSchema = z.object({
  courseId: z.string().min(1, "কোর্স আইডি ইনপুট করুন"),
  code: z.string().min(1, "ব্যাচ কোড ইনপুট করুন"),
  days: z
    .array(
      z.enum([
        "শনিবার",
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
      ])
    )
    .refine(
      (data) => {
        return data.length > 0;
      },
      {
        message: "কমপক্ষে একটি দিন সিলেক্ট করুন",
      }
    ),
  startDate: z.date().nullable(),
  time: z.string().refine(
    (data) => {
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return timeRegex.test(data);
    },
    { message: "সঠিক টাইম ফরমেট (HH:mm) ইনপুট করুন" }
  ),
  status: z.string().optional(),
});

// add bacth id to enroll
export const BatchEnrollSchema = z.object({
  enrollId: z.string().min(1, "ইনরোল আইডি ইনপুট করুন"),
});

// feedback create validation
export const FeedbackSchema = z.object({
  star: z
    .string()
    .refine((value) => ["1", "2", "3", "4", "5"].includes(value), {
      message: "স্টার 1-5 হতে হবে",
    }),
  comment: z.string().min(1, { message: "কমেন্ট ইনপুট করুন" }),
  status: z.string().optional(),
});

// seminar create validation
export const SeminarSchema = z.object({
  title: z.string().refine((data) => data.trim() !== "", {
    message: "সেমিনার টাইটেল ইনপুট করুন",
  }),
  shortDescription: z.string().refine((data) => data.trim() !== "", {
    message: "শর্ট ডেসক্রিপশন ইনপুট করুন",
  }),
  description: z.string().refine((data) => data.trim() !== "", {
    message: "ডেসক্রিপশন ইনপুট করুন",
  }),
  status: z.string().optional(),
});

// participant create validation
export const ParticipantSchema = z.object({
  name: z.string().refine((data) => data.trim() !== "", {
    message: "নাম ইনপুট করুন",
  }),
  phone: z
    .string()
    .regex(/^(01[3456789]\d{8})$/, "সঠিক মোবাইল নাম্বার ইনপুট করুন"),
  address: z.string().refine((data) => data.trim() !== "", {
    message: "ঠিকানা ইনপুট করুন",
  }),
  occupation: z.string().optional(),
  education: z.string().optional(),
  institute: z.string().optional(),
});
