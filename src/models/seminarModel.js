import mongoose from "mongoose";
const { Schema } = mongoose;

const seminarSchema = new Schema(
  {
    title: { type: String, required: true },
    shortDescription: String,
    description: String,
    status: {
      type: String,
      enum: ["Published", "Unpublished", "Ended"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);
const seminarModel =
  mongoose.models.Seminar || mongoose.model("Seminar", seminarSchema);

export default seminarModel;
