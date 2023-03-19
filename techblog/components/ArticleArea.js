import { css } from "@emotion/react";
import Image from "next/image";
import styles from "./ArticleArea.module.scss";

export default function ArticleArea() {
  return (
    <div className={styles["article--wrap"]}>
      <div className={styles["article__propaty"]}>
        <span className={styles["article__propaty__date"]}>2022.03.19</span>
        <span className={styles["article__propaty__category"]}>web</span>
      </div>
      <div className={styles["article__title"]}>
        <span>タイトル</span>
        <div className={styles["article__title--cube"]}></div>
      </div>
      <div className={styles["article__img"]}>
        <Image width="674" height="372" src="/example_thumbnail.png"></Image>
      </div>
      <div className={styles["article__text"]}>
        <p>ここにcmsのテキストがのるにょん</p>
      </div>
    </div>
  );
}
