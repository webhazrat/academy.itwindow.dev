import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import studentModel from "@/src/models/studentModel";

// delete student [path: dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const session = await checkAdmin(req, res);
      const { id } = req.query;
      await connectDB();
      await studentModel.deleteOne({ _id: id });
      res.status(200).json({
        title: "সফল!",
        message: "এই ব্যাচ থেকে স্টুডেন্ট সফলভাবে রিমুভ হয়েছে",
      });
    } catch (error) {
      console.log({ studentDeleteCatch: error });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Request method not allowed" });
  }
}
