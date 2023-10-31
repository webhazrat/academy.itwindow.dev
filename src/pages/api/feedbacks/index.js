import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import courseModel from "@/src/models/courseModel";
import feedbackModel from "@/src/models/feedbackModel";
import userModel from "@/src/models/userModel";

// all feedbacks retrieve [path:dashboard/feedbacks]
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { sortBy, sortOrder, pageIndex, pageSize, search, status } =
      req.query;
    const index = parseInt(pageIndex) || 0;
    const size = parseInt(pageSize) || 10;
    try {
      const session = await checkAdmin(req, res);
      const sort =
        sortBy && sortOrder ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
      const regex = new RegExp(search, "i");
      const statusRegex = new RegExp(`^${status}$`, "i");
      const match = {
        $and: [
          ...(status ? [{ status: { $regex: statusRegex } }] : []),
          {
            $or: [
              { "userId.name": { $regex: regex } },
              { "userId.phone": { $regex: regex } },
              { "courseId.title": { $regex: regex } },
              { status: { $regex: regex } },
            ],
          },
        ],
      };
      const aggregationPipeline = [
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseId",
          },
        },
        {
          $unwind: "$userId",
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
      const feedbacks = await feedbackModel.aggregate(aggregationPipeline);
      const total = await feedbackModel.aggregate([
        ...aggregationPipeline.slice(0, -3),
        {
          $count: "total",
        },
      ]);

      res.status(200).json({
        data: feedbacks,
        total: total[0]?.total,
        page: Math.ceil(total[0]?.total / size),
        pageSize: size,
      });
    } catch (error) {
      console.log({ feedbacksCatch: error });
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
