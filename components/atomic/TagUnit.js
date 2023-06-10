import { convertDateStringToDate, formatDateDot } from "@/libs/core";
import styles from "./TagUnit.module.scss";
export default function TagUnit({ tag, setTag, children }) {
  console.log(tag.toLowerCase());
  return (
    <div
      className={styles["tagunit--wrap"]}
      onClick={() => {
        setTag(children);
      }}
      data-tag={children}
    >
      {children}
      <div className={styles["tagunit__stroke--tl"]}></div>
      <div className={styles["tagunit__stroke--tr"]}></div>
      <div className={styles["tagunit__stroke--bl"]}></div>
      <div className={styles["tagunit__stroke--br"]}></div>
    </div>
  );
}
