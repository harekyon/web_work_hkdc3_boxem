import { useEffect } from "react";
import styles from "./ArticleMain.module.scss";
import hljs from "highlight.js";
import Link from "next/link";

export default function ArticleMain({ children }) {
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  });
  return (
    <>
      {/* <Link
        rel="stylesheet"
        href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
      /> */}
      <div
        dangerouslySetInnerHTML={{ __html: children }}
        className={styles["article-main--wrap"]}
      ></div>
    </>
  );
}
