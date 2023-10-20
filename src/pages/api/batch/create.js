import connectDB from "@/src/lib/connect";
import { BatchSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import batchModel from "@/src/models/batchModel";
import courseModel from "@/src/models/courseModel";
import { z } from "zod";

// create a batch [path: dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkAdmin(req, res);
      BatchSchema.parse(req.body);
      let { batchCode, courseId, classDays, time } = req.body;
      await connectDB();
      const courseExist = await courseModel.countDocuments({
        _id: courseId,
      });
      if (!courseExist) {
        return res.status(400).json({
          errors: [
            {
              field: "couseId",
              message: "কোর্সটি নাই, সঠিক কোর্স ইনপুট করুন",
            },
          ],
        });
      }
      await batchModel.create({
        courseId,
        batchCode,
        classDays,
        time,
      });
      res.status(200).json({
        title: "সফল!",
        message: "ব্যাচ সফলভাবে সংযুক্ত হয়েছে",
      });
    } catch (error) {
      console.log({ batchCreateCatch: error });
      // BatchSchema zod validation error
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
