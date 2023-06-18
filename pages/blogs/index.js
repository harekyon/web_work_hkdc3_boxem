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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Pagination from "@/components/atomic/Pagination";

const breadcrumb = [
  { name: "HOME", href: "https://www.harekyon.com/" },
  { name: "BLOG", href: "/blogs" },
];

const cardunitTransitionDelayDiff = 50;
const paginationPerPage = 15;

export default function Blogs({ blogs, categories }) {
  const router = useRouter();
  const { urlParam } = router.query;
  // console.log(router.query);

  const [page, setPage] = useState(0);
  const [tag, setTag] = useState(formatTag(null, "All"));
  const [listAdmin, setListAdmin] = useState({
    tag: formatTag(null, "All"),
    page: 0,
  });

  const firstRouter = useRef(true);

  useLayoutEffect(() => {
    console.log(router.query);
    // firstRouter.current = false
    console.log(firstRouter.current);
    if (
      router.query.tag !== undefined &&
      router.query.page !== undefined &&
      firstRouter.current
    ) {
      console.log("aaaa");
    }
  });
  // accurateArticleList
  // ページやタグ変更時に一瞬だけundefindになる場合があり
  // その時何も表示されなくなってレイアウトが一瞬崩れるため
  // undefined以外の正しい記事情報のみ格納し表示させる
  const accurateArticleList = useRef();

  const blogList = useRef(blogs);

  const sliceByNumber = (array, number) => {
    const length = Math.ceil(array.length / number);
    return new Array(length)
      .fill()
      .map((_, i) => array.slice(i * number, (i + 1) * number));
  };

  const [sortedArticleList, setSortedArticleList] = useState(blogs);
  const [resultArticleList, setResultArticleList] = useState(
    sliceByNumber(blogs, paginationPerPage)
  );
  const categoryList = useRef(
    categories.map((c) => {
      return { id: c.id, name: c.name };
    })
  );

  const BufferTagName = useRef("");
  const BufferPageNumber = useRef(0);
  // console.log(`querytag:${router.query.tag}, querypage:${router.query.page}`);
  // console.log(`tag:${tag.name}, page:${page}`);

  if (
    router.query.tag !== undefined &&
    router.query.page !== undefined &&
    firstRouter.current
  ) {
    firstRouter.current = false;
    console.log(`querytag:${router.query.tag}, querypage:${router.query.page}`);
    console.log(router.query.tag);
    setTag(formatTag(null, router.query.tag));
  }

  // useEffect(() => {
  //   if (router.query.tag !== undefined && router.query.page !== undefined) {
  //     if (
  //       BufferTagName.current !== router.query.tag
  //       // BufferPageNumber.current !== router.query.page
  //     ) {
  //       console.log(router.query.tag);
  //       if (router.query.tag.length !== 0) {
  //         setTag(formatTag(categoryList, router.query.tag));
  //       }
  //       console.log(tag);
  //       console.log(`querytag:${router.query.tag}, tag:${tag.name}`);
  //       console.log(`querypage:${router.query.page}, page:${page}`);
  //       // console.log(`tag:${tag.name}, page:${page}`);
  //       console.log("run");
  //     }
  //   }
  // }, []);

  const cardunitDom = useRef();
  const beforeCardUnitValue = useRef(0);
  //TODO:カテゴリでソートするようにする
  const sortBlogList = () => {
    let sortedArticleListResult = [];
    switch (tag.id) {
      case "all":
        sortedArticleListResult = blogList.current;
      default:
        blogList.current.map((b) => {
          // console.log(b.category.id);
          // console.log(`b.id:${b.category.id}, tag.id:${tag.id} `);
          if (b.category.id.includes(tag.id)) {
            sortedArticleListResult.push(b);
          }
        });
    }
    setSortedArticleList(sortedArticleListResult);
    setResultArticleList(
      sliceByNumber(sortedArticleListResult, paginationPerPage)
    );
  };

  //opacity:0初期値を1にするアニメーション。
  useEffect(() => {
    Array.from(document.getElementsByClassName("cardunit")).forEach((d) => {
      d.classList.add("articleAppearAnimation");
    });
  }, []);
  //タグ変更時の再描画
  useEffect(() => {
    setPage(0);
  }, [tag]);
  useEffect(() => {
    router.push({
      query: { tag: tag.name, page: page },
    });
    // setTag({ name: router.query.tag, id: router.query.tag });
    // setTag(router.query.tag);
    // setTag(page);
    // console.log(router.query);
    // console.log(`querytag:${router.query.tag}, querypage:${router.query.page}`);
    // console.log(`tag:${tag.name}, page:${page}`);
    // if()
    //DOM情報を更新する
    cardunitDom.current = Array.from(
      document.getElementsByClassName("cardunit")
    );
    //cardunitを消してからソートを開始する
    new Promise((resolveCompleteAnim) => {
      Array.from(document.getElementsByClassName("cardunit")).forEach(
        (c, idx) => {
          c.classList.remove("articleAppearAnimation");
        }
      );
      setTimeout(() => {
        sortBlogList();
        // console.log(tag);
        resolveCompleteAnim();
      }, cardunitTransitionDelayDiff * cardunitDom.current.length);
    }).then(() => {
      // console.log(`page:${page}, tag:${tag.name}`);
      setListAdmin({ page: page, tag: tag });
    });
  }, [page, tag]);
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
    }, cardunitTransitionDelayDiff * (beforeCardUnitValue.current - 1));
    beforeCardUnitValue.current = cardunitDom.current.length;
  }, [sortedArticleList, resultArticleList]);

  // useEffect(() => {
  //   {
  //     resultArticleList[listAdmin.page] !== undefined ? (
  //       (accurateArticleList.current = resultArticleList[listAdmin.page].map(
  //         (b, idx) => {
  //           return (
  //             <CardUnit
  //               key={idx}
  //               id={b.id}
  //               title={b.title}
  //               thumbnail={b.thumbnail.url}
  //               publishedAt={formatDateDot(
  //                 convertDateStringToDate(b.createdAt)
  //               )}
  //               category={b.category?.name}
  //               cardunitTransitionDelayDiff={cardunitTransitionDelayDiff}
  //               delayAnimValue={idx}
  //             />
  //           );
  //         }
  //       ))
  //     ) : (
  //       <></>
  //     );
  //   }
  // }, [page, tag]);

  return (
    <>
      <Header></Header>
      <MainWrap>
        {/* <main className={styles.main}> */}
        <FieldMain>
          <SectionTitle>BLOG LIST</SectionTitle>
          <div className={styles["main--wrap"]}>
            <Breadcrumb breadcrumb={breadcrumb}></Breadcrumb>
            <TagList tag={listAdmin.tag}>
              <TagUnit tag={listAdmin.tag} setTag={setTag} setPage={setPage}>
                All
              </TagUnit>
              {categoryList.current.map((c, idx) => {
                return (
                  <TagUnit
                    categoryList={categoryList}
                    key={idx}
                    tag={listAdmin.tag}
                    setTag={setTag}
                    setPage={setTag}
                    cardunitTransitionDelayDiff={cardunitTransitionDelayDiff}
                  >
                    {c.name}
                  </TagUnit>
                );
              })}
            </TagList>
            <div className={`${styles["main--card-list"]} `}>
              <CardList>
                {/* {console.log(resultArticleList)}
                {console.log(resultArticleList[0])}
                {console.log(page)} */}
                {/* {console.log(resultArticleList[listAdmin.page])} */}
                <div
                  css={css`
                    display: none;
                  `}
                >
                  {resultArticleList[listAdmin.page] !== undefined ? (
                    (accurateArticleList.current = resultArticleList[
                      listAdmin.page
                    ].map((b, idx) => {
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
                          cardunitTransitionDelayDiff={
                            cardunitTransitionDelayDiff
                          }
                          delayAnimValue={idx}
                        />
                      );
                    }))
                  ) : (
                    <></>
                  )}
                  {/* {console.log(accurateArticleList.current)} */}
                </div>
                {accurateArticleList.current}
              </CardList>
            </div>
            <Pagination
              resultArticleList={resultArticleList}
              paginationPerPage={paginationPerPage}
              page={page}
              setPage={setPage}
            ></Pagination>
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
