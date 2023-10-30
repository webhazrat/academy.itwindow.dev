import connectDB from "@/src/lib/connect";
import feedbackModel from "@/src/models/feedbackModel";

// course wise feedback [path:courses/[slug]]
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { courseId } = req.query;
      await connectDB();
      const feedbacks = await feedbackModel
        .find({ status: "Approved", courseId })
        .populate({ path: "userId", select: "name image education institute" });
      res.status(200).json({ status: 200, data: feedbacks });
    } catch (error) {
      console.log({ feedbackCourseCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
