import connectDB from "@/src/lib/connect";
import { UserRegisterSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      UserRegisterSchema.parse(req.body);
      const { phone, otp, name, password, refer } = req.body;
      await connectDB();
      const hashPassword = bcrypt.hashSync(password, 8);
      const userExist = await userModel.countDocuments({
        phone,
        status: "verified",
      });
      if (userExist) {
        return res.status(400).json({
          errors: [
            {
              field: "common",
              message:
                "এই মোবাইল নাম্বার ব্যবহার করে পূর্বেই অ্যাকাউন্ট করা হয়েছে।",
            },
          ],
        });
      } else {
        let userId = "";
        if (refer) {
          const user = await userModel.findOne({ phone: refer }).select("_id");
          if (!user) {
            return res.status(400).json({
              errors: [
                {
                  field: "refer",
                  message:
                    "এই মোবাইল নাম্বার ব্যবহার করে কোন অ্যাকাউন্ট না থাকায় রেফারেল হিসেবে ব্যবহার করা যাবে না।",
                },
              ],
            });
          }
          userId = user._id;
        }

        await userModel.updateOne(
          { phone, otp },
          {
            $set: {
              name,
              password: hashPassword,
              refer: userId,
              role: "general",
              status: "verified",
            },
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
      console.log({ otpVerifyCatch: error });
      // UserRegisterSchema for zodError
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
