import styles from "./ArticleMain.module.scss";
export default function ArticleMain({ children }) {
  return (
    <div className={styles["article-main--wrap"]}>
      <div dangerouslySetInnerHTML={{ __html: children }}></div>
    </div>
  );
}
