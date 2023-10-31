import connectDB from "@/src/lib/connect";
import { checkEnroll } from "@/src/middleware/serverAuth";
import attendanceModel from "@/src/models/attendanceModel";

// batch wise attendance for a user [path:profile/present-report]
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { enrollId } = req.query;
      const enrollIds = enrollId.split(",");
      const enrolls = await checkEnroll(req, res, enrollIds);
      await connectDB();
      const attendances = await attendanceModel.find({
        enrollId,
        recorded: true,
      });
      res.status(200).json({ status: 200, data: attendances });
    } catch (error) {
      console.log({ enrollAndUserAttendanceCatch: error });
      res.status(500).json({ status: 500, message: "Internal server error" });
    }
  } else {
    res
      .status(405)
      .json({ status: 405, message: "Request method not allowed" });
  }
}
