import connectDB from "@/src/lib/connect";
import userModel from "@/src/models/userModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { phone, otp } = req.body;
    try {
      await connectDB();
      const userExist = await userModel.findOne({ phone });
      if (!userExist) {
        return res.status(400).json({
          errors: [
            {
              field: "otp",
              message: "এই নাম্বার ব্যবহার করে কোন অ্যাকাউন্ট করা হয় নাই।",
            },
          ],
        });
      }
      if (userExist.otpExpires < new Date()) {
        return res.status(400).json({
          errors: [
            {
              field: "otp",
              message: "OTP টির মেয়াদ শেষ হয়ে গেছে।",
            },
          ],
        });
      }

      const isValid = bcrypt.compareSync(otp, userExist.otp);
      if (isValid) {
        return res.status(200).json({
          status: 200,
          data: { phone: userExist.phone, otp: userExist.otp },
        });
      } else {
        return res.status(400).json({
          errors: [
            {
              field: "otp",
              message: "OTP টি সঠিক নয়।",
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
        console.log({ otpVerifyCatch: error });
        res.status(500).json({ status: 500, message: "Internal server error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
