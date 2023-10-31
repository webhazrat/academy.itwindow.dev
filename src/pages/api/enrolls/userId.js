import connectDB from "@/src/lib/connect";
import { checkLogin } from "@/src/middleware/serverAuth";
import enrollModel from "@/src/models/enrollModel";
import courseModel from "@/src/models/courseModel";
import batchModel from "@/src/models/batchModel";

// I have enrolled which courses [path:profile/my-courses]
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await checkLogin(req, res);
      await connectDB();
      const enrolls = await enrollModel
        .find({ userId: session.user._id })
        .populate({
          path: "courseId",
          select: "_id title slug fee",
        })
        .populate({
          path: "batchId",
        });
      if (!enrolls) {
        return res
          .status(404)
          .json({ status: 404, message: "কোন কোর্স পাওয়া যায় নাই" });
      }
      res.status(200).json({ status: 200, data: enrolls });
    } catch (error) {
      console.log({ enrollsUserCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
