import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    enrollId: { type: Schema.Types.ObjectId, ref: "Enroll" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
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
const accountModel =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default accountModel;
