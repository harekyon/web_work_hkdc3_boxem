import styles from "./MainArticle.module.scss";

export default function MainArticle({ children }) {
  return <div className={styles["main-article--wrap"]}>{children}</div>;
}
