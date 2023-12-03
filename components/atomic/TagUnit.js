import { convertDateStringToDate, formatDateDot, formatTag } from "@/libs/core";
import styles from "./TagUnit.module.scss";
import { css } from "@emotion/react";
export default function TagUnit({
  tag,
  name = null,
  router,
  children,
  ...props
}) {
  function queryFormatter() {
    if (router.query.page) {
      router.push({ query: { tag: name, page: router.query.page } });
    } else {
      router.push({ query: { tag: name, page: 1 } });
    }
  }
  return (
    <div
      className={`${styles["tagunit--wrap"]} ${styles["tagunit__wrap"]}`}
      onClick={() => {
        new Promise((resolve, reject) => {
          console.log("tagUnit fase0");
          new Promise((cardAnimResolve) => {
            props.cardDisappearAnimation(cardAnimResolve);
          }).then(() => {
            resolve();
          });
        }).then(() => {
          queryFormatter();
          console.log("tagUnit fase2");
        });
      }}
      data-tag={children}
      data-isactive={
        tag.toLowerCase() === children.toLowerCase() ? "true" : "false"
      }
    >
      {children}
      <div className={styles["tagunit__stroke--tl"]}></div>
      <div className={styles["tagunit__stroke--tr"]}></div>
      <div className={styles["tagunit__stroke--bl"]}></div>
      <div className={styles["tagunit__stroke--br"]}></div>
    </div>
  );
}
