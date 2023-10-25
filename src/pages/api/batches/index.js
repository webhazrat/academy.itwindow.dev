import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import batchModel from "@/src/models/batchModel";
import courseModel from "@/src/models/courseModel";

// all batches [path:dashboard/batches]
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { sortBy, sortOrder, pageIndex, pageSize, search } = req.query;
    const index = parseInt(pageIndex) || 0;
    const size = parseInt(pageSize) || 10;
    try {
      const session = await checkAdmin(req, res);
      const sort =
        sortBy && sortOrder ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
      const regex = new RegExp(search, "i");
      const match = {
        $or: [
          { "courseId.title": { $regex: regex } },
          { code: { $regex: regex } },
          { days: { $regex: regex } },
          { time: { $regex: regex } },
          { status: { $regex: regex } },
        ],
      };
      const aggregationPipeline = [
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseId",
          },
        },
        {
          $unwind: "$courseId",
        },
        {
          $match: match,
        },
        {
          $sort: sort,
        },
        {
          $skip: index * size,
        },
        {
          $limit: size,
        },
      ];

      await connectDB();
      const batches = await batchModel.aggregate(aggregationPipeline);
      const total = await batchModel.aggregate([
        ...aggregationPipeline.slice(0, -3),
        {
          $count: "total",
        },
      ]);

      res.status(200).json({
        data: batches,
        total: total[0]?.total,
        page: Math.ceil(total[0]?.total / size),
        pageSize: size,
      });
    } catch (error) {
      console.log({ batchesCatch: error });
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
