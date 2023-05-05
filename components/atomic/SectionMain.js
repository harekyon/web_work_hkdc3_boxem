import styles from "./SectionMain.module.scss";
export default function SectionMain({ children }) {
  return (
    <div className={styles["section-main--wrap"]}>
      <span>{children}</span>
    </div>
  );
}
