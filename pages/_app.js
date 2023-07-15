import "@/styles/globals.scss";
import "@/styles/fonts.scss";
import "../styles/highlight/styles/atom-one-dark.min.css";
import { Provider as JotaiProvider } from "jotai";

export default function App({ Component, pageProps }) {
  return (
    <JotaiProvider>
      <Component {...pageProps} />
    </JotaiProvider>
  );
}
