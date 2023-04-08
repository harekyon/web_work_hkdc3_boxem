import HeadGroup from "@/components/HeadGroup";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";

import { client } from "../libs/client";

import Header from "@/components/Header";

export default function Home({ blogs }) {
  console.log(blogs);
  return (
    <>
      <HeadGroup>{/* <title>Create Next App</title> */}</HeadGroup>
      <Header></Header>
      <main className={styles.main}>
        <div className={styles["main--wrap"]}>
          <div className={styles["main--card-list"]}></div>
          <div className={styles["main--side"]}></div>
        </div>
      </main>
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
