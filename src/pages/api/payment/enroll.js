import connectDB from "@/src/lib/connect";
import { checkEnroll } from "@/src/middleware/serverAuth";
import paymentModel from "@/src/models/paymentModel";

// enroll wise payments [path: dashboard/enrolls/[*]]
export default async function hanlder(req, res) {
  if (req.method === "GET") {
    const { enrollId } = req.query;
    try {
      const enrolls = await checkEnroll(req, res, enrollId);
      const enrollIds = enrollId.split(",");
      await connectDB();
      const payments = await paymentModel.find({
        enrollId: { $in: enrollIds },
      });
      res.status(200).json({ status: 200, data: payments });
    } catch (error) {
      console.log({ paymentsEnrollCatch: error });
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
