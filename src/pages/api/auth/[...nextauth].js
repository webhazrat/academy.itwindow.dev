import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { phone, password } = credentials;
        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phone,
                password,
              }),
            }
          );
          const user = await response.json();

          if (response.ok) {
            return Promise.resolve(user);
          } else {
            return Promise.reject(user);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log({ user });
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
