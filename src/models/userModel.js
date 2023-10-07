import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    phone: { type: String, required: true },
    otp: String,
    otpExpires: {
      type: Date,
      expires: "5m",
    },
    email: String,
    image: String,
    password: String,
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
