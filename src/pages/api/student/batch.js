import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import studentModel from "@/src/models/studentModel";
import userModel from "@/src/models/userModel";

// batch wise students [path:dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await checkAdmin(req, res);
      const { id } = req.query;
      await connectDB();
      const students = await studentModel
        .find({ batchId: id })
        .populate(["userId"]);
      res.status(200).json({ status: 200, data: students });
    } catch (error) {
      console.log({ batchWiseStudentCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
