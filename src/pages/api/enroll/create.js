import connectDB from "@/src/lib/connect";
import { PaymentSchema } from "@/src/lib/validation";
import { checkLogin } from "@/src/middleware/serverAuth";
import paymentModel from "@/src/models/paymentModel";
import enrollModel from "@/src/models/enrollModel";
import { z } from "zod";

// create a request for enrollment a course path: courses/[slug]
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkLogin(req, res);
      PaymentSchema.parse(req.body);
      let { courseId, paymentMethod, transactionId, amount } = req.body;
      if (paymentMethod === "Cash") {
        transactionId = "";
      }
      await connectDB();
      const enrollExist = await enrollModel.countDocuments({
        userId: session.user._id,
        courseId,
        status: { $ne: "Ended" },
      });
      if (enrollExist) {
        return res.status(400).json({
          title: "দুঃখিত!",
          message: "এই কোর্সে পূর্বেই ইনরোল হয়েছেন",
        });
      }
      const enroll = await enrollModel.create({
        userId: session.user._id,
        courseId,
      });
      if (enroll) {
        await paymentModel.create({
          enrollId: enroll._id,
          paymentMethod,
          transactionId,
          amount,
        });
      }
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
