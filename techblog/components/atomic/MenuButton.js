import styles from "./MenuButton.module.scss";

export default function MenuButton({ children, ...props }) {
  return (
    <li id={props.id} className={styles["menu-button--wrap"]}>
      <div className={styles["menu-button__barcode"]}>111</div>
      <a href="#" className={styles["menu-button__text"]}>
        {children}
      </a>
    </li>
  );
}
