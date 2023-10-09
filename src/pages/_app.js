import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { UserProfileProvider } from "../context/UserProfileContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <SessionProvider session={session}>
        <UserProfileProvider>
          <Component {...pageProps} />
        </UserProfileProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
