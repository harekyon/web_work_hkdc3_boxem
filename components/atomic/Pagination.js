import { convertDateStringToDate, formatDateDot } from "@/libs/core";
import styles from "./Pagination.module.scss";
import { useState } from "react";
import { css } from "@emotion/react";
export default function Pagination({
  page,
  setPage,
  setJotaiPage,
  resultArticleList,
}) {
  return (
    <div className={styles["pagination--wrap"]}>
      {resultArticleList.map((p, idx) => {
        return (
          <div
            className={styles["pagination__rect"]}
            css={css`
              ${page === idx ? "pointer-events:none;background:red;" : ""}
            `}
            onClick={() => {
              console.log(idx);
              setJotaiPage(idx + 1);
            }}
            data-isactive={page === idx ? "true" : "false"}
            key={idx}
          >
            <span>{idx + 1}</span>
          </div>
        );
      })}
    </div>
  );
}
