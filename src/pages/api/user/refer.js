import connectDB from "@/src/lib/connect";
import { checkLogin } from "@/src/middleware/serverAuth";
import enrollModel from "@/src/models/enrollModel";
import paymentModel from "@/src/models/paymentModel";
import userModel from "@/src/models/userModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await checkLogin(req, res);
      await connectDB();
      const users = await userModel
        .find({ refer: session.user._id })
        .select("name phone");

      const usersWithEnrollments = await Promise.all(
        users.map(async (user) => {
          const enrollId = await enrollModel
            .findOne({
              userId: user._id,
              first: true,
            })
            .populate({ path: "courseId", select: "title" })
            .select("status");
          const payments = await paymentModel
            .find({
              enrollId,
              status: "Approved",
            })
            .select("amount status");
          return {
            ...user.toObject(),
            enrollId: { ...enrollId.toObject(), payments },
          };
        })
      );
      res.status(200).json({ status: 200, data: usersWithEnrollments });
    } catch (error) {
      console.log({ userReferCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
