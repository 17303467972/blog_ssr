// pages/_default.page.server.js
export { render };

import { renderToHtml } from 'vite-plugin-ssr/server';
import ReactDOMServer from 'react-dom/server';
import { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App.jsx';
import { getServerSideProps } from '../src/pages/ArticleList.jsx';
import articleDetailProps from '../src/pages/Article.jsx';

async function render(pageContext) {
  const { Page, urlPath } = pageContext;
  
  // 获取页面所需数据
  let pageProps = {};
  if (urlPath === '/articles') {
    pageProps = await getServerSideProps();
  } else if (urlPath.startsWith('/articles/')) {
    const id = urlPath.split('/')[2];
    pageProps = await articleDetailProps.getServerSideProps({ params: { id } });
  }

  // 渲染应用
  const appHtml = ReactDOMServer.renderToString(
    createElement(BrowserRouter, { location: pageContext.urlOriginal },
      createElement(App, { pageProps })
    )
  );

  // 构建完整HTML
  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>my-ssr-blog</title>
        <link rel="stylesheet" href="/assets/index.css">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script>window.__INITIAL_PROPS__ = ${JSON.stringify(pageProps)};</script>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>`;

  return {
    html,
    pageContext: {
      ...pageContext,
      pageProps
    }
  };
}