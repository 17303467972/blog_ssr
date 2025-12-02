// src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Row, Col, Typography, Avatar, Dropdown } from 'antd';
import { 
  HomeOutlined, 
  FileTextOutlined, 
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

export default function BlogHeader() {
  const location = useLocation();

  // 用户菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  // 主导航菜单
  const mainMenuItems = [
    {
      key: '/articles',
      icon: <FileTextOutlined />,
      label: <Link to="/articles">文章</Link>,
    },
    {
      key: '/admin',
      icon: <SettingOutlined />,
      label: <Link to="/admin">管理</Link>,
    },
  ];

  return (
    <Header style={{ background: '#fff', padding: '0 50px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
      <Row justify="space-between" align="middle" style={{ height: '100%' }}>
        {/* 左侧 Logo 和标题 */}
        <Col>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '4px', 
              backgroundColor: '#1890ff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white'
            }}>
              <FileTextOutlined />
            </div>
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>SSR 博客系统</Title>
          </Link>
        </Col>

        {/* 右侧导航和用户信息 */}
        <Col>
          <Row align="middle" gap={4}>
            <Col>
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={mainMenuItems}
                style={{ borderBottom: 0 }}
              />
            </Col>
            <Col>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Avatar icon={<UserOutlined />} />
                  <span>yy zhang</span>
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
}