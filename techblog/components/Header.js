import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <div className={styles["header__logo"]}>
        <Link href="#">
          <Image width="403" height="175" src="/logo.png"></Image>
        </Link>
      </div>
      <div className={styles["header__state"]}>
        <span>主の気持ち：</span>
        <span>痩せたい(microcmsからフェッチ)</span>
      </div>
    </header>
  );
}
