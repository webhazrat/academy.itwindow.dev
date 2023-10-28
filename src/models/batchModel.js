import mongoose from "mongoose";
const { Schema } = mongoose;

const batchSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    code: { type: String, required: true },
    days: [String],
    date: Date,
    time: String,
    status: {
      type: String,
      enum: ["Pending", "Ongoing", "Ended"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const batchModel =
  mongoose.models.Batch || mongoose.model("Batch", batchSchema);

export default batchModel;
