import HeadGroup from "@/components/HeadGroup";
import { css } from "@emotion/react";
import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import Script from "next/script";

export default function Document() {
  return (
    <Html
      lang="en"
      css={css`
        // background: black;
      `}
    >
      <HeadGroup />
      <Link
        rel="stylesheet"
        href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/grayscale.min.css"
      />
      <link rel="stylesheet" href="https://use.typekit.net/ewv3fqu.css" />
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
      <Head />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(d) {
              var config = {
                kitId: 'fmz5jgt',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
            `,
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
