import Image from "next/image";
import styles from "./CardUnit.module.scss";
import { formatDateDot } from "@/libs/core";

export default function CardUnit({
  id,
  title,
  thumbnail,
  publishedAt,
  category,
}) {
  return (
    <article className={styles["card-unit--wrap"]}>
      <a href={`./blogs/${id}`} className={styles["card-unit--flex-container"]}>
        <date className={styles["card-unit__date"]}>
          <span>{publishedAt}</span>
        </date>
        <div className={styles["card-unit__category"]}>
          <span>{category}</span>
        </div>
        <img
          width="675"
          height="393"
          src={thumbnail}
          className={styles["card-unit__thumbnail"]}
        ></img>
        <div className={styles["card-unit__title"]}>{title}</div>
      </a>
    </article>
  );
}
