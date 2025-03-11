import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../mock/data';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterForm) => {
    try {
      // 检查邮箱是否已被注册
      const existingUser = mockUsers.find(u => u.email === values.email);
      if (existingUser) {
        message.error('该邮箱已被注册');
        return;
      }

      // 模拟注册成功
      const newUser = {
        id: String(mockUsers.length + 1),
        username: values.username,
        email: values.email,
        password: values.password
      };
      mockUsers.push(newUser);

      message.success('注册成功');
      navigate('/login');
    } catch (error) {
      console.error('注册错误:', error);
      message.error('注册失败，请稍后重试');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">注册</h2>
      <Form
        name="register"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码长度不能小于6位' }
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请确认密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;