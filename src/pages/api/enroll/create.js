import connectDB from "@/src/lib/connect";
import { EnrollSchema } from "@/src/lib/validation";
import { checkLogin } from "@/src/middleware/serverAuth";
import enrollModel from "@/src/models/enrollModel";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkLogin(req, res);
      EnrollSchema.parse(req.body);
      let { courseId, paymentMethod, transactionId, amount } = req.body;
      if (paymentMethod === "cash") {
        transactionId = "";
        amount = "";
      }
      await connectDB();
      const enroll = await enrollModel.countDocuments({
        user: session.user._id,
        course: courseId,
      });
      if (enroll) {
        return res.status(400).json({
          title: "দুঃখিত!",
          message: "এই কোর্সে পূর্বেই ইনরোল হয়েছেন",
        });
      }
      await enrollModel.create({
        user: session.user._id,
        course: courseId,
        paymentMethod,
        transactionId,
        amount,
      });
      res.status(200).json({
        title: "সফল!",
        message:
          "কোর্সে ইনরোল রিকুয়েস্ট সফলভাবে জমা হয়েছে, খুব শীঘ্রই যোগাযোগ করা হবে",
      });
    } catch (error) {
      console.log({ enrollCreateCatch: error });
      // EnrollSchema zod validation error
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
    res.status(405).json({ message: "Request method not allowed" });
  }
}
