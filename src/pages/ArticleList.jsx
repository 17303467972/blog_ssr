// src/pages/ArticleList.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Card, Space, Typography, Row, Col, Divider, Button, message } from 'antd';
import { ReadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { articleService } from '../api/articleService';

const { Title, Text, Paragraph } = Typography;

export default function ArticleList({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles || []);
  const navigate = useNavigate();

  useEffect(() => {
    // 客户端渲染时获取数据
    if (!initialArticles) {
      fetchArticles();
    }
  }, [initialArticles]);

  const fetchArticles = async () => {
    try {
      const data = await articleService.getArticles();
      setArticles(data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await articleService.deleteArticle(id);
      setArticles(articles.filter(article => article.id !== id));
      message.success('Article deleted successfully');
    } catch (error) {
      message.error(error.message);
    }
  };

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
        {articles.map((article) => (
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
                <Text type="secondary">{new Date(article.date).toLocaleDateString()}</Text>
                <Button 
                  icon={<EditOutlined />} 
                  size="small"
                  onClick={() => navigate(`/admin?edit=${article.id}`)}
                />
                <Button 
                  icon={<DeleteOutlined />} 
                  size="small" 
                  danger
                  onClick={() => handleDelete(article.id)}
                />
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

// 服务端获取数据
export async function getServerSideProps() {
  try {
    const articles = await articleService.getArticles();
    return {
      initialArticles: articles
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      initialArticles: []
    };
  }
}