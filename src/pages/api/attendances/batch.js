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

      const enrolls = await enrollModel
        .find({ batchId })
        .populate({ path: "userId" });

      const attendances = [];
      for (const enroll of enrolls) {
        let attendance = await attendanceModel
          .findOne({
            enrollId: enroll._id,
            date: {
              $gte: targetDate,
              $lt: nextDay,
            },
          })
          .populate({ path: "userId" });
        if (!attendance) {
          attendance = new attendanceModel({
            enrollId: enroll._id,
            userId: enroll.userId,
            date,
            recorded: false,
          });
          await attendance.save();
          await attendance.populate({ path: "userId" });
        }
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

// import connectDB from "@/src/lib/connect";
// import { checkAdmin } from "@/src/middleware/serverAuth";
// import attendanceModel from "@/src/models/attendanceModel";
// import enrollModel from "@/src/models/enrollModel";
// import userModel from "@/src/models/userModel";

// // batch wise attendance [path:dashboard/attendance]
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const session = await checkAdmin(req, res);
//       let { batchId, date } = req.body;
//       date = date
//         ? new Date(date).setHours(0, 0, 0, 0)
//         : new Date().setHours(0, 0, 0, 0);
//       await connectDB();

//       const enrolls = await enrollModel
//         .find({ batchId })
//         .populate({ path: "userId", select: "userId, _id" });

//       const attendances = [];
//       for (const enroll of enrolls) {
//         let attendance = await attendanceModel
//           .findOne({
//             enrollId: enroll._id,
//             date: date,
//           })
//           .populate({
//             path: "enrollId",
//             populate: {
//               path: "userId",
//               model: "User",
//             },
//             select: "userId, _id",
//           });
//         if (!attendance) {
//           attendance = new attendanceModel({
//             enrollId: enroll._id,
//             date: date,
//             recorded: false,
//           });

//           await attendance.save();
//           await attendance.populate({
//             path: "enrollId",
//             populate: {
//               path: "userId",
//               model: "User",
//             },
//             select: "userId, _id",
//           });
//         }
//         attendances.push(attendance);
//       }
//       res.status(200).json({ status: 200, data: attendances });
//     } catch (error) {
//       console.log({ batchWiseAttendanceCatch: error });
//       res.status(500).json({ status: 500, message: "Internal server error" });
//     }
//   } else {
//     res
//       .status(405)
//       .json({ status: 405, message: "Request method not allowed" });
//   }
// }

// import connectDB from "@/src/lib/connect";
// import { checkAdmin } from "@/src/middleware/serverAuth";
// import attendanceModel from "@/src/models/attendanceModel";
// import enrollModel from "@/src/models/enrollModel";
// import userModel from "@/src/models/userModel";

// // batch wise attendance [path:dashboard/attendance]
// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     try {
//       const session = await checkAdmin(req, res);
//       let { batchId, date } = req.query;
//       const targetDate = date ? new Date(date) : new Date();
//       targetDate.setHours(0, 0, 0, 0);
//       const nextDay = new Date(targetDate);
//       nextDay.setDate(targetDate.getDate() + 1);

//       await connectDB();

//       const enrolls = await enrollModel
//         .find({ batchId })
//         .populate({ path: "userId" });

//       const attendances = [];
//       for (const enroll of enrolls) {
//         let attendance = await attendanceModel
//           .findOne({
//             enrollId: enroll._id,
//             date: {
//               $gte: targetDate,
//               $lt: nextDay,
//             },
//           })
//           .populate({ path: "userId" });
//         if (attendance) {
//           attendances.push({ enroll: attendance });
//         } else {
//           attendances.push({ enroll });
//         }
//       }
//       res.status(200).json({ status: 200, data: attendances });
//     } catch (error) {
//       console.log({ batchWiseAttendanceCatch: error });
//       res.status(500).json({ status: 500, message: "Internal server error" });
//     }
//   } else {
//     res
//       .status(405)
//       .json({ status: 405, message: "Request method not allowed" });
//   }
// }
