import mongoose from "mongoose";
const { Schema } = mongoose;

const enrollSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch" },
    fee: { type: String, required: true },
    first: Boolean,
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Ended"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const enrollModel =
  mongoose.models.Enroll || mongoose.model("Enroll", enrollSchema);

export default enrollModel;
