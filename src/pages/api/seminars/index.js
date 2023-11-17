import connectDB from "@/src/lib/connect";
import seminarModel from "@/src/models/seminarModel";

// all seminars [path:dashboard/seminars]
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { sortBy, sortOrder, pageIndex, pageSize, search, status } =
      req.query;
    const index = parseInt(pageIndex) || 0;
    const size = parseInt(pageSize) || 10;
    try {
      const sort =
        sortBy && sortOrder ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
      const regex = new RegExp(search, "i");
      const statusRegex = new RegExp(`^${status}$`, "i");
      const match = {
        $and: [
          ...(status ? [{ status: { $regex: statusRegex } }] : []),
          {
            $or: [
              { title: { $regex: regex } },
              { shortDescription: { $regex: regex } },
              { status: { $regex: regex } },
            ],
          },
        ],
      };
      await connectDB();
      const seminars = await seminarModel
        .find(match)
        .sort(sort)
        .skip(index * size)
        .limit(size);
      const total = await seminarModel.countDocuments(match);

      res.status(200).json({
        data: seminars,
        total,
        page: Math.ceil(total / size),
        pageSize: size,
      });
    } catch (error) {
      console.log({ seminarsCatch: error });
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
