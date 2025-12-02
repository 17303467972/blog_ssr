// src/pages/Article.jsx
import { useParams, Link } from 'react-router-dom';
import { Typography, FloatButton, Divider, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// 同样使用模拟数据
const mockArticles = [
  {
    id: 1,
    title: 'Getting Started with React SSR',
    content: `
      <h3>What is SSR?</h3>
      <p>Server-Side Rendering (SSR) is a technique where a web page is rendered on the server rather than in the browser. This means that when a user requests a page, the server sends back a fully rendered HTML document.</p>
      <h3>Benefits of SSR</h3>
      <ul>
        <li>Improved SEO: Search engines can easily crawl the fully rendered page.</li>
        <li>Faster Initial Load: Users see content faster, especially on slow devices or networks.</li>
        <li>Better Performance for Core Web Vitals: Like Largest Contentful Paint (LCP).</li>
      </ul>
      <p>This is a simplified example, but in a real SSR app, this content would come from a database and be rendered on the server before being sent to the client.</p>
    `,
    date: '2023-10-25',
  },
];

export default function Article() {
  const { id } = useParams();
  const article = mockArticles.find((a) => a.id === parseInt(id));

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
        <Link to="/">
          <Text type="link" icon={<ArrowLeftOutlined />}>Back to Articles</Text>
        </Link>
      </Space>
      
      <Typography>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '10px' }}>
          {article.title}
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '30px' }}>
          {article.date}
        </Text>
        <Divider />
        {/* 使用 dangerouslySetInnerHTML 来渲染 HTML 内容 */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </Typography>

      <FloatButton.BackTop />
    </div>
  );
}