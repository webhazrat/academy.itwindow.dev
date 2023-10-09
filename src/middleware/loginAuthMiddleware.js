import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorized route" });
    return false;
  }
  return session;
};
