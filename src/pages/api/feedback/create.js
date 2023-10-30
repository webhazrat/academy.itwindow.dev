import connectDB from "@/src/lib/connect";
import { FeedbackSchema } from "@/src/lib/validation";
import { checkLogin } from "@/src/middleware/serverAuth";
import feedbackModel from "@/src/models/feedbackModel";
import { z } from "zod";

// create a feedback [path: profile/my-courses]
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkLogin(req, res);
      FeedbackSchema.parse(req.body);
      const { courseId, star, comment } = req.body;
      await connectDB();
      const feedbackExist = await feedbackModel.countDocuments({
        courseId,
        userId: session.user._id,
      });
      if (feedbackExist) {
        res.status(400).json({
          title: "দুঃখিত!",
          message: "পূর্বেই ফিডব্যাক দেওয়া হয়েছে",
        });
      }
      await feedbackModel.create({
        courseId,
        userId: session.user._id,
        star,
        comment,
      });
      res.status(200).json({
        title: "সফল!",
        message: "ফিডব্যাক সফলভাবে সংযুক্ত হয়েছে",
      });
    } catch (error) {
      console.log({ feedbackCreteCatch: error });
      // FeedbackSchema zod validation error
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
