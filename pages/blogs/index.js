import HeadGroup from "@/components/HeadGroup";
import Image from "next/image";
import styles from "@/styles/Blogs.module.scss";

// import { client } from "../libs/client";
import { client } from "../../libs/client";

import Header from "@/components/Header";
import CardList from "@/components/atomic/CardList";
import CardUnit from "@/components/atomic/CardUnit";
import { convertDateStringToDate, formatDateDot, formatTag } from "@/libs/core";
import Footer from "@/components/Footer";
import { Main } from "next/document";
import MainWrap from "@/components/atomic/MainWrap";
import FieldSide from "@/components/atomic/FieldSide";
import SectionTitle from "@/components/atomic/SectionTitle";
import SidePanelProfile from "@/components/atomic/SidePanelProfile";
import { css } from "@emotion/react";
import Breadcrumb from "@/components/atomic/Breadcrumb";
import FieldMain from "@/components/atomic/FieldMain";
import { useRouter } from "next/router";
import TagList from "@/components/atomic/TagList";
import TagUnit from "@/components/atomic/TagUnit";
import { useEffect, useRef, useState } from "react";

const breadcrumb = [
  { name: "HOME", href: "https://www.harekyon.com/" },
  { name: "TECHBLOGS", href: "/blogs" },
];

const cardunitTransitionDelayDiff = 20;

export default function Blogs({ blogs, categories }) {
  const router = useRouter();
  const { post_id } = router.query;

  const [tag, setTag] = useState(formatTag(null, "All"));
  const blogList = useRef(blogs);
  const [sortedBlogList, setSortedBlogList] = useState(blogs);
  const categoryList = useRef(
    categories.map((c) => {
      return { id: c.id, name: c.name };
    })
  );
  const cardunitDom = useRef();
  const beforeCardUnitValue = useRef(0);
  //TODO:カテゴリでソートするようにする
  const sortBlogList = () => {
    let sortedArticleList = [];
    switch (tag.id) {
      case "all":
        sortedArticleList = blogList.current;
      default:
        blogList.current.map((b) => {
          // console.log(b.category.id);
          // console.log(`b.id:${b.category.id}, tag.id:${tag.id} `);
          if (b.category.id.includes(tag.id)) {
            sortedArticleList.push(b);
          }
        });
    }
    setSortedBlogList(sortedArticleList);
  };
  //opacity:0初期値を1にするアニメーション。
  useEffect(() => {
    Array.from(document.getElementsByClassName("cardunit")).forEach((d) => {
      d.classList.add("articleAppearAnimation");
    });
  }, []);
  //タグ変更時の再描画
  useEffect(() => {
    //DOM情報を更新する
    cardunitDom.current = Array.from(
      document.getElementsByClassName("cardunit")
    );

    new Promise((resolve) => {
      //cardunitを消してからソートを開始する
      new Promise((resolveCompleteAnim) => {
        Array.from(document.getElementsByClassName("cardunit")).forEach(
          (c, idx) => {
            c.classList.remove("articleAppearAnimation");
          }
        );
        resolveCompleteAnim();
      }).then(() => {
        setTimeout(() => {
          sortBlogList();
          resolve();
        }, cardunitTransitionDelayDiff * cardunitDom.current.length + 100);
      });
    }).then(() => {
      console.log("done");
    });
  }, [tag]);
  //cardunitのDOM情報を更新し見える状態にするクラスを付与
  useEffect(() => {
    cardunitDom.current = Array.from(
      document.getElementsByClassName("cardunit")
    );
    setTimeout(() => {
      Array.from(document.getElementsByClassName("cardunit")).forEach(
        (c, idx) => {
          c.classList.add("articleAppearAnimation");
        }
      );
    }, cardunitTransitionDelayDiff * beforeCardUnitValue.current);
    beforeCardUnitValue.current = cardunitDom.current.length;
  }, [sortedBlogList]);
  return (
    <>
      <Header></Header>
      <MainWrap>
        {/* <main className={styles.main}> */}
        <FieldMain>
          <SectionTitle>BLOG LIST</SectionTitle>
          <div className={styles["main--wrap"]}>
            <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
            <TagList tag={tag}>
              <TagUnit tag={tag} setTag={setTag}>
                All
              </TagUnit>
              {categoryList.current.map((c, idx) => {
                return (
                  <TagUnit
                    categoryList={categoryList}
                    key={idx}
                    tag={tag}
                    setTag={setTag}
                  >
                    {c.name}
                  </TagUnit>
                );
              })}
            </TagList>
            <div className={`${styles["main--card-list"]} `}>
              <CardList>
                {sortedBlogList.map((b, idx) => {
                  return (
                    <CardUnit
                      key={idx}
                      id={b.id}
                      title={b.title}
                      thumbnail={b.thumbnail.url}
                      publishedAt={formatDateDot(
                        convertDateStringToDate(b.createdAt)
                      )}
                      category={b.category?.name}
                      cardunitTransitionDelayDiff={cardunitTransitionDelayDiff}
                      delayAnimValue={idx}
                    />
                  );
                })}
              </CardList>
            </div>
            <div className={styles["main--side"]}></div>
          </div>
        </FieldMain>
        <FieldSide>
          <SectionTitle>SIDE</SectionTitle>
          <div
            css={css`
              width: 100%;
              height: 100%;
              padding: 0 10px 10px;
              display: flex;
              flex-direction: column;
              row-gap: 10px;
            `}
          >
            <SidePanelProfile></SidePanelProfile>
            <SidePanelProfile></SidePanelProfile>
            <SidePanelProfile></SidePanelProfile>
          </div>
        </FieldSide>
      </MainWrap>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const categories = await client.get({ endpoint: "categories" });
  return {
    props: {
      blogs: data.contents,
      categories: categories.contents,
    },
  };
};
