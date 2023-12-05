import { convertDateStringToDate, formatDateDot, formatTag } from "@/libs/core";
import styles from "./TagUnit.module.scss";
import { css } from "@emotion/react";
import { useEffect } from "react";
export default function TagUnit({
  tag,
  name = null,
  router,
  children,
  ...props
}) {
  function queryFormatter(queryFormatResolve) {
    console.log(router?.query?.page);
    if (router?.query?.page) {
      router.push({ query: { tag: name, page: router.query.page } });
      queryFormatResolve(name);
    } else {
      router.push({ query: { tag: name, page: 1 } });
      queryFormatResolve(name);
    }
    console.log(name);
  }
  useEffect(() => {
    // console.log(tag);
  }, [tag]);
  useEffect(() => {
    // console.log(router);
  }, [router]);
  return (
    <div
      className={`${styles["tagunit--wrap"]} ${styles["tagunit__wrap"]}`}
      onClick={() => {
        new Promise((resolve) => {
          new Promise((cardAnimResolve) => {
            props.cardDisappearAnimation(cardAnimResolve);
            // cardAnimResolve();
          }).then(() => {
            resolve();
          });
        }).then(() => {
          new Promise((sortBlogListResolve) => {
            console.log(name);
            props.sortBlogList(sortBlogListResolve, name);
          }).then((result) => {
            new Promise((queryFormatResolve) => {
              queryFormatter(queryFormatResolve);
            }).then(() => {});
          });
        });
      }}
      data-tag={children}
      // data-isactive={
      //   tag.toLowerCase() === children.toLowerCase() ? "true" : "false"
      // }
    >
      {children}
      <div className={styles["tagunit__stroke--tl"]}></div>
      <div className={styles["tagunit__stroke--tr"]}></div>
      <div className={styles["tagunit__stroke--bl"]}></div>
      <div className={styles["tagunit__stroke--br"]}></div>
    </div>
  );
}
