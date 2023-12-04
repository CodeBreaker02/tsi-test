import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const satoshiFont = localFont({
  variable: "--satoshi-font",
  display: "swap",
  src: [
    {
      path: "../fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${satoshiFont.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
