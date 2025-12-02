import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {
  Card,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Spin,
  message,
  Modal,
} from 'antd'
import { ReadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

// 1. 获取文章列表数据
const fetchArticles = async () => {
  const { data } = await axios.get('/api/articles')
  return data
}

export default function ArticleList() {
  const queryClient = useQueryClient()

  // 2. 文章列表数据查询
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  })

  // 3. 删除文章接口调用
  const deleteArticle = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/articles/${id}`)
      return id
    },
    onSuccess: () => {
      message.success('文章删除成功')
      // 删除后刷新文章列表
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (err) => {
      message.error('删除失败，请重试')
      console.error('删除文章错误：', err)
    },
  })

  // 4. 删除确认弹窗
  const handleDelete = (id) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这篇文章吗？此操作不可恢复。',
      okText: '删除',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        deleteArticle.mutate(id)
      },
    })
  }

  // 加载状态
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Spin size="large" tip="加载文章列表中..." />
      </div>
    )
  }

  // 错误状态
  if (error || !articles) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: '#f5222d' }}>
        <Title level={4} style={{ marginBottom: '16px' }}>
          加载文章失败
        </Title>
        <Paragraph>请检查网络连接或刷新页面重试</Paragraph>
        <Button
          type="primary"
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['articles'] })
          }
          style={{ marginTop: '16px' }}
        >
          刷新
        </Button>
      </div>
    )
  }

  // 无文章状态
  if (articles.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <Title level={4} style={{ marginBottom: '16px', color: '#666' }}>
          暂无文章
        </Title>
        <Paragraph>您还没有发布任何文章，快去创建第一篇吧！</Paragraph>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginTop: '16px' }}
        >
          <Link to="/admin" style={{ color: 'white' }}>
            发布第一篇文章
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      {/* 顶部标题和发布按钮 */}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}
      >
        <Col>
          <Title level={3} style={{ margin: 0, color: '#4a4a4a' }}>
            最新文章
          </Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link to="/admin" style={{ color: 'white' }}>
              发布新文章
            </Link>
          </Button>
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0', backgroundColor: '#f0f0f0' }} />

      {/* 文章列表卡片 */}
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        {articles.map((article) => (
          <Card
            key={article.id}
            title={
              <Link
                to={`/articles/${article.id}`}
                style={{
                  color: '#1890ff',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.color = '#096dd9')}
                onMouseOut={(e) => (e.target.style.color = '#1890ff')}
              >
                <Title level={4} style={{ margin: 0 }}>
                  {article.title}
                </Title>
              </Link>
            }
            // 卡片右上角：作者、时间、删除按钮
            extra={
              <Space
                size="middle"
                style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}
              >
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  作者: {article.author}
                </Text>
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  {new Date(article.date).toLocaleDateString()}
                </Text>
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(article.id)}
                  // 删除按钮 loading 状态
                  loading={
                    deleteArticle.isPending &&
                    deleteArticle.variables === article.id
                  }
                  style={{
                    padding: '0 8px',
                    fontSize: '13px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.target.style.color = '#d9363e')}
                  onMouseOut={(e) => (e.target.style.color = '')}
                >
                  删除
                </Button>
              </Space>
            }
            hoverable
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Paragraph
              style={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: '15px',
                marginBottom: '0',
              }}
            >
              {article.excerpt || '暂无摘要'}
            </Paragraph>
            <Divider style={{ margin: '16px 0', backgroundColor: '#f5f5f5' }} />
            {/* 阅读全文链接 */}
            <Link
              to={`/articles/${article.id}`}
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              <Text
                type="link"
                icon={<ReadOutlined />}
                style={{
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: '#1890ff',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.target.style.color = '#096dd9')}
                onMouseOut={(e) => (e.target.style.color = '#1890ff')}
              >
                阅读全文 →
              </Text>
            </Link>
          </Card>
        ))}
      </Space>
    </div>
  )
}
