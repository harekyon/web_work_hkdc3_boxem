import { convertDateStringToDate, formatDateDot } from "@/libs/core";
import styles from "./Pagination.module.scss";
import { useState } from "react";
export default function Pagination({ setPage, resultArticleList }) {
  return (
    <div className={styles["pagination--wrap"]}>
      {resultArticleList.map((p, idx) => {
        return (
          <div
            className={styles["pagination__rect"]}
            onClick={() => {
              setPage(idx);
            }}
          >
            <span>{idx + 1}</span>
          </div>
        );
      })}
    </div>
  );
}
