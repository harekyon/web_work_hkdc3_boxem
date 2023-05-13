import styles from "@/styles/Home.module.scss";

import { client } from "../libs/client";
import Image from "next/image";
import { LogoSvg } from "@/libs/assets";
import { useEffect } from "react";
import Cube from "@/components/atomic/Cube";
import CubeWrap from "@/components/atomic/CubeWrap";
import { css } from "@emotion/react";
import GridWrap from "@/components/atomic/GridWrap";
import Link from "next/link";
import CubeArticle from "@/components/atomic/CubeArticle";

const article = [
  { title: "aaaaa", link: "harekyon.com", thumbnail: "/example_thumbnail.png" },
  { title: "bbbbb", link: "harekyon.com", thumbnail: "/example_thumbnail.png" },
  { title: "ccccc", link: "harekyon.com", thumbnail: "/example_thumbnail.png" },
];

export default function Home({ blogs }) {
  useEffect(() => {}, []);
  return (
    <main className={styles["main"]}>
      <div id="main--wrap" className={styles["main--wrap"]}>
        <nav className={styles["nav--wrap"]}>
          <div className={styles["nav__title"]}>
            {/* <Image src="/logo.png" width="131" height="69"></Image> */}
            <LogoSvg />
          </div>
          <ul className={styles["nav--menu"]}>
            <li>
              <a href="#">ABOUT ME</a>
            </li>
            <li>
              <a href="#">NEWS</a>
            </li>
            <li>
              <a href="#">WORKS</a>
            </li>
            <li>
              <Link href="/blogs">TECHBLOG</Link>
            </li>
            <li>
              <a href="#">SPECIAL</a>
            </li>
          </ul>
        </nav>
        <div className={styles["section1"]}>
          <GridWrap
            cssOverrides={css`
              grid-template: 1fr 1fr 1fr / 1fr;
              padding: 10px 0;
              row-gap: 10px;
            `}
          >
            <Cube
              boxWidth="400px"
              boxHeight="100%"
              src="/sample1.png"
              property1="WORK"
              property2="2022.03"
              title="PITAGORA BLOCK"
              subTitle="FAB"
            ></Cube>
            <Cube
              boxWidth="400px"
              boxHeight="100%"
              src="/sample2.png"
              property1="WORK"
              property2="2022.03"
              title="CG WORKS"
              subTitle="ART"
            ></Cube>
            <Cube
              boxWidth="400px"
              boxHeight="100%"
              src="/sample3.png"
              property1="WORK"
              property2="2022.03"
              title="CG WORKS"
              subTitle="PRODUCT"
            ></Cube>
          </GridWrap>
        </div>
        <div className={styles["section1"]}>
          <GridWrap
            cssOverrides={css`
              grid-template: 130px 130px 130px / 130px 130px;
              padding: 10px 0;
              row-gap: 20px;
              column-gap: 20px;
            `}
          >
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1="FIELD"
              property2="01"
              title="Javascript"
              subTitle="WEB"
            ></Cube>
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1="FIELD"
              property2="02"
              title="React.js"
              subTitle="WEB"
            ></Cube>
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1="FIELD"
              property2="03"
              title="TOUCH DESIGNER"
              subTitle="CREATIVE CODE"
            ></Cube>
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1="FIELD"
              property2="04"
              title="Processing"
              subTitle="CREATIVE CODE"
            ></Cube>
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1="FIELD"
              property2="05"
              title="Fabrication"
              subTitle="WEB"
            ></Cube>
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1="FIELD"
              property2="06"
              title="Blender"
              subTitle="CG"
            ></Cube>
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1=""
              property2=""
              title="Published"
              subTitle=""
            ></Cube>
            <Cube
              boxWidth="100%"
              boxHeight="100%"
              property1=""
              property2=""
              title=""
              subTitle=""
            ></Cube>
          </GridWrap>
        </div>
        <div className={styles["section1"]}>
          <GridWrap
            cssOverrides={css`
              padding: 10px 0;
              row-gap: 10px;
            `}
          >
            <CubeArticle
              boxWidth="400px"
              boxHeight="100%"
              src="/sample1.png"
              property1="TECHBLOG"
              property2="2022.05.14"
              title="NEW POST"
              subTitle="BLOG"
              articleTitle="TurbopackとViteの違いと内部仕様を調べてみた"
              articleImgSrc="/sample1.png"
              articleAbs="これまで、長年に渡ってJavaScriptのバンドルツールはwebpackがデファクトスタンダードとなり、Next.jsやNuxt.jsなどフレームワークにもデフォルトで組み込まれていました。その高機能性と安定性から現在も多くのWebサービスで利用されています。
              一方で近年、webpackに続く次世代バンドルツールの開発競争が大きな注目を集めています。その中で特にwebpackに取って代わる勢いを見せているものにViteとTurbopackがあります。これらは、開発するアプリケーションの肥大化に伴って処理が遅くなってしまうwebpackの問題点を解決することが主要目的となっています。"
            ></CubeArticle>
          </GridWrap>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  return {
    props: {
      blogs: data.contents,
    },
  };
};
