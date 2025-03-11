import { Layout as AntLayout, Menu } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined, HomeOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Header, Content } = AntLayout;

const Layout = () => {
  const navigate = useNavigate();
  // TODO: 从Redux store获取用户登录状态
  const isLoggedIn = false;

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    ...(isLoggedIn
      ? [
          {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link to="/profile">个人中心</Link>,
          },
        ]
      : [
          {
            key: 'login',
            icon: <LoginOutlined />,
            label: <Link to="/login">登录</Link>,
          },
          {
            key: 'register',
            icon: <UserAddOutlined />,
            label: <Link to="/register">注册</Link>,
          },
        ]),
  ];

  return (
    <AntLayout className="min-h-screen">
      <Header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold">导航聚合平台</div>
            <Menu mode="horizontal" items={menuItems} className="border-none" />
          </div>
        </div>
      </Header>
      <Content className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;