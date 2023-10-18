import connectDB from "@/src/lib/connect";
import { ChangePasswordSchema } from "@/src/lib/validation";
import { checkLogin } from "@/src/middleware/serverAuth";
import userModel from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkLogin(req, res);
      ChangePasswordSchema.parse(req.body);
      const { prevPassword, newPassword } = req.body;
      await connectDB();
      const user = await userModel
        .findById(session.user._id)
        .select("password");
      const isValid = bcrypt.compareSync(prevPassword, user.password);
      if (!isValid) {
        return res.status(400).json({
          errors: [
            {
              field: "prevPassword",
              message: "পাসওয়ার্ড মিল হচ্ছে না, সঠিক পাওয়ার্ড ইনপুট করুন",
            },
          ],
        });
      }
      const hashPassword = bcrypt.hashSync(newPassword, 8);
      await userModel.updateOne(
        { _id: session.user._id },
        {
          $set: {
            password: hashPassword,
          },
        }
      );
      res.status(200).json({
        status: 200,
        title: "অভিনন্দন!",
        message: "পাসওয়ার্ড সঠিকভাবে পরিবর্তন হয়েছে",
      });
    } catch (error) {
      console.log({ changePasswordCatch: error });
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
