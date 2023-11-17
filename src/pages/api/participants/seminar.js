import connectDB from "@/src/lib/connect";
import participantModel from "@/src/models/participantModel";

// seminar wise participants [path:dashboard/participants/[seminarId]]
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { seminarId, sortBy, sortOrder, pageIndex, pageSize, search } =
      req.query;
    const index = parseInt(pageIndex) || 0;
    const size = parseInt(pageSize) || 10;
    try {
      const sort =
        sortBy && sortOrder ? { [sortBy]: sortOrder === "asc" ? 1 : -1 } : {};
      const regex = new RegExp(search, "i");

      const match = {
        seminarId,
        $or: [
          { name: { $regex: regex } },
          { phone: { $regex: regex } },
          { address: { $regex: regex } },
          { occupation: { $regex: regex } },
          { institute: { $regex: regex } },
        ],
      };
      await connectDB();
      const participants = await participantModel
        .find(match)
        .sort(sort)
        .skip(index * size)
        .limit(size);
      const total = await participantModel.countDocuments(match);

      res.status(200).json({
        data: participants,
        total,
        page: Math.ceil(total / size),
        pageSize: size,
      });
    } catch (error) {
      console.log({ participantsSeminarCatch: error });
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
