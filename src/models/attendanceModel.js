import mongoose from "mongoose";
const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    enrollId: { type: Schema.Types.ObjectId, ref: "Enroll", required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Present", "Absent", "Leave"],
    },
  },
  {
    timestamps: true,
  }
);
const attendanceModel =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default attendanceModel;
