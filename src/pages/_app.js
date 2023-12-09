import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { UserProfileProvider } from "../context/UserProfileContext";
import { Toaster } from "../components/ui/toaster";
import { UserEnrollsProvider } from "../context/UserEnrollsContext";
import { DefaultSeo } from "next-seo";
import { APP_URL } from "../lib/utils";
import { CoursesContextProvider } from "../context/CoursesContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const title = "ITWINDOW - Enhance Yourself";
  const description =
    "Unlock your potential with ITWINDOW's HSC ICT and freelancing skill development courses. Dive into the world of web design, development, and web application development. Master the art of WordPress theme and plugin development. Elevate your career with hands-on learning and personalized guidance. Join us and empower yourself for success in the ever-evolving landscape of technology and freelancing.";
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <SessionProvider session={session}>
        <CoursesContextProvider>
          <UserProfileProvider>
            <UserEnrollsProvider>
              <DefaultSeo
                title={title}
                description={description}
                canonical={APP_URL}
                openGraph={{
                  url: APP_URL,
                  title: title,
                  description: description,
                  images: [
                    {
                      url: `${APP_URL}/itwindow-academy-cover.jpg`,
                      alt: title,
                    },
                  ],
                }}
              />
              <Component {...pageProps} />
              <Toaster />
            </UserEnrollsProvider>
          </UserProfileProvider>
        </CoursesContextProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
