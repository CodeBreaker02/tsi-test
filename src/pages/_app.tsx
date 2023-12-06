import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Preloader from "@/components/Preloader";
import { AuthContextProvider } from "@/context/AuthContext";

/*
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
*/
const clashDisplayFont = localFont({
  variable: "--clash-display-font",
  display: "swap",
  src: [
    {
      path: "../fonts/ClashDisplay-Variable.ttf",
      weight: "variable",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <main className={`${clashDisplayFont.variable} font-sans`}>
        <Preloader />
        <div className="noise">
          <div className="w-embed"></div>
          <div className="noise-inner"></div>
        </div>
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  );
}
