// pages/_default.page.client.js
export { hydrate };

import { hydrateRoot } from 'react-dom/client';
import { createElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App.jsx';

function hydrate(pageContext) {
  const { Page } = pageContext;
  
  // 从window获取服务端传递的初始数据
  const pageProps = window.__INITIAL_PROPS__ || {};
  
  hydrateRoot(document.getElementById('root'),
    createElement(BrowserRouter, null,
      createElement(App, { pageProps })
    )
  );
}