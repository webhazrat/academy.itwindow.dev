import connectDB from "@/src/lib/connect";
import { generateOTP, sendSMS } from "@/src/lib/helpers";
import { OtpSendSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import { z } from "zod";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      OtpSendSchema.parse(req.body);
      const { phone } = req.body;
      await connectDB();
      const userExist = await userModel.countDocuments({
        phone,
        status: "verified",
      });
      if (userExist) {
        return res.status(400).json({
          errors: [
            {
              field: "phone",
              message: "এই নাম্বার ব্যবহার করে পূর্বেই অ্যাকাউন্ট করা আছে।",
            },
          ],
        });
      } else {
        const genOTP = generateOTP();
        const otp = bcrypt.hashSync(genOTP, 8);

        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        await userModel.updateOne(
          { phone },
          { otp, otpExpires },
          { upsert: true }
        );

        // send to phone also
        const send = await sendSMS(
          `88${phone}`,
          `Your phone verification OTP is ${genOTP}`
        );
        if (send.code !== "ok") {
          return res.status(400).json({
            errors: [
              {
                field: "phone",
                message: "দুঃখিত! মোবাইল নাম্বারটি চেক করে আবার চেষ্টা করুন",
              },
            ],
          });
        }

        return res.status(200).json({
          status: 200,
          data: { phone },
        });
      }
    } catch (error) {
      console.log({ otpSendCatch: error });
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
