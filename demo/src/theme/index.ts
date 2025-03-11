import { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
    colorBorder: '#d9d9d9',
    borderRadius: 6,
  },
  components: {
    Card: {
      colorBgContainer: '#ffffff',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    },
    Button: {
      borderRadius: 4,
    },
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgContainer: '#141414',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.45)',
    colorBorder: '#303030',
    borderRadius: 6,
  },
  components: {
    Card: {
      colorBgContainer: '#1f1f1f',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    },
    Button: {
      borderRadius: 4,
    },
  },
};