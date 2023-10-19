import connectDB from "@/src/lib/connect";
import { checkLogin } from "@/src/middleware/serverAuth";
import enrollModel from "@/src/models/enrollModel";
import courseModel from "@/src/models/courseModel";

// I have enrolled which courses [path:profile/my-courses]
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await checkLogin(req, res);
      await connectDB();
      const courses = await enrollModel
        .find({ userId: session.user._id })
        .populate(["courseId"]);
      if (!courses) {
        return res
          .status(404)
          .json({ status: 404, message: "কোন কোর্স পাওয়া যায় নাই" });
      }
      res.status(200).json({ status: 200, data: courses });
    } catch (error) {
      console.log({ userCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
