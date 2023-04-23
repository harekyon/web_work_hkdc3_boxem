import styles from "./ArticleMain.module.scss";
export default function ArticleMain({ children }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: children }}
      className={styles["article-main--wrap"]}
    ></div>
  );
}
