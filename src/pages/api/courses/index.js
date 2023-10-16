import connectDB from "@/src/lib/connect";
import courseModel from "@/src/models/courseModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { sortBy, sortOrder, page, pageSize } = req.query;
    const pageNum = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10;
    try {
      const sort =
        sortBy && sortOrder ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
      await connectDB();
      const courses = await courseModel
        .find()
        .sort(sort)
        .skip((pageNum - 1) * size)
        .limit(size);

      const total = await courseModel.countDocuments();
      res.status(200).json({
        data: courses,
        total,
        page: pageNum,
        pageSize: size,
      });
    } catch (error) {
      console.log({ courseCatch: error });
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
