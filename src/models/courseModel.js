import mongoose from "mongoose";
import { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    description: String,
    topics: [{ _id: false, value: String }],
    details: [
      {
        _id: false,
        question: String,
        answer: String,
      },
    ],
    image: String,
    requirements: [{ _id: false, value: String }],
    knows: [{ _id: false, value: String }],
    hows: [{ _id: false, value: String }],
    fee: Number,
  },
  {
    timestamps: true,
  }
);

const courseModel =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default courseModel;
