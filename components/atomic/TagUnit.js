import { convertDateStringToDate, formatDateDot, formatTag } from "@/libs/core";
import styles from "./TagUnit.module.scss";
import { css } from "@emotion/react";
export default function TagUnit({
  categoryList = null,
  tag,
  setTag,
  setPage,
  setJotaiTag,
  setJotaiPage,
  inputId = null,
  children,
}) {
  // if()
  // console.log(tag.name);
  return (
    <div
      className={`${styles["tagunit--wrap"]} ${styles["tagunit__wrap"]}`}
      onClick={() => {
        setJotaiPage(1);
        setJotaiTag(formatTag(null, inputId).id);
      }}
      data-tag={children}
      data-isactive={
        tag.name.toLowerCase() === children.toLowerCase() ? "true" : "false"
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
