import useEvent from "@react-hook/event";
import styles from "./IndexModule.module.scss";
import { useEffect, useState } from "react";
export default function IndexModule() {
  const [heads, setHeads] = useState([]);
  useEffect(() => {
    let tableOfContents = document.getElementById("tableOfContents");
    const articleMainSide = document.getElementById("article-main--side");
    console.log(articleMainSide.clientWidth);
    window.addEventListener(
      "scroll",
      () => {
        tableOfContents = document.getElementById("tableOfContents");
        if (articleMainSide.getBoundingClientRect().top < 40) {
          tableOfContents.style.position = "fixed";
          tableOfContents.style.top = "40px";
          tableOfContents.style.width = `${articleMainSide.clientWidth}px`;
        } else if (40 < articleMainSide.getBoundingClientRect().top) {
          tableOfContents.style.position = "unset";
          tableOfContents.style.top = "unset";
        }
      },
      true
    );
  });
  useEffect(() => {
    setHeads(Array.from(document.querySelectorAll("h1,h2,h3")));
  }, []);

  return (
    <div id="tableOfContents" className={styles["index-module"]}>
      <div className={styles["index-module__mokuji"]}>目次</div>
      {heads.map((h, idx) => {
        if (h.tagName === "H1") {
          return <></>;
        } else if (h.tagName === "H2") {
          return (
            <div key={idx} className={styles["index-module__h2"]}>
              <span
                onClick={() => {
                  heads[idx].scrollIntoView();
                }}
              >
                {h.innerText}
              </span>
            </div>
          );
        } else if (h.tagName === "H3") {
          return (
            <span
              key={idx}
              onClick={() => {
                heads[idx].scrollIntoView();
              }}
            >
              <div className={styles["index-module__h3"]}>{h.innerText}</div>
            </span>
          );
        } else if (h.tagName === "H4") {
          return (
            <span
              key={idx}
              onClick={() => {
                heads[idx].scrollIntoView();
              }}
            >
              <div className={styles["index-module__h4"]}>{h.innerText}</div>
            </span>
          );
        }
      })}
    </div>
  );
}
