import connectDB from "@/src/lib/connect";
import courseModel from "@/src/models/courseModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { slug } = req.query;
      await connectDB();
      const course = await courseModel.findOne({ slug });
      if (course) {
        res.status(200).json({ status: 200, data: course });
      } else {
        res
          .status(404)
          .json({ status: 404, message: "কোর্স খুঁজে পাওয়া যায় নাই।" });
      }
    } catch (error) {
      console.log({ courseSlugCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
