import connectDB from "@/src/lib/connect";
import { UserRegisterSchema } from "@/src/lib/validation";
import userModel from "@/src/models/userModel";
import bcrypt from "bcryptjs";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      UserRegisterSchema.parse(req.body);
      const { phone, token, name, password, refer } = req.body;
      await connectDB();
      const hashPassword = bcrypt.hashSync(password, 8);

      // user exist check with phone
      const user = await userModel
        .findOne({
          phone,
        })
        .select("status token");
      if (user.status === "verified") {
        return res.status(400).json({
          errors: [
            {
              field: "common",
              message:
                "মোবাইল নাম্বার টি ব্যবহার করে পূর্বেই অ্যাকাউন্ট করা হয়েছে।",
            },
          ],
        });
      }

      if (user.token !== token) {
        return res.status(400).json({
          errors: [
            {
              field: "common",
              message: "সঠিক OTP ভেরিফাই টোকেন ইনপুট করুন।",
            },
          ],
        });
      }

      // if has refer
      let userId = null;
      if (refer) {
        const user = await userModel.findOne({ phone: refer }).select("_id");
        if (!user) {
          return res.status(400).json({
            errors: [
              {
                field: "refer",
                message:
                  "মোবাইল নাম্বার টি ব্যবহার করে কোন অ্যাকাউন্ট না থাকায় রেফারেল হিসেবে ব্যবহার করা যাবে না।",
              },
            ],
          });
        }
        userId = user._id;
      }

      // user data update with phone and token
      await userModel.updateOne(
        { phone, token },
        {
          $set: {
            name,
            password: hashPassword,
            refer: userId,
            status: "verified",
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
        message: "অ্যাকাউন্ট সঠিকভাবে তৈরি হয়েছে।",
      });
    } catch (error) {
      console.log({ userRegisterCatch: error });
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
