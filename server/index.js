import express from 'express';
import { renderPage } from 'vite-plugin-ssr/server';
import path from 'path';
import { fileURLToPath } from 'url';
import articleRoutes from './routes/articles.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API路由
app.use('/api/articles', articleRoutes);

// 静态文件
app.use(express.static(path.join(__dirname, '../dist/client')));

// SSR处理
app.get('/*', async (req, res, next) => {
  const pageContextInit = {
    urlOriginal: req.originalUrl
  };
  const pageContext = await renderPage(pageContextInit);
  const { httpResponse } = pageContext;
  
  if (!httpResponse) return next();
  
  const { body, statusCode, headers } = httpResponse;
  
  headers.forEach(([name, value]) => res.setHeader(name, value));
  res.status(statusCode).send(body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});