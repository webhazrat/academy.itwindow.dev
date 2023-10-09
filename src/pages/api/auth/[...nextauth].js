import userModel from "@/src/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/src/lib/connect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { phone, password } = credentials;
        await connectDB();
        const user = await userModel.findOne({ phone });
        if (!user) {
          return Promise.reject({
            message: "এই নাম্বার ব্যবহার করে কোন অ্যাকাউন্ট নাই।",
          });
        } else {
          if (user && bcrypt.compareSync(password, user.password)) {
            return Promise.resolve(user);
          } else {
            return Promise.reject({
              message: "মোবাইল ও পাসওয়ার্ড মিল হচ্ছে না।",
            });
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
