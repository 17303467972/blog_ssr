// src/pages/Article.jsx
import { useParams, Link } from 'react-router-dom';
import { Typography, FloatButton, Divider, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { articleService } from '../api/articleService';

const { Title, Text, Paragraph } = Typography;

export default function Article({ initialArticle }) {
  const { id } = useParams();
  const [article, setArticle] = useState(initialArticle);

  useEffect(() => {
    // 客户端渲染时获取数据
    if (!initialArticle) {
      fetchArticle();
    }
  }, [initialArticle, id]);

  const fetchArticle = async () => {
    try {
      const data = await articleService.getArticle(id);
      setArticle(data);
    } catch (error) {
      message.error(error.message);
    }
  };

  if (!article) {
    return (
      <div style={{ padding: '30px 50px', textAlign: 'center' }}>
        <Title level={2}>Article Not Found</Title>
        <Paragraph>The article you're looking for doesn't exist.</Paragraph>
        <Link to="/">
          <Text type="link" icon={<ArrowLeftOutlined />}>Back to Home</Text>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px 50px', maxWidth: '800px', margin: '0 auto' }}>
      <Space orientation="horizontal" style={{ marginBottom: '20px' }}>
        <Link to="/articles">
          <Text type="link" icon={<ArrowLeftOutlined />}>Back to Articles</Text>
        </Link>
      </Space>
      
      <Typography>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '10px' }}>
          {article.title}
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '30px' }}>
          {new Date(article.date).toLocaleDateString()} • {article.author}
        </Text>
        <Divider />
        {/* 使用 dangerouslySetInnerHTML 来渲染 HTML 内容 */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </Typography>

      <FloatButton.BackTop />
    </div>
  );
}

// 服务端获取数据
export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const article = await articleService.getArticle(id);
    return {
      initialArticle: article
    };
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    return {
      initialArticle: null
    };
  }
}