import HeadGroup from "@/components/HeadGroup";
import Image from "next/image";
import styles from "@/styles/Blogs.module.scss";

// import { client } from "../libs/client";
import { client } from "../../libs/client";

import Header from "@/components/Header";
import CardList from "@/components/atomic/CardList";
import CardUnit from "@/components/atomic/CardUnit";
import { convertDateStringToDate, formatDateDot } from "@/libs/core";
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

export default function Blogs({ blogs }) {
  const router = useRouter();
  const { post_id } = router.query;
  const [tag, setTag] = useState("all");
  const blogList = useRef(blogs);
  const sortBlogList = () => {
    console.log(
      blogList.current.map((b) => {
        return b.category.name;
      })
    );
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
              <TagUnit tag={tag} setTag={setTag}>
                WEB
              </TagUnit>
              <TagUnit tag={tag} setTag={setTag}>
                CG
              </TagUnit>
              <TagUnit tag={tag} setTag={setTag}>
                DESIGN
              </TagUnit>
            </TagList>
            <div className={styles["main--card-list"]}>
              <CardList>
                {blogList.current.map((b, idx) => {
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
  return {
    props: {
      blogs: data.contents,
    },
  };
};
