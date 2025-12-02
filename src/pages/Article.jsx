import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {
  Typography,
  FloatButton,
  Divider,
  Space,
  Spin,
  Card,
  Button,
  message,
  Modal,
  Tag,
} from 'antd'
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

// 1. 请求完整文章数据
const fetchFullArticle = async (id) => {
  const { data } = await axios.get(`/api/articles/${id}`)
  return data
}

export default function Article() {
  const { id } = useParams() // 从URL获取文章ID
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 2. 获取文章详情数据
  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchFullArticle(id),
    enabled: !!id, // 只有id存在时才发起请求
    staleTime: 5 * 60 * 1000, // 5分钟内不重复请求
  })

  // 3. 删除文章功能（详情页也支持删除）
  const deleteArticle = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/articles/${id}`)
    },
    onSuccess: () => {
      message.success('文章删除成功')
      navigate('/articles') // 删除后跳回文章列表
    },
    onError: () => {
      message.error('删除失败，请重试')
    },
  })

  // 4. 删除确认弹窗
  const handleDelete = () => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这篇文章吗？此操作不可恢复。',
      okText: '删除',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => deleteArticle.mutate(),
    })
  }

  // 加载状态
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" tip="加载文章中..." />
      </div>
    )
  }

  // 错误/文章不存在状态
  if (error || !article) {
    return (
      <Card style={{ maxWidth: '800px', margin: '40px auto', padding: '50px' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: '#f5222d', marginBottom: '20px' }}>
            文章不存在或已被删除
          </Title>
          <Paragraph style={{ marginBottom: '30px', color: '#666' }}>
            您访问的文章可能已被删除，或文章ID错误
          </Paragraph>
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            <Link to="/articles">返回文章列表</Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      {/* 顶部操作栏：返回、编辑、删除 */}
      <Space orientation="horizontal" style={{ marginBottom: '24px' }}>
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: '16px' }}
        >
          <Link to="/articles" style={{ color: 'inherit' }}>
            返回文章列表
          </Link>
        </Button>

        <Button
          type="default"
          icon={<EditOutlined />}
          style={{ marginRight: '16px' }}
        >
          <Link to={`/admin/${article.id}`} style={{ color: 'inherit' }}>
            编辑文章
          </Link>
        </Button>

        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          loading={deleteArticle.isPending}
        >
          删除文章
        </Button>
      </Space>

      {/* 文章详情卡片 */}
      <Card
        Style={{ padding: '36px' }}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* 文章标题 */}
        <Title
          level={2}
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1f2329',
            fontWeight: 600,
          }}
        >
          {article.title}
        </Title>

        {/* 文章信息：作者、发布时间 */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '36px',
            color: '#888',
            fontSize: '14px',
          }}
        >
          <Space size="middle">
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <UserOutlined style={{ marginRight: '4px' }} />
              {article.author}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <CalendarOutlined style={{ marginRight: '4px' }} />
              {new Date(article.date).toLocaleString()}
            </span>
          </Space>
        </div>

        <Divider style={{ marginBottom: '36px', backgroundColor: '#f0f0f0' }} />

        {/* 文章完整内容 */}
        <div
          style={{
            fontSize: '16px',
            lineHeight: 2.0,
            color: '#333',
            minHeight: '300px',
          }}
          dangerouslySetInnerHTML={{
            __html: article.content || '<p>暂无文章内容</p>',
          }}
        />

        {/* 底部标记 */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Tag color="blue">文章详情</Tag>
        </div>
      </Card>

      {/* 回到顶部按钮 */}
      <FloatButton.BackTop style={{ right: 24, bottom: 24 }} duration={300} />
    </div>
  )
}
