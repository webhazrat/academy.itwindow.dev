import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return Promise.reject({ message: "Unauthorized route" });
  }
  return Promise.resolve(session);
};
