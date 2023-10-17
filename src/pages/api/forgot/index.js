import connectDB from "@/src/lib/connect";
import { ChangePasswordSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      ChangePasswordSchema.parse(req.body);
      const { phone, token, password } = req.body;
      await connectDB();
      const hashPassword = bcrypt.hashSync(password, 8);
      await userModel.updateOne(
        { phone, token },
        {
          $set: {
            password: hashPassword,
          },
          $unset: {
            otp: 1,
            otpExpires: 1,
            token: 1,
          },
        }
      );
      res.status(200).json({
        status: 200,
        title: "অভিনন্দন!",
        message: "পাসওয়ার্ড সঠিকভাবে পরিবর্তন হয়েছে।",
      });
    } catch (error) {
      console.log({ forgotCatch: error });
      // ChangePasswordSchema zod validation error
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
