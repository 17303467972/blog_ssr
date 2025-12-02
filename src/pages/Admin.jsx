// src/pages/Admin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function Admin() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
    // 模拟提交成功
    form.resetFields(); // 重置表单
    navigate('/'); // 跳转到首页
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '30px 50px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Create New Article
      </Title>
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
              Publish Article
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