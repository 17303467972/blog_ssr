// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import BlogHeader from './components/Header';
import BlogFooter from './components/Footer';
import Home from './pages/Home';
import Article from './pages/Article';
import ArticleList from './pages/ArticleList';
import Admin from './pages/Admin';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <BlogHeader />
        <Content style={{ flex: 1, background: '#fff' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Content>
        <BlogFooter />
      </Layout>
    </Router>
  );
}

export default App;