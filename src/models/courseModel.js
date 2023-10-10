import mongoose from "mongoose";
import { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    topics: [{ type: String }],
    features: [
      {
        question: String,
        answer: String,
      },
    ],
    requirements: [{ type: String }],
    knows: [{ type: String }],
    how: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const courseModel =
  mongoose.model.Course || mongoose.model("Course", courseSchema);

export default courseModel;
