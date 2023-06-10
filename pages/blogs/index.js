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

const breadcrumb = [
  { name: "HOME", href: "https://www.harekyon.com/" },
  { name: "TECHBLOGS", href: "/blogs" },
];

export default function Blogs({ blogs }) {
  console.log(blogs);
  const router = useRouter();
  const { post_id } = router.query;
  console.log(router);
  return (
    <>
      <Header></Header>
      <MainWrap>
        {/* <main className={styles.main}> */}
        <FieldMain>
          <SectionTitle>BLOG LIST</SectionTitle>
          <div className={styles["main--wrap"]}>
            <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
            <div className={styles["main--card-list"]}>
              <CardList>
                {blogs.map((b, idx) => {
                  console.log(b.thumbnail);
                  return (
                    <CardUnit
                      key={idx}
                      id={b.id}
                      title={b.title}
                      thumbnail={b.thumbnail.url}
                      publishedAt={formatDateDot(
                        convertDateStringToDate(b.createdAt)
                      )}
                      category={b.category.name}
                    />
                  );
                })}
              </CardList>
            </div>
            <div className={styles["main--side"]}></div>
          </div>
        </FieldMain>
        <FieldSide>
          <SectionTitle>PROFILE</SectionTitle>
          <div
            css={css`
              width: 100%;
              height: 100%;
              padding: 0 10px 10px;
            `}
          >
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
