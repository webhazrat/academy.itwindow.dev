import connectDB from "@/src/lib/connect";
import { generateOTP, sendSMS } from "@/src/lib/helpers";
import { OtpSendSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      OtpSendSchema.parse(req.body);
      const { phone } = req.body;
      await connectDB();

      // user exist check
      const userExist = await userModel.countDocuments({
        phone,
        status: "verified",
      });
      if (!userExist) {
        return res.status(400).json({
          errors: [
            {
              field: "phone",
              message:
                "মোবাইল নাম্বার টি ব্যবহার করে কোন অ্যাকাউন্ট করা হয় নাই।",
            },
          ],
        });
      }

      // otp generate, hash then update or insert to database
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
      await userModel.updateOne({ phone }, { otp, otpExpires });

      // send otp to phone also
      const send = await sendSMS(
        `88${phone}`,
        `Your phone verification OTP is ${otp}`
      );
      if (send.code !== "ok") {
        return res.status(400).json({
          errors: [
            {
              field: "phone",
              message: "দুঃখিত! মোবাইল নাম্বারটি চেক করে আবার চেষ্টা করুন।",
            },
          ],
        });
      }

      // final success response
      return res.status(200).json({
        status: 200,
        data: { phone },
        tile: "সফল!",
        message: `${phone} মোবাইল নাম্বারে OTP পাঠানো হয়েছে`,
      });
    } catch (error) {
      console.log({ otpSendCatch: error });
      // OtpSendSchema zod validation error
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
