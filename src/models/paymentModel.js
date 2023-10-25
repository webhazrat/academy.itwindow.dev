import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    enrollId: { type: Schema.Types.ObjectId, ref: "Enroll", required: true },
    paymentMethod: String,
    transactionId: String,
    amount: String,
    comment: String,
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);
const paymentModel =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default paymentModel;
