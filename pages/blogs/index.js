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

const article = [
  { title: "aaaaa", link: "harekyon.com", thumbnail: "/example_thumbnail.png" },
  { title: "bbbbb", link: "harekyon.com", thumbnail: "/example_thumbnail.png" },
  { title: "ccccc", link: "harekyon.com", thumbnail: "/example_thumbnail.png" },
];

export default function Blogs({ blogs }) {
  console.log(blogs);
  return (
    <>
      <Header></Header>
      <MainWrap>
        {/* <main className={styles.main}> */}
        <div className={styles["main--wrap"]}>
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
        {/* </main> */}
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
