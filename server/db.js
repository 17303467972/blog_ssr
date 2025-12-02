import mysql from 'mysql2/promise';

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',       
  password: 'root', 
  database: 'ssr_blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;