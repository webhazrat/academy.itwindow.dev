import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import connectDB from "../lib/connect";
import userModel from "../models/userModel";

export async function checkAdmin(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    await connectDB();
    const user = await userModel.findById(session.user._id).select("role");
    if (user.role === "admin") {
      return Promise.resolve(session);
    } else {
      return Promise.reject({ message: "Unauthorized route" });
    }
  }
  return Promise.reject({ message: "Unauthorized route" });
}

export async function checkLogin(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return Promise.reject({ message: "Unauthorized route" });
  }
  return Promise.resolve(session);
}
