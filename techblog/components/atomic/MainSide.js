import styles from "./MainSide.module.scss";

export default function MainSide({ children }) {
  return <div className={styles["main-side--wrap"]}>{children}</div>;
}
