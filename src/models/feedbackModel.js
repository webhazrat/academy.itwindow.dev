import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    star: { type: String, required: true },
    comment: String,
    status: {
      type: String,
      enum: ["Pending", "Approved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const feedbackModel =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default feedbackModel;
