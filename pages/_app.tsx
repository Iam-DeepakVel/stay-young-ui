import { StoreProvider } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#28282B"
        startPosition={0.3}
        stopDelayMs={300}
        height={4}
        showOnShallow={true}
      />
      <StoreProvider>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </StoreProvider>
    </>
  );
}
