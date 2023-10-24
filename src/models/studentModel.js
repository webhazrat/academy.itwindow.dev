import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    batchId: { type: Schema.Types.ObjectId, ref: "Batch" },
  },
  {
    timestamps: true,
  }
);
const studentModel =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default studentModel;
