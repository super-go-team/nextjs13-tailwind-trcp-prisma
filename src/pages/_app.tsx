import "../styles/globals.css";
import "@fontsource/poppins";
import type { AppProps, AppType } from "next/app";
import { api } from "@/utils/trpc";

const App: AppType = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(App);
