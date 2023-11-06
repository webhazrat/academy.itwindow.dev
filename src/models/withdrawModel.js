import mongoose from "mongoose";
const { Schema } = mongoose;

const withdrawSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: String,
    amount: String,
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
const withdrawModel =
  mongoose.models.Withdraw || mongoose.model("Withdraw", withdrawSchema);

export default withdrawModel;
