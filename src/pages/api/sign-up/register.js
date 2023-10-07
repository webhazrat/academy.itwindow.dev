import connectDB from "@/src/lib/connect";
import { UserRegisterSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      UserRegisterSchema.parse(req.body);
      const { phone, otp, name, password } = req.body;
      await connectDB();
      const hashPassword = bcrypt.hashSync(password, 8);

      const userExist = await userModel.findOne({
        phone,
        status: "verified",
      });
      if (userExist) {
        res.status(400).json({
          errors: [
            {
              field: "common",
              message:
                "এই মোবাইল নাম্বার ব্যবহার করে পূর্বেই অ্যাকাউন্ট করা হয়েছে।",
            },
          ],
        });
      } else {
        const user = await userModel.updateOne(
          { phone, otp },
          {
            $set: { name, password: hashPassword, status: "verified" },
            $unset: {
              otp: 1,
              otpExpires: 1,
            },
          }
        );
        res.status(200).json({
          status: 200,
          message: "অভিনন্দন! অ্যাকাউন্ট সঠিকভাবে তৈরি হয়েছে।",
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
        console.log({ otpVerifyCatch: error });
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
