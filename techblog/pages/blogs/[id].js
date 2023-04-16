/*===================================*/
// [article] PAGE
// 制作実績一覧から案件をクリックするとダイナミックルーティングによって案件の情報を格納した個別ページが生成される
// []内は案件番号が格納される
/*===================================*/

import { useRouter } from "next/router";
import { client } from "../../libs/client";
import Header from "@/components/Header";
import MainWrap from "@/components/atomic/MainWrap";
import MainArticle from "@/components/atomic/MainArticle";
import MainSide from "@/components/atomic/MainSide";
import SectionTitle from "@/components/atomic/SectionTitle";
import SectionMain from "@/components/atomic/SectionMain";
import ArticleMain from "@/components/atomic/ArticleMain";
import ArticleProperty from "@/components/atomic/ArticleProperty";
import ArticleTitle from "@/components/atomic/ArticleTitle";
import ArticleThumbnail from "@/components/atomic/ArticleThumbnail";

export default function BlogId({ data }) {
  console.log(data);
  return (
    <>
      <Header></Header>
      <MainWrap>
        <MainArticle data={data}>
          <SectionTitle>ARTICLE</SectionTitle>
          <SectionMain>
            <ArticleProperty data={data}></ArticleProperty>
            <ArticleTitle>{data.title}</ArticleTitle>
            <ArticleThumbnail thumbnail={data.thumbnail}></ArticleThumbnail>
            <ArticleMain>{data.content}</ArticleMain>
            <ArticleMain>{data.content}</ArticleMain>
          </SectionMain>
        </MainArticle>
        <MainSide>
          <SectionTitle>{data.title}</SectionTitle>
        </MainSide>
      </MainWrap>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content) => `/blogs/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      data: data,
    },
  };
};