import connectDB from "@/src/lib/connect";
import { BatchSchema } from "@/src/lib/validation";
import { checkAdmin } from "@/src/middleware/serverAuth";
import batchModel from "@/src/models/batchModel";
import { z } from "zod";

// need to check the exist data validation

// update a batch [path: dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const session = await checkAdmin(req, res);
      req.body.startDate = new Date(req.body.startDate);
      BatchSchema.parse(req.body);
      const { id } = req.query;
      const { code } = req.body;
      await connectDB();
      const batchExist = await batchModel.countDocuments({
        code,
        _id: { $ne: id },
      });
      if (batchExist) {
        return res.status(400).json({
          errors: [
            {
              field: "code",
              message: "ব্যাচ কোডটি পূর্বেই ব্যবহার করা হয়েছে",
            },
          ],
        });
      }
      await batchModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({
        title: "সফল!",
        message: "ব্যাচ সফলভাবে আপডেট হয়েছে",
      });
    } catch (error) {
      console.log({ batchUpdateCatch: error });
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
