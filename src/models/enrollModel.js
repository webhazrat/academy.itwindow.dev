import mongoose from "mongoose";
const { Schema } = mongoose;

const enrollSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    paymentMethod: String,
    transactionId: String,
    amount: String,
    status: { type: String, required: true, default: "unverified" },
  },
  {
    timestamps: true,
  }
);
const enrollModel =
  mongoose.models.Enroll || mongoose.model("Enroll", enrollSchema);

export default enrollModel;
