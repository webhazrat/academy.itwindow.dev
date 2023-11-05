import connectDB from "@/src/lib/connect";
import { checkEnroll } from "@/src/middleware/serverAuth";
import paymentModel from "@/src/models/paymentModel";

// enrollIds wise payments [path: dashboard/enrolls/[*], profile/my-courses]
export default async function hanlder(req, res) {
  if (req.method === "GET") {
    try {
      const { enrollId } = req.query;
      const enrollIds = enrollId.split(",");
      const enrolls = await checkEnroll(req, res, enrollIds);
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
