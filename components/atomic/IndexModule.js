import { convertDateStringToDate, formatDateDot } from "@/libs/core";
import styles from "./IndexModule.module.scss";
import { useEffect, useRef, useState } from "react";
export default function IndexModule() {
  const [heads, useHeads] = useState([]);
  useEffect(() => {
    useHeads(Array.from(document.querySelectorAll("h1,h2,h3")));
    window.scrollTo(0, 0);
  }, []);
  if (heads !== undefined) {
    heads.map((aaa) => {
      console.log(aaa);
    });
  }
  return (
    <div className={styles["index-module"]}>
      <div className={styles["index-module__mokuji"]}>目次</div>
      {heads.map((h, idx) => {
        if (h.tagName === "H1") {
          return <></>;
        } else if (h.tagName === "H2") {
          return (
            <div idx={idx} className={styles["index-module__h2"]}>
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
              idx={idx}
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
              idx={idx}
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
