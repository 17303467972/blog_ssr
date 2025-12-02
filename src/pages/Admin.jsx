// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { articleService } from '../api/articleService';

const { Title, Text, Link } = Typography;
const { TextArea } = Input;

export default function Admin() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  useEffect(() => {
    // 如果是编辑模式，获取文章数据
    if (editId) {
      fetchArticleToEdit();
    }
  }, [editId, form]);

  const fetchArticleToEdit = async () => {
    try {
      const article = await articleService.getArticle(editId);
      form.setFieldsValue({
        title: article.title,
        content: article.content
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      // 添加作者信息（实际应用中应该从登录用户获取）
      const articleData = {
        ...values,
        author: 'yy zhang'
      };

      if (editId) {
        // 更新文章
        await articleService.updateArticle(editId, articleData);
        message.success('Article updated successfully');
      } else {
        // 创建新文章
        await articleService.createArticle(articleData);
        message.success('Article created successfully');
      }
      
      form.resetFields();
      navigate('/articles');
    } catch (error) {
      message.error(error.message);
      console.log('Failed:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '30px 50px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        {editId ? 'Edit Article' : 'Create New Article'}
      </Title>
      
      <Link to="/articles" style={{ marginBottom: '20px', display: 'inline-block' }}>
        <Text type="link" icon={<ArrowLeftOutlined />}>Back to Articles</Text>
      </Link>
      
      <Card variant>
        <Form
          form={form}
          layout="vertical"
          name="article_creation_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title of your article!' }]}
          >
            <Input placeholder="Enter article title" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please input the content of your article!' }]}
          >
            <TextArea rows={15} placeholder="Enter article content (supports HTML tags)" />
          </Form.Item>
          
          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit" block icon={<SaveOutlined />}>
              {editId ? 'Update Article' : 'Publish Article'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Text type="secondary" style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
        Hint: You can use HTML tags like &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt; in the content.
      </Text>
    </div>
  );
}