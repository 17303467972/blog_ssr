import mysql from 'mysql2/promise';

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       // 替换为你的MySQL用户名
  password: 'root', // 替换为你的MySQL密码
  database: 'ssr_blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;