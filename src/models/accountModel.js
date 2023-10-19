import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    enrollId: { type: Schema.Types.ObjectId, ref: "Enroll" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    paymentMethod: String,
    transactionId: String,
    amount: String,
    status: { type: String, required: true, default: "unverified" },
  },
  {
    timestamps: true,
  }
);
const accountModel =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default accountModel;
