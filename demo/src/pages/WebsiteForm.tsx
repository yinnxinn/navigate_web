import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { GlobalOutlined, FolderOutlined } from '@ant-design/icons';

interface WebsiteFormData {
  title: string;
  url: string;
  description: string;
  groupId?: string;
}

const WebsiteForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: WebsiteFormData) => {
    try {
      const response = await fetch('http://localhost:3000/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.status === 'success') {
        message.success('网址添加成功');
        form.resetFields();
      } else {
        message.error(data.message || '添加失败');
      }
    } catch (error) {
      console.error('添加网址错误:', error);
      message.error('添加失败，请稍后重试');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">添加网址</h2>
      <Form
        form={form}
        name="websiteForm"
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="网站名称"
          rules={[{ required: true, message: '请输入网站名称' }]}
        >
          <Input prefix={<GlobalOutlined />} placeholder="请输入网站名称" />
        </Form.Item>

        <Form.Item
          name="url"
          label="网址"
          rules={[
            { required: true, message: '请输入网址' },
            { type: 'url', message: '请输入有效的网址' }
          ]}
        >
          <Input prefix={<GlobalOutlined />} placeholder="请输入网址" />
        </Form.Item>

        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: '请输入网站描述' }]}
        >
          <Input.TextArea placeholder="请输入网站描述" />
        </Form.Item>

        <Form.Item
          name="groupId"
          label="分组"
        >
          <Select
            placeholder="选择分组"
            allowClear
          >
            {/* TODO: 从API获取分组列表 */}
            <Select.Option value="1">技术博客</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            添加网址
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WebsiteForm;