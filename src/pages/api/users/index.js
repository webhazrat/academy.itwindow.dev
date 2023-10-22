import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import userModel from "@/src/models/userModel";

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
      const filter = {
        $or: [
          { name: { $regex: regex } },
          { phone: { $regex: regex } },
          { address: { $regex: regex } },
          { role: { $regex: regex } },
          { status: { $regex: regex } },
        ],
      };
      await connectDB();
      const users = await userModel
        .find(filter)
        .sort(sort)
        .skip(index * size)
        .limit(size);

      const total = await userModel.countDocuments(filter);
      res.status(200).json({
        data: users,
        total,
        page: Math.ceil(total / size),
        pageSize: size,
      });
    } catch (error) {
      console.log({ usersCatch: error });
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
