import connectDB from "@/src/lib/connect";
import { CourseSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import courseModel from "@/src/models/courseModel";
import { z } from "zod";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const destination = "public/courses";
    try {
      const session = await checkAdmin(req, res);
      CourseSchema.parse(req.body);
      await connectDB();
      const slug = await courseModel.countDocuments({ slug: data.slug });
      if (slug) {
        return res.status(400).json({
          errors: [
            {
              field: "slug",
              message: "এই স্ল্যাগে পূর্বেই একটি কোর্স সংযুক্ত আছে।",
            },
          ],
        });
      } else {
        await courseModel.create({ ...data });
        return res.status(200).json({
          status: 200,
          title: "সফল!",
          message: "কোর্সটি সফলভাবে সংযুক্ত হয়েছে।",
        });
      }
    } catch (error) {
      // CourseSchema zodError
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          errors: error.errors.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      } else {
        return res
          .status(500)
          .json({ status: 500, message: "Internal server error" });
      }
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
