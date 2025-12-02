import { Link } from 'react-router-dom'
import { Row, Col, Typography, Button, Space, Divider } from 'antd'
import {
  RocketOutlined,
  DatabaseOutlined,
  BranchesOutlined,
  FallOutlined,
  EyeOutlined,
  EditOutlined,
} from '@ant-design/icons'
import FeatureCard from '../components/FeatureCard'

const { Title, Paragraph } = Typography

export default function Home() {
  return (
    <div>
      <div
        style={{
          padding: '80px 50px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4eaf1 100%)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Title
            level={1}
            style={{
              fontSize: '42px',
              marginBottom: '20px',
              color: '#1f2329',
            }}
          >
            现代化 SSR 博客系统
          </Title>
          <Paragraph
            style={{
              fontSize: '18px',
              color: '#4e5969',
              marginBottom: '40px',
              lineHeight: '1.8',
            }}
          >
            基于 React、Express 和 MySQL
            构建的高性能博客平台。支持服务端渲染、智能缓存、 AI
            写作助手和优雅降级方案。
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              icon={<EyeOutlined />}
              style={{ padding: '0 30px', fontSize: '16px' }}
            >
              <Link to="/articles" style={{ color: 'white' }}>
                浏览文章
              </Link>
            </Button>
            <Button
              size="large"
              icon={<EditOutlined />}
              style={{ padding: '0 30px', fontSize: '16px' }}
            >
              <Link to="/admin">管理文章</Link>
            </Button>
          </Space>
        </div>
      </div>

      {/* 核心特性区域 */}
      <div style={{ padding: '80px 50px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title
            level={2}
            style={{
              textAlign: 'center',
              marginBottom: '60px',
              color: '#1f2329',
            }}
          >
            核心特性
          </Title>

          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard
                icon={<RocketOutlined />}
                title="高性能 SSR"
                description="服务端渲染提升首屏加载速度和SEO表现，提供更好的用户体验"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard
                icon={<DatabaseOutlined />}
                title="智能缓存"
                description="结合HTTP缓存和Redis缓存，大幅提升系统响应速度和并发能力"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard
                icon={<BranchesOutlined />}
                title="AI写作助手"
                description="基于AI的智能写作辅助，帮助你快速生成高质量的博客内容"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard
                icon={<FallOutlined />}
                title="优雅降级"
                description="服务端异常时自动切换到客户端渲染，保证系统可用性"
              />
            </Col>
          </Row>
        </div>
      </div>

    </div>
  )
}
