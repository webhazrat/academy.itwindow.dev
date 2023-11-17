import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import userModel from "@/src/models/userModel";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const session = await checkAdmin(req, res);
      const data = req.body;
      await connectDB();
      await userModel.updateOne({ _id: id }, { $set: { ...data } });
      res.status(200).json({
        status: 200,
        title: "সফল!",
        message: "তথ্য সফলভাবে আপডেট হয়েছে।",
      });
    } catch (error) {
      console.log({ usersUpdateCatch: error });
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
