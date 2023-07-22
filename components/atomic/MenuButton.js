import styles from "./MenuButton.module.scss";

export default function MenuButton({ href = "#", children, ...props }) {
  return (
    <li id={props.id} className={styles["menu-button--wrap"]}>
      <div className={styles["menu-button__barcode"]}>111</div>
      <a href={href} className={styles["menu-button__text"]}>
        {children}
      </a>
    </li>
  );
}
