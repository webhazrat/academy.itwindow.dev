import connectDB from "@/src/lib/connect";
import { UserSchema } from "@/src/lib/validation";
import { checkLogin } from "@/src/middleware/serverAuth";
import userModel from "@/src/models/userModel";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const session = await checkLogin(req, res);
      UserSchema.parse(req.body);
      const data = req.body;
      await connectDB();
      await userModel.updateOne(
        { _id: session.user._id },
        { $set: { ...data } }
      );
      res.status(200).json({
        status: 200,
        message: "তথ্য সফলভাবে আপডেট হয়েছে।",
      });
    } catch (error) {
      console.log({ userUpdateCatch: error });
      // UserSchema zodError
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
