import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import accountModel from "@/src/models/accountModel";

export default async function hanlder(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const session = await checkAdmin(req, res);
      await connectDB();
      const accounts = await accountModel.find({ enrollId: id });
      res.status(200).json({ status: 200, data: accounts });
    } catch (error) {
      console.log({ accountsEnrollCatch: error });
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
