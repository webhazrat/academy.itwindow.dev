import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import attendanceModel from "@/src/models/attendanceModel";
import enrollModel from "@/src/models/enrollModel";
import userModel from "@/src/models/userModel";

// batch wise attendance [path:dashboard/attendance]
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await checkAdmin(req, res);
      let { batchId, date } = req.query;
      const targetDate = date ? new Date(date) : new Date();
      targetDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      await connectDB();

      const enrolls = await enrollModel.find({ batchId });

      const attendances = [];
      for (const enroll of enrolls) {
        const attendance = await attendanceModel
          .findOneAndUpdate(
            {
              enrollId: enroll._id,
              date: {
                $gte: targetDate,
                $lt: nextDay,
              },
            },
            {
              enrollId: enroll._id,
              userId: enroll.userId,
              date,
            },
            {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true,
            }
          )
          .populate({ path: "userId" });

        attendances.push(attendance);
      }
      res.status(200).json({ status: 200, data: attendances });
    } catch (error) {
      console.log({ batchWiseAttendanceCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
