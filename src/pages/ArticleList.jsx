// src/pages/ArticleList.jsx
import { Link } from 'react-router-dom';
import { Card, Space, Typography, Row, Col, Divider, Button } from 'antd';
import { ReadOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// 模拟文章数据
const mockArticles = [
  {
    id: 1,
    title: 'Getting Started with React SSR',
    excerpt: 'Learn the basics of Server-Side Rendering with React and Express.',
    date: '2023-10-25',
    author: 'yy zhang'
  },
  {
    id: 2,
    title: 'Vite: The Next Generation Build Tool',
    excerpt: 'Why Vite is faster and better for modern web development.',
    date: '2023-10-20',
    author: 'yy zhang'
  },
  {
    id: 3,
    title: 'MySQL for Beginners',
    excerpt: 'A simple guide to setting up and querying a MySQL database.',
    date: '2023-10-15',
    author: 'yy zhang'
  },
];

export default function ArticleList() {
  return (
    <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: '30px' }}>
        <Col>
          <Title level={2} style={{ margin: 0, color: '#1f2329' }}>文章列表</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/admin" style={{ color: 'white' }}>发布新文章</Link>
          </Button>
        </Col>
      </Row>
      
      <Divider />
      
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        {mockArticles.map((article) => (
          <Card
            key={article.id}
            title={
              <Link to={`/articles/${article.id}`} style={{ color: '#1890ff' }}>
                <Title level={3} style={{ margin: 0 }}>{article.title}</Title>
              </Link>
            }
            extra={
              <Space size="middle">
                <Text type="secondary">作者: {article.author}</Text>
                <Text type="secondary">{article.date}</Text>
              </Space>
            }
            variant
            hoverable
            style={{ transition: 'box-shadow 0.3s ease' }}
          >
            <Paragraph>{article.excerpt}</Paragraph>
            <Divider style={{ margin: '16px 0' }} />
            <Link to={`/articles/${article.id}`}>
              <Text type="link" icon={<ReadOutlined />}>阅读全文</Text>
            </Link>
          </Card>
        ))}
      </Space>
    </div>
  );
}