import connectDB from "@/src/lib/connect";
import { generateOTP, sendOtpToPhone, storeOtp } from "@/src/lib/helpers";
import { OtpSendSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { phone } = OtpSendSchema.parse(req.body);

      await connectDB();
      const userExist = await userModel.findOne({ phone, status: "verified" });
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
        const otp = generateOTP();

        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        await userModel.updateOne(
          { phone },
          { otp, otpExpires },
          { upsert: true }
        );

        // send to phone also
        await sendOtpToPhone(phone, otp);

        return res.status(200).json({
          status: 200,
          data: { phone, otp },
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      } else {
        console.log({ otpSendCatch: error });
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
