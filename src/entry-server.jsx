import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import App from './App.jsx';
import pool from '../server/db.js';

export async function render(url) {
  const queryClient = new QueryClient();
  let pageTitle = 'my-ssr-blog';
  const pathParts = url.split('/').filter(part => part);

  // 预取数据
  if (pathParts[0] === 'articles' && pathParts.length === 2) {
    const id = pathParts[1];
    try {
      const [articles] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
      if (articles.length > 0) {
        pageTitle = articles[0].title;
        queryClient.setQueryData(['article', id], articles[0]);
      }
    } catch (err) {
      console.error('Error fetching article:', err);
    }
  } else if (pathParts[0] === 'articles' && pathParts.length === 1) {
    try {
      const [articles] = await pool.query('SELECT id, title, excerpt, author, date FROM articles ORDER BY date DESC');
      queryClient.setQueryData('articles', articles);
      pageTitle = '文章列表 - my-ssr-blog';
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  }

  // 渲染应用
  const appHtml = renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </QueryClientProvider>
  );

  //  dehydrate(queryClient) 
  const dehydratedState = JSON.stringify(dehydrate(queryClient));

  return {
    appHtml: `
      <div id="root">${appHtml}</div>
      <script>
        window.__INITIAL_DATA__ = ${dehydratedState};
      </script>
    `,
    pageTitle
  };
}