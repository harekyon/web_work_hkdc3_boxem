/*===================================*/
// [article] PAGE
// 制作実績一覧から案件をクリックするとダイナミックルーティングによって案件の情報を格納した個別ページが生成される
// []内は案件番号が格納される
/*===================================*/

import { useRouter } from "next/router";
import { client } from "../../libs/client";
import Header from "@/components/Header";
import MainWrap from "@/components/atomic/MainWrap";
import FieldMain from "@/components/atomic/FieldMain";
import FieldSide from "@/components/atomic/FieldSide";
import SectionTitle from "@/components/atomic/SectionTitle";
import SectionMain from "@/components/atomic/SectionMain";
import ArticleMain from "@/components/atomic/ArticleMain";
import ArticleProperty from "@/components/atomic/ArticleProperty";
import ArticleTitle from "@/components/atomic/ArticleTitle";
import ArticleThumbnail from "@/components/atomic/ArticleThumbnail";
import SidePanelProfile from "@/components/atomic/SidePanelProfile";
import { css } from "@emotion/react";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";
import { useEffect, useRef, useState } from "react";

const popPreset = {
  useEffect:
    "<span class='hover-pop--wrap'><span class='hover-pop__unit'>useStateはReactのhooks(関数群)です</span><span class='hover-pop__target'>useState</span></span>",
  useState:
    "<span class='hover-pop--wrap'><span class='hover-pop__unit'>useStateはReactのhooks(関数群)です</span><span class='hover-pop__target'>useState</span></span>",
  useRef: "<span>useRef</span>",
  // errorUnit:
  //   "<span class='hover-pop--wrap'><span class='hover-pop__unit'>useStateはReactのhooks(関数群)です</span><span class='hover-pop__target'>useState</span></span>",
};
const getPresetKeyArray = (preset) => {
  return Object.keys(preset);
};
const popPresetKeyArray = getPresetKeyArray(popPreset);
let stringData = "";
export default function BlogId({ data }) {
  // let originalString = data.content;
  const [originalString, setOriginalString] = useState(data.content);

  const isOnce = useRef(true);
  useEffect(() => {
    const preArray = document.getElementsByTagName("pre");
    const preChildArray = [];
    let cacheOriginalString = originalString;
    Array.from(preArray).map((p) => {
      preChildArray.push(p.children);
      p.removeChild(p.lastChild);
    });
    popPresetKeyArray.map((p, idx) => {
      console.log(p);
      // console.log(popPreset[p]);
      let searchString = p;
      let insertString = popPreset[p];
      let positions = [];
      let position = cacheOriginalString.indexOf(searchString);
      while (position !== -1) {
        //１：削除をする文字列の全ての位置をpositionsに格納する
        positions.push(position - searchString.length * positions.length);
        position = cacheOriginalString.indexOf(searchString, position + 1);
        console.log(positions);
      }
      if (positions.length > 0) {
        // console.log(positions.length);
        // 見つかった位置に挿入を行う
        var modifiedString = cacheOriginalString;
        var offset = 0;

        //２：文字列を削除する
        for (var i = 0; i < positions.length; i++) {
          modifiedString = modifiedString.replace(searchString, "");
          console.log(modifiedString);
        }
        //
        for (var i = 0; i < positions.length; i++) {
          var index = positions[i] + offset;
          modifiedString =
            modifiedString.slice(0, index) +
            insertString +
            modifiedString.slice(index);
          offset += insertString.length;
        }
        // console.log(modifiedString);
        setOriginalString(modifiedString);
      } else {
        console.log("検索文字列が見つかりませんでした。");
      }
    });
    isOnce.current = false;
    // console.log(originalString);
    // console.log(originalString);
  }, []);
  // console.log(preChildArray);]

  // });
  // console.log(originalString);
  return (
    <>
      <Meta
        ogTitleHead="HKTL"
        ogTitle={data.title}
        ogDescription={data.description}
        ogKeywords="null"
        ogUrl={`https://harekyon.com/blogs/${data.id}`}
      ></Meta>
      <title>{`HKTL - ${data.title}`}</title>
      <Header></Header>
      <MainWrap>
        <FieldMain data={data}>
          <SectionTitle>ARTICLE</SectionTitle>
          <SectionMain>
            <ArticleProperty data={data}></ArticleProperty>
            <ArticleTitle>{data.title}</ArticleTitle>
            <ArticleThumbnail thumbnail={data.thumbnail}></ArticleThumbnail>
            <ArticleMain>{originalString}</ArticleMain>
          </SectionMain>
        </FieldMain>

        {/* <FieldSide>
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
        </FieldSide> */}
      </MainWrap>
      <Footer />
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
