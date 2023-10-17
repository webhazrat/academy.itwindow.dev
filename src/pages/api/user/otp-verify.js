import connectDB from "@/src/lib/connect";
import { generateToken } from "@/src/lib/helpers";
import userModel from "@/src/models/userModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { phone, otp } = req.body;
      await connectDB();

      // otp expires check
      const user = await userModel.findOne({ phone });
      if (user && user.otpExpires < new Date()) {
        return res.status(400).json({
          errors: [
            {
              field: "otp",
              message: "OTP টির মেয়াদ শেষ হয়ে গেছে।",
            },
          ],
        });
      }

      // otp match with user otp
      if (otp !== user.otp) {
        return res.status(400).json({
          errors: [
            {
              field: "otp",
              message: "OTP টি সঠিক নয়।",
            },
          ],
        });
      }

      // otp verify token generate and save to database
      const token = generateToken();
      user.token = token;
      await user.save();

      // final success response
      return res.status(200).json({
        status: 200,
        data: { phone, token },
        title: "সফল!",
        message: "OTP সঠিকভাবে ভেরিফাই হয়েছে।",
      });
    } catch (error) {
      console.log({ otpVerifyCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
