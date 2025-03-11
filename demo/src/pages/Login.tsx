import { Form, Input, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../mock/data';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginForm) => {
    try {
      // 模拟API调用
      const user = mockUsers.find(u => u.email === values.email && u.password === values.password);

      if (user) {
        // 生成模拟token（实际项目中应该由后端生成）
        const mockToken = btoa(JSON.stringify({ userId: user.id, email: user.email }));
        localStorage.setItem('token', mockToken);
        localStorage.setItem('userId', user.id);
        message.success('登录成功');
        navigate('/');
      } else {
        message.error('邮箱或密码错误');
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error('登录失败，请稍后重试');
    }
  };

  const handleThirdPartyLogin = (platform: string) => {
    // TODO: 实现第三方登录
    console.log('第三方登录:', platform);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">登录</h2>
      <Form
        name="login"
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>

        <Divider>或</Divider>

        <div className="flex justify-center space-x-4">
          <Button
            icon={<GithubOutlined />}
            onClick={() => handleThirdPartyLogin('github')}
          >
            GitHub
          </Button>
          <Button
            icon={<GoogleOutlined />}
            onClick={() => handleThirdPartyLogin('google')}
          >
            Google
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;