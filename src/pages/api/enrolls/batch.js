import connectDB from "@/src/lib/connect";
import enrollModel from "@/src/models/enrollModel";
import userModel from "@/src/models/userModel";
import { checkAdmin } from "@/src/middleware/serverAuth";

// batch wise enrolls [path:dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await checkAdmin(req, res);
      const { batchId } = req.query;
      await connectDB();
      const enrolls = await enrollModel.find({ batchId }).populate(["userId"]);
      res.status(200).json({ status: 200, data: enrolls });
    } catch (error) {
      console.log({ enrollBatchCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
