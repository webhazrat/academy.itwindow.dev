import connectDB from "@/src/lib/connect";
import { checkAdmin } from "@/src/middleware/serverAuth";
import attendanceModel from "@/src/models/attendanceModel";

// attendance create [path:dashboard/attendance]
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const session = await checkAdmin(req, res);
      let { attendances, date } = req.body;
      const targetDate = date ? new Date(date) : new Date();
      targetDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      const operations = attendances.map((attendance) => ({
        updateOne: {
          filter: {
            enrollId: attendance.enrollId,
            date: {
              $gte: targetDate,
              $lt: nextDay,
            },
          },
          update: {
            userId: attendance.userId,
            status: attendance.status,
            recorded: true,
          },
          upsert: true,
        },
      }));
      await connectDB();
      const attendance = await attendanceModel.bulkWrite(operations);
      res.status(200).json({
        status: 200,
        title: "সফল!",
        message: "অ্যাটেনডেন্স সঠিকভাবে সংরক্ষণ হয়েছে",
      });
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
