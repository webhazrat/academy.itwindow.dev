import mongoose from "mongoose";
const { Schema } = mongoose;

const enrollSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    status: { type: String, required: true, default: "unverified" },
  },
  {
    timestamps: true,
  }
);
const enrollModel =
  mongoose.models.Enroll || mongoose.model("Enroll", enrollSchema);

export default enrollModel;
