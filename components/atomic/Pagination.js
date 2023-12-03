import { convertDateStringToDate, formatDateDot } from "@/libs/core";
import styles from "./Pagination.module.scss";
import { useState } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
export default function Pagination({
  page,
  setPage,
  setJotaiPage,
  resultArticleList,
  ...props
}) {
  const router = useRouter();
  function queryFormatter(idx) {
    if (router.query.tag) {
      router.push({ query: { tag: router.query.tag, page: idx + 1 } });
    } else {
      router.push({ query: { page: idx + 1 } });
    }
  }
  return (
    <div className={styles["pagination--wrap"]}>
      {resultArticleList.map((p, idx) => {
        return (
          <div
            onClick={() => {
              new Promise((resolve, reject) => {
                new Promise((cardAnimResolve) => {
                  props.cardDisappearAnimation(cardAnimResolve);
                }).then(() => {
                  resolve();
                });
              }).then(() => {
                queryFormatter(idx);
              });
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
