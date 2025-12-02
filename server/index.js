import express from 'express';
import { createServer as createViteServer } from 'vite';
import pool from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());

// 1. 优先处理 API 路由
app.get('/api/articles', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, title, excerpt, author, date FROM articles ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const { title, content, excerpt, author } = req.body;
    const [result] = await pool.query(
      'INSERT INTO articles (title, content, excerpt, author) VALUES (?, ?, ?, ?)',
      [title, content, excerpt || content.substring(0, 200), author || 'yy zhang']
    );
    res.status(201).json({ id: result.insertId, title, content, excerpt, author });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const { title, content, excerpt, author } = req.body;
    const [result] = await pool.query(
      'UPDATE articles SET title = ?, content = ?, excerpt = ?, author = ? WHERE id = ?',
      [title, content, excerpt || content.substring(0, 200), author || 'yy zhang', req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ id: parseInt(req.params.id), title, content, excerpt, author });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 启动 Vite SSR 服务
async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }, 
    appType: 'custom',
    root: process.cwd(), // 明确根目录
    base: '/' // 明确基础路径
  });

  // 关键：Vite 中间件要放在 API 路由之后、前端路由之前
  app.use(vite.middlewares);

  // 处理所有前端页面路由
  app.get(['/', '/articles', '/articles/:id', '/admin', '/admin/:id'], async (req, res) => {
    const url = req.originalUrl;

    try {
      // 1. 用 Node.js 原生 fs.readFile 读取模板
      const templatePath = path.resolve(__dirname, '../index.html');
      const template = await fs.readFile(templatePath, 'utf-8'); 

      // 2. 应用 Vite HTML 转换（注入 HMR、环境变量等）
      const transformedTemplate = await vite.transformIndexHtml(url, template);

      // 3. 加载服务器入口文件
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

      // 4. 渲染 React 应用为 HTML 字符串
      const { appHtml, pageTitle } = await render(url);

      // 5. 注入渲染后的 HTML 到模板中
      const html = transformedTemplate
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<title>my-ssr-blog</title>`, `<title>${pageTitle || 'my-ssr-blog'}</title>`);

      // 6. 返回最终 HTML
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // Vite 错误处理
      vite.ssrFixStacktrace(e);
      console.error('SSR 渲染失败：', e);
      res.status(500).end(`SSR Error: ${e.message}`);
    }
  });

  // 404 处理
  app.use((req, res) => {
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head><title>404 Not Found</title></head>
        <body style="text-align: center; padding: 50px;">
          <h1>404 页面未找到</h1>
          <p>您访问的路径 ${req.originalUrl} 不存在</p>
          <a href="/">返回首页</a>
        </body>
      </html>
    `);
  });

  // 启动服务器
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('支持的路由：/、/articles、/articles/:id、/admin、/admin/:id');
  });
}

// 启动服务
createServer();