import connectDB from "@/src/lib/connect";
import courseModel from "@/src/models/courseModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { sortBy, sortOrder, pageIndex, pageSize, search } = req.query;
    const index = parseInt(pageIndex) || 0;
    const size = parseInt(pageSize) || 10;
    try {
      const sort =
        sortBy && sortOrder ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
      const regex = new RegExp(search, "i");
      const filter = {
        $or: [
          { title: { $regex: regex } },
          { excerpt: { $regex: regex } },
          { fee: { $regex: regex } },
          { status: { $regex: regex } },
        ],
      };
      await connectDB();
      const courses = await courseModel
        .find(filter)
        .sort(sort)
        .skip(index * size)
        .limit(size);

      const total = await courseModel.countDocuments(filter);
      res.status(200).json({
        data: courses,
        total,
        page: Math.ceil(total / size),
        pageSize: size,
      });
    } catch (error) {
      console.log({ coursesCatch: error });
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
