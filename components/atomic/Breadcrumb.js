import { convertDateStringToDate, formatDateDot } from "@/libs/core";
import styles from "./Breadcrumb.module.scss";
import { css } from "@emotion/react";
export default function Breadcrumb({ breadcrumb }) {
  return (
    <div className={styles["breadcrumb--wrap"]}>
      <div className={styles["breadcrumb__bg"]}>
        {breadcrumb.map((b, idx) => {
          return (
            <>
              <a
                href={b.href}
                css={css`
                  background: rgb(
                    ${8 * idx + 40},
                    ${8 * idx + 40},
                    ${9 * idx + 60}
                  );
                  z-index: ${20 - idx};
                `}
              >
                <span>{b.name}</span>
              </a>
              {/* <img src="/blogs/breadcrumb_arrow3.svg"></img> */}
            </>
          );
        })}
      </div>
    </div>
  );
}
