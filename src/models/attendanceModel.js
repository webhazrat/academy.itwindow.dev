import mongoose from "mongoose";
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Student" },
});
