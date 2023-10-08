import connectDB from "@/src/lib/connect";
import { LoginSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import { z } from "zod";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      LoginSchema.parse(req.body);
      const { phone, password } = req.body;
      await connectDB();
      const user = await userModel.findOne({ phone });
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
          return res.status(400).json({
            errors: [
              {
                field: "common",
                message: "মোবাইল ও পাসওয়ার্ড মিল হচ্ছে না।",
              },
            ],
          });
        } else {
          return res.status(200).json(user);
        }
      } else {
        return res.status(400).json({
          errors: [
            {
              field: "phone",
              message: "এই নাম্বার ব্যবহার করে কোন অ্যাকাউন্ট নাই।",
            },
          ],
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
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
