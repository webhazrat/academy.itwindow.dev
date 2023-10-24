import connectDB from "@/src/lib/connect";
import { BatchStudentSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import studentModel from "@/src/models/studentModel";
import { z } from "zod";

// add student to a batch [path: dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkAdmin(req, res);
      BatchStudentSchema.parse(req.body);
      const { userId, batchId, courseId } = req.body;
      await connectDB();
      const studentExist = await studentModel.countDocuments({
        userId,
        courseId,
        batchId,
      });
      if (studentExist) {
        return res.status(400).json({
          title: "দুঃখিত!",
          message: "এই ব্যাচে পূর্বেই সংযুক্ত আছে",
        });
      }
      await studentModel.create({
        userId,
        courseId,
        batchId,
      });
      res.status(200).json({
        title: "সফল!",
        message: "ব্যাচে সংযুক্ত সফলভাবে হয়েছে",
      });
    } catch (error) {
      console.log({ studentCreateCatch: error });
      // BatchStudentSchema zod validation error
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
