import { Card, Typography, Space } from 'antd'
import PropTypes from 'prop-types' 

const { Title, Text } = Typography

export default function FeatureCard({ icon, title, description }) {
  return (
    <Card
      variant
      style={{
        height: '100%',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      hoverable
    >
      <Space
        orientation="vertical"
        size="middle"
        style={{ width: '100%', padding: '20px 0' }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#e6f7ff',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#1890ff',
          }}
        >
          {icon}
        </div>
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        <Text type="secondary">{description}</Text>
      </Space>
    </Card>
  )
}

// 添加 PropTypes 定义
FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired, 
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
