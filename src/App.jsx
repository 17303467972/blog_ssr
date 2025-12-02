import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout, Typography, message } from 'antd'
import BlogHeader from './components/Header'
import BlogFooter from './components/Footer'
import ArticleList from './pages/ArticleList'
import Article from './pages/Article'
import Admin from './pages/Admin'
import Home from './pages/Home'
import './App.css'

const { Content, Footer } = Layout
const { Title } = Typography

message.config({
  top: 80,
  duration: 2,
})

function App() {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <BlogHeader />

      {/* 内容区域 */}
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div
          className="site-layout-content"
          style={{
            background: '#fff',
            padding: 32,
            margin: 24,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route
              path="/admin"
              element={
                <>
                  <Admin />
                </>
              }
            />
            <Route
              path="/admin/:id"
              element={
                <>
                  <Admin />
                </>
              }
            />
            {/* 个人资料页路由 */}
            <Route
              path="/profile"
              element={
                <>
                  <Title
                    level={2}
                    className="page-title"
                    style={{ marginBottom: 24 }}
                  >
                    个人资料
                  </Title>
                  <div style={{ padding: 24, textAlign: 'center' }}>
                    <p>个人资料页面（待实现）</p>
                  </div>
                </>
              }
            />
            {/* 404 路由 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Content>
     <BlogFooter />
    </Layout>
  )
}

export default App
