import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { SaveOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function Admin() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  // 如果是编辑，加载文章数据
  useState(() => {
    if (isEditing) {
      axios.get(`/api/articles/${id}`)
        .then(({ data }) => {
          form.setFieldsValue({
            title: data.title,
            content: data.content
          });
        })
        .catch(err => {
          message.error('Failed to load article');
          console.error(err);
        });
    }
  }, [id, form, isEditing]);

  const onFinish = (values) => {
    const { title, content } = values;
    const excerpt = content.substring(0, 200).replace(/<[^>]*>?/gm, '');
    
    const request = isEditing 
      ? axios.put(`/api/articles/${id}`, { title, content, excerpt })
      : axios.post('/api/articles', { title, content, excerpt });
      
    request
      .then(() => {
        message.success(isEditing ? 'Article updated successfully' : 'Article published successfully');
        form.resetFields();
        navigate('/articles');
      })
      .catch(err => {
        message.error('Failed to save article');
        console.error(err);
      });
  };

  return (
    <div style={{ padding: '30px 50px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        {isEditing ? 'Edit Article' : 'Create New Article'}
      </Title>
      <Card variant>
        <Form
          form={form}
          layout="vertical"
          name="article_creation_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              icon={isEditing ? <EditOutlined /> : <SaveOutlined />}
            >
              {isEditing ? 'Update Article' : 'Publish Article'}
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