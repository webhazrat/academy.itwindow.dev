import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import enrollModel from "@/src/models/enrollModel";

// enroll status update [path:dashboard/enrolls/*] ‍and [path:dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const session = await checkAdmin(req, res);
      const { id } = req.query;
      const data = req.body;
      await connectDB();
      const updateData =
        data.type === "unset" ? { $unset: { ...data } } : { $set: { ...data } };
      await enrollModel.updateOne({ _id: id }, updateData);
      res.status(200).json({
        status: 200,
        title: "সফল!",
        message: "ইনরোল টি সঠিকভাবে আপডেট হয়েছে",
      });
    } catch (error) {
      console.log({ enrollUpdateCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
