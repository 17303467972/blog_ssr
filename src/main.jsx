import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// 👉 修正：v4+ 从 '@tanstack/react-query' 导入 QueryClient、QueryClientProvider、hydrate
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';
import 'antd/dist/reset.css';

// 从 window 获取服务端注入的初始数据
const initialData = window.__INITIAL_DATA__;

// 创建客户端 QueryClient
const queryClient = new QueryClient();

// Hydration 初始数据（v4+ 用法不变，但导入路径需正确）
if (initialData) {
  hydrate(queryClient, initialData);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);