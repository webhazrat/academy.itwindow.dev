// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import attendanceModel from "@/src/models/attendanceModel";

export default async function handler(req, res) {
  const date = new Date("2021-09-26").setHours(0, 0, 0, 0);
  const attendances = await attendanceModel.find({
    date: date,
  });

  res.status(200).json({ attendances });
}
