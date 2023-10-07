import connectDB from "@/src/lib/connect";
import userModel from "@/src/models/userModel";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { _id, phone, otp, name, password } = req.body;
    try {
      await connectDB();
      const hashPassword = bcrypt.hashSync(password, 8);
      const user = await userModel.updateOne(
        { _id, phone, otp },
        { $set: { name, password: hashPassword, status: "verified" } }
      );
      if (user) {
        res.status(200).json({
          status: 200,
          message: "অভিনন্দন! অ্যাকাউন্ট সঠিকভাবে তৈরি হয়েছে।",
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "দুঃখিত! অ্যাকাউন্ট তৈরিতে সমস্যা, আবার চেষ্টা করুন।",
        });
      }
    } catch (err) {
      console.log({ otpVerifyCatch: err });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
