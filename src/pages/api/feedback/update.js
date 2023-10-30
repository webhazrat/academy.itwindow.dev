import connectDB from "@/src/lib/connect";
import { FeedbackSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import feedbackModel from "@/src/models/feedbackModel";
import { z } from "zod";

// update a feedback [path: profile/my-courses]
export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const session = await checkAdmin(req, res);
      FeedbackSchema.parse(req.body);
      const { id } = req.query;
      await connectDB();
      await feedbackModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        title: "সফল!",
        message: "ফিডব্যাক সফলভাবে আপটেড হয়েছে",
      });
    } catch (error) {
      console.log({ feedbackUpdateCatch: error });
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
