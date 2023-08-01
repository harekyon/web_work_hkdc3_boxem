import { convertDateStringToDate, formatDateDot } from "@/libs/core";
import styles from "./IndexModule.module.scss";
import { useEffect } from "react";
export default function IndexModule() {
  useEffect(() => {
    const heads = document.querySelectorAll("h1,h2,h3");
    console.log(heads);
  });
  return (
    <div className={styles["index-module"]}>
      <div className={styles["index-module__mokuji"]}>目次</div>
      <div className={styles["index-module__h2"]}>h2の要素</div>
      <div className={styles["index-module__h3"]}>h3の要素</div>
      <div className={styles["index-module__h4"]}>h4の要素</div>
      <div className={styles["index-module__h3"]}>h3の要素</div>
    </div>
  );
}
