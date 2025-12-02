import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Typography, Avatar, Dropdown, message } from 'antd'
import {
  HomeOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const { Header } = Layout
const { Title } = Typography

export default function BlogHeader() {
  const location = useLocation()
  const navigate = useNavigate()

  // 用户菜单点击事件
  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      localStorage.removeItem('userInfo')
      message.success('退出登录成功')
      setTimeout(() => window.location.reload(), 500)
    } else if (key === 'profile') {
      navigate('/profile')
    }
  }

  // 用户菜单
  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: '个人资料' },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
  ]

  // 主导航菜单
  const mainMenuItems = [
    { key: '/', icon: <HomeOutlined />, label: <Link to="/">首页</Link> },
    {
      key: '/articles',
      icon: <FileTextOutlined />,
      label: <Link to="/articles">文章列表</Link>,
    },
    {
      key: '/admin',
      icon: <SettingOutlined />,
      label: <Link to="/admin">发布/管理</Link>,
    },
  ]

  return (
    <Header
      style={{
        background: '#1890ff',
        padding: '0 20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: '64px',
      }}
    >
      {/* 外层 flex 布局 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1890ff',
              }}
            >
              <FileTextOutlined />
            </div>
            <Title level={4} style={{ margin: 0, color: '#fff' }}>
              Blog
            </Title>
          </Link>

          {/* 主导航 */}
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={mainMenuItems}
            style={{
              width: '800px',
              borderBottom: 'none',
              background: 'transparent',
              flex: '0 0 auto',
              overflow: 'visible',
              margin: '10px',
            }}
            theme="dark"
          />
        </div>

        {/* 右侧用户信息 */}
        <div style={{ marginLeft: 'auto' }}>
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
            arrow
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                color: '#fff',
                padding: '4px 8px',
              }}
            >
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: '#fff', color: '#1890ff' }}
              />
              <span style={{ whiteSpace: 'nowrap' }}>yy zhang</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}
