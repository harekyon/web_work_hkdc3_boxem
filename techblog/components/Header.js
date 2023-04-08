import useEvent from "@react-hook/event";
import styles from "./Header.module.scss";
import Menu from "./atomic/Menu";
import MenuButton from "./atomic/MenuButton";
import { useEffect, useLayoutEffect } from "react";

let menuWebRef = null;
let menuCgRef = null;
let menuDesignRef = null;
let menuRect = null;
export default function Header() {
  useLayoutEffect(() => {
    menuWebRef = document.getElementById("menu-web");
    menuCgRef = document.getElementById("menu-cg");
    menuDesignRef = document.getElementById("menu-design");
    menuRect = document.getElementById("menu-rect");
  });
  useEffect(() => {
    menuWebRef.addEventListener("mouseover", () => {
      console.log("web");
      menuRect.style.cssText =
        "transform:translateX(10px)scaleX(1.06)scaleY(1.2);opacity:1;";
    });
    menuCgRef.addEventListener("mouseover", () => {
      console.log("cg");
      menuRect.style.cssText =
        "transform:translateX(154.5px)scaleX(1.06)scaleY(1.2);opacity:1;";
    });
    menuDesignRef.addEventListener("mouseover", () => {
      console.log("design");
      menuRect.style.cssText =
        "transform:translateX(298px)scaleX(1.06)scaleY(1.2);opacity:1;";
    });
    menuWebRef.addEventListener("mouseout", () => {
      console.log("web");
      menuRect.style.cssText = "transform:translateX(3px);opacity:0;";
    });
    menuCgRef.addEventListener("mouseout", () => {
      console.log("cg");
      menuRect.style.cssText = "transform:translateX(146px);opacity:0;";
    });
    menuDesignRef.addEventListener("mouseout", () => {
      console.log("design");
      menuRect.style.cssText = "transform:translateX(290px);opacity:0;";
    });
  }, []);

  // .addEventListener("mouseover", function () {
  //   console.log("web");
  // });
  const hoverMenu = () => {
    console.log("aaaaa");
  };
  // useEvent(globalThis, "mouseover", hoverMenu);
  return (
    <header className={styles["header-bg"]}>
      <div className={styles["header--wrap"]}>
        <div className={styles["header__logo"]}>HKTB</div>
        <div className={styles["header__menu"]}>
          <Menu>
            <MenuButton id="menu-web">WEB</MenuButton>
            <MenuButton id="menu-cg">CG</MenuButton>
            <MenuButton id="menu-design">DESIGN</MenuButton>
            <MenuButton id="menu-design">DESIGN</MenuButton>
          </Menu>
        </div>
      </div>
    </header>
  );
}
