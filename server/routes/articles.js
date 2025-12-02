import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 获取所有文章
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, title, excerpt, author, date FROM articles ORDER BY date DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// 获取单篇文章
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// 创建文章
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    // 生成摘要（取前200个字符）
    const excerpt = content.length > 200 
      ? content.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...'
      : content.replace(/<[^>]*>?/gm, '');
      
    const [result] = await pool.query(
      'INSERT INTO articles (title, content, excerpt, author) VALUES (?, ?, ?, ?)',
      [title, content, excerpt, author]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      title, 
      content, 
      excerpt, 
      author 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// 更新文章
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const excerpt = content.length > 200 
      ? content.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...'
      : content.replace(/<[^>]*>?/gm, '');
      
    const [result] = await pool.query(
      'UPDATE articles SET title = ?, content = ?, excerpt = ? WHERE id = ?',
      [title, content, excerpt, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ id: parseInt(req.params.id), title, content, excerpt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// 删除文章
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;