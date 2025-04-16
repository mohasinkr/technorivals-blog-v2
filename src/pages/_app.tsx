import "../globals.css";
import type { AppProps } from "@/src/types";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Script from "next/script";
import { cx } from "@/src/utils";
import { Inter, Manrope } from "next/font/google";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import { getStoryblokApiInstance } from "@/src/lib/storyblok";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

// Initialize Storyblok - we'll automatically use draft in dev and published in production
const storyblokToken = process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

// Check if token exists before initializing
if (!storyblokToken) {
  console.error(
    "Storyblok API token is missing! Please check your .env.local file."
  );
} else {
  try {
    storyblokInit({
      accessToken: storyblokToken,
      use: [apiPlugin],
    });

    // Initialize the singleton API instance
    getStoryblokApiInstance();
    console.log("Storyblok initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Storyblok:", error);
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="theme-switcher" strategy="afterInteractive">
        {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }`}
      </Script>
      <div
        className={cx(
          inter.variable,
          manrope.variable,
          "font-mr bg-light dark:bg-dark min-h-screen flex flex-col"
        )}
      >
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
