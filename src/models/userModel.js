import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    phone: { type: String, required: true, unique: true },
    role: String,
    otp: String,
    otpExpires: {
      type: Date,
      expires: "5m",
    },
    email: String,
    image: String,
    password: String,
    address: String,
    guardian: String,
    guardianPhone: String,
    education: String,
    institute: String,
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
