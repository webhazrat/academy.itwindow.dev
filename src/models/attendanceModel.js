import mongoose from "mongoose";
const { Schema } = mongoose;

const attendanceSchema = new Schema(
  {
    enrollId: { type: Schema.Types.ObjectId, ref: "Enroll", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },
    recorded: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const attendanceModel =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default attendanceModel;
