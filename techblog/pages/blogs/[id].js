/*===================================*/
// [article] PAGE
// 制作実績一覧から案件をクリックするとダイナミックルーティングによって案件の情報を格納した個別ページが生成される
// []内は案件番号が格納される
/*===================================*/

import { useRouter } from "next/router";
import { client } from "../../libs/client";

export default function BlogId({ blog }) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
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
      blog: data,
    },
  };
};

// export default function RouterBlog({ article }) {
//   const router = useRouter();
//   const routerJobNo = router.query.routerJobNo;
//   return <div>{article.createdAt}</div>;
// }

// export const getStaticPaths = async () => {
//   const data = await client.get({
//     endpoint: "blogs",
//   });
//   // const paths = data.contents.map((content) => `/blog/${content.id}`);

//   const paramArray = [];
//   await Promise.all(
//     data.contents.map((w) => {
//       paramArray.push({ params: { article: w.id } });
//       return w;
//     })
//   );

//   return { paramArray, fallback: false };
// };
// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   console.log(id);
//   const article = await client
//     .get({
//       endpoint: "blog",
//       queries: `isClosed[equals]false[and]id[equals]${id}`,
//     })
//     .then((res) => {
//       return res.contents[0];
//     })
//     .catch((err) => {
//       console.error(err);
//     });

//   return {
//     props: {
//       article,
//     },
//   };
// };

// export async function getStaticProps(context) {
//   const jobNo = context.params.routerJobNo;

//   const targetWork = await client
//     .get({
//       endpoint: `blogs`,
//       queries: { filters: `isClosed[equals]false[and]jobNo[equals]${jobNo}` },
//     })
//     .then((res) => {
//       return res.contents[0];
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   console.log(targetWork);
//   return {
//     props: {
//       targetWork,
//     },
//   };
// }
