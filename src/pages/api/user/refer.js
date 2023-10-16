import connectDB from "@/src/lib/connect";
import { checkLogin } from "@/src/middleware/serverAuth";
import userModel from "@/src/models/userModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await checkLogin(req, res);
      await connectDB();
      const users = await userModel
        .find({ refer: session.user._id })
        .select("name phone");
      if (users) {
        res.status(200).json({ status: 200, data: users });
      } else {
        res.status(404).json({ status: 404, message: `User not found` });
      }
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
