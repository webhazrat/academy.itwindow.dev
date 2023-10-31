import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { UserProfileProvider } from "../context/UserProfileContext";
import { Toaster } from "../components/ui/toaster";
import { UserEnrollsProvider } from "../context/UserEnrollsContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <SessionProvider session={session}>
        <UserProfileProvider>
          <UserEnrollsProvider>
            <Component {...pageProps} />
            <Toaster />
          </UserEnrollsProvider>
        </UserProfileProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
