import mongoose from "mongoose";
const { Schema } = mongoose;

const enrollSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch", required: true },
    status: { type: String, required: true, default: "Unverified" },
  },
  {
    timestamps: true,
  }
);
const enrollModel =
  mongoose.models.Enroll || mongoose.model("Enroll", enrollSchema);

export default enrollModel;
