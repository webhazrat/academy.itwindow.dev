import { getSession } from "next-auth/react";
import connectDB from "../lib/connect";
import userModel from "../models/userModel";

export async function checkAdmin(context) {
  const session = await getSession(context);
  if (session) {
    await connectDB();
    const user = await userModel.findById(session.user._id).select("role");
    if (user.role !== "Admin") {
      return {
        redirect: {
          destination: `/login`,
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export async function checkLogin(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export async function checkLoggedin(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: `/profile`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
