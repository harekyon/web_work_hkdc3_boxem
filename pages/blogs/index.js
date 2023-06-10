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

export default function Blogs({ blogs, categories }) {
  const router = useRouter();
  const { post_id } = router.query;
  const [tag, setTag] = useState(formatTag(null, "All"));
  const blogList = useRef(blogs);
  const sortedblogList = useRef(blogs);
  const [sortedBlogList, setSortedBlogList] = useState(blogs);
  const categoryList = useRef(
    categories.map((c) => {
      return { id: c.id, name: c.name };
    })
  );
  //TODO:カテゴリでソートするようにする
  const sortBlogList = () => {
    sortedblogList.current = [];
    let sortedArticleList = [];
    switch (tag.id) {
      case "all":
        sortedArticleList = blogList.current;
      default:
        blogList.current.map((b) => {
          console.log(b.category.id);
          console.log(`b.id:${b.category.id}, tag.id:${tag.id} `);
          if (b.category.id.includes(tag.id)) {
            sortedArticleList.push(b);
          }
        });
    }
    setSortedBlogList(sortedArticleList);
  };
  useEffect(() => {
    sortBlogList();
  }, [tag]);
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
            <div className={styles["main--card-list"]}>
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
