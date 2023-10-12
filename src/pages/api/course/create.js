import connectDB from "@/src/lib/connect";
import { CourseSchema } from "@/src/lib/validation";
import adminAuthMiddleware from "@/src/middleware/adminAuthMiddleware";
import courseModel from "@/src/models/courseModel";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await adminAuthMiddleware(req, res);
      CourseSchema.parse(req.body);
      const data = req.body;
      await connectDB();
      const slug = await courseModel.findOne({ slug: data.slug });
      if (slug) {
        return res.status(401).json({
          status: 401,
          message: "এই স্ল্যাগে পূর্বেই একটি কোর্স সংযুক্ত আছে।",
        });
      } else {
        await courseModel.create({ ...data });
        return res
          .status(200)
          .json({ status: 200, message: "কোর্সটি সফলভাবে সংযুক্ত হয়েছে।" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log({ error });
        return res.status(400).json({
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      } else {
        console.log({ courseCreateCatch: error });
        res.status(500).json({ status: 500, message: "Internal server error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
