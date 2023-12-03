import HeadGroup from "@/components/Seo";
import Image from "next/image";
import styles from "@/styles/Blogs.module.scss";

// import { client } from "../libs/client";
import { client } from "../../libs/client";

import Header from "@/components/Header";
import CardList from "@/components/atomic/CardList";
import CardUnit from "@/components/atomic/CardUnit";
import { convertDateStringToDate, formatDateDot, formatTag } from "@/libs/core";
import Footer from "@/components/Footer";
import MainWrap from "@/components/atomic/MainWrap";
import FieldSide from "@/components/atomic/FieldSide";
import SectionTitle from "@/components/atomic/SectionTitle";
import SidePanelProfile from "@/components/atomic/SidePanelProfile";
import { css } from "@emotion/react";
import Breadcrumb from "@/components/atomic/Breadcrumb";
import FieldMain from "@/components/atomic/FieldMain";
import TagList from "@/components/atomic/TagList";
import TagUnit from "@/components/atomic/TagUnit";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Pagination from "@/components/atomic/Pagination";

import { useAtom } from "jotai";
import { atomWithHash } from "jotai-location";
import { errorPop } from "@/libs/hp_assets";
import BlogMainContent from "@/components/atomic/BlogMainContent";
import Meta from "@/components/Meta";
import Seo from "@/components/Seo";
import { useRouter } from "next/router";

// import { errorPop } from "@/libs/hp_assets";

const breadcrumb = [
  { name: "HOME", href: "https://www.harekyon.com/" },
  { name: "BLOG", href: "/blogs" },
];

export default function Blogs({ blogs, categories }) {
  const paginationPerPage = 4;
  const sliceByNumber = (array, number) => {
    const length = Math.ceil(array.length / number);
    return new Array(length)
      .fill()
      .map((_, i) => array.slice(i * number, (i + 1) * number));
  };
  const router = useRouter();
  //ページ専用のステート
  const [page, setPage] = useState(0);
  //タグ専用のステート
  const [tag, setTag] = useState("all");
  //カテゴリーのリストを呼び出しておく
  const categoryList = useRef(
    categories.map((c) => {
      return { id: c.id, name: c.name };
    })
  );
  //タグの状態をまとめる
  const [paramState, setParamState] = useState({
    tag: "all",
    page: 1,
  });
  //記事の状態をまとめる
  const [resultArticleList, setResultArticleList] = useState(
    sliceByNumber(blogs, paginationPerPage)
  );
  const cardunitDom = useRef();
  const beforeCardUnitValue = useRef(0);
  const articleNoneError = useRef(false);
  useEffect(() => {
    // console.log(
    //   `router.query.tag:${router.query.tag} router.query.page:${router.query.page}`
    // );
    if (router.query.tag === undefined || router.query.page === undefined) {
      router.push({ query: { tag: "All", page: 1 } });
      console.log(
        `router.query.tag:${router.query.tag} router.query.page:${router.query.page}`
      );
    }
  }, []);
  useEffect(() => {
    // console.log(Array.from(document.getElementsByClassName("cardunit")));
    console.log("fase1");
    new Promise((resolve) => {
      cardDisappearAnimation(resolve, sortBlogList);
      console.log("fase2");
    })
      .then((sortBlogList) => {
        sortBlogList();
      })
      .then(() => {
        cardAppearAnimation();
        console.log("fase3");
      });
  }, [router.query.tag, router.query.page]);
  function sortBlogList() {
    let sortedArticleListResult = [];
    switch (router.query.tag) {
      case "All":
        sortedArticleListResult = blogs;
        break;
      default:
        blogs.map((b) => {
          if (b.category.id.includes(router.query.tag)) {
            sortedArticleListResult.push(b);
          }
        });
        break;
    }
    // setSortedArticleList(sortedArticleListResult);
    setResultArticleList(
      sliceByNumber(sortedArticleListResult, paginationPerPage)
    );
    console.log("ringo");
  }
  function cardDisappearAnimation(resolve, sortBlogList) {
    Array.from(document.getElementsByClassName("cardunit")).forEach(
      (d, idx) => {
        setTimeout(() => {
          d.classList.remove("articleAppearAnimation");
          if (
            idx + 1 ===
            Array.from(document.getElementsByClassName("cardunit")).length
          ) {
            resolve(sortBlogList);
          }
        }, 30 * idx);
      }
    );
  }
  function cardAppearAnimation() {
    cardunitDom.current = Array.from(
      document.getElementsByClassName("cardunit")
    );
    Array.from(document.getElementsByClassName("cardunit")).forEach(
      (c, idx) => {
        setTimeout(() => {
          c.classList.add("articleAppearAnimation");
        }, 100 * idx);
      }
    );
    beforeCardUnitValue.current = cardunitDom.current.length;
    if (!(resultArticleList.length > 0)) {
      articleNoneError.current = true;
    } else {
      articleNoneError.current = false;
    }
    // console.log(articleNoneError.current);
    if (articleNoneError.current) {
      errorPop("<span>記事は見つかりませんでした。タグ名を確認するのだ</span>");
    }
  }
  return (
    <>
      <Seo
        title="HKTL - BLOG"
        description="ゆったりてっくぶろぐ"
        keywords="web,3d,js,react,next,threejs,blender,デジタルファブリケーション,fab"
        url="https://harekyon.com/blogs/"
      />
      <Header></Header>
      <MainWrap>
        <FieldMain>
          <SectionTitle>BLOG LIST</SectionTitle>
          <BlogMainContent>
            <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
            <TagList>
              <TagUnit
                cardDisappearAnimation={cardDisappearAnimation}
                cardAppearAnimation={cardAppearAnimation}
                tag={paramState.tag}
                name="All"
              >
                All
              </TagUnit>

              {categoryList.current.map((c, idx) => {
                // console.log(paramState.tag);
                return (
                  <TagUnit
                    cardDisappearAnimation={cardDisappearAnimation}
                    categoryList={categoryList}
                    key={idx}
                    tag={paramState.tag}
                    router={router}
                    name={c.name}
                  >
                    {c.name}
                  </TagUnit>
                );
              })}
            </TagList>
            <button
              onClick={() => {
                router.push({ query: { page: 1 } });
              }}
            >
              aaa
            </button>
            <div className={`${styles["main--card-list"]} `}>
              <CardList>
                {/* divで隠しているこの仕様はソート中の不自然な描画を見せないようにするため */}
                {/* <div
                // css={css`
                //   display: none;
                // `}
                > */}
                {resultArticleList[router?.query?.page - 1]?.map((b, idx) => {
                  if (b.thumbnail?.url) {
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
                        delayAnimValue={idx}
                      />
                    );
                  } else {
                    console.log("else");
                    return (
                      <CardUnit
                        key={idx}
                        id={b.id}
                        title={b.title}
                        thumbnail={b.thumbnail?.url}
                        publishedAt={formatDateDot(
                          convertDateStringToDate(b.createdAt)
                        )}
                        category={b.category?.name}
                        // cardunitTransitionDelayDiff={
                        //   cardunitTransitionDelayDiff
                        // }
                        delayAnimValue={idx}
                      />
                    );
                  }
                })}
                {/* </div> */}
              </CardList>
            </div>
            <Pagination
              resultArticleList={resultArticleList}
              paginationPerPage={paginationPerPage}
              page={page}
              setPage={setPage}
              cardDisappearAnimation={cardDisappearAnimation}
              cardAppearAnimation={cardAppearAnimation}
            ></Pagination>
            <div className={styles["main--side"]}></div>
          </BlogMainContent>
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
          </div>
        </FieldSide>
      </MainWrap>
      <Footer />
      <div id="jsErrorPopWrap" class="errorPopWrap"></div>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blogs" });
  const categories = await client.get({ endpoint: "categories" });
  const poppreset = await client.get({ endpoint: "poppreset" });
  return {
    props: {
      blogs: data.contents,
      categories: categories.contents,
      poppreset: poppreset.contents,
    },
  };
};
