import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { lightTheme, darkTheme } from '../theme';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import zh from '../locales/zh';
import en from '../locales/en';

type ThemeType = 'light' | 'dark';
type LangType = 'zh' | 'en';

interface AppContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  lang: LangType;
  toggleLang: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem('theme') as ThemeType) || 'light'
  );
  const [lang, setLang] = useState<LangType>(
    (localStorage.getItem('lang') as LangType) || 'zh'
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value = lang === 'zh' ? zh : en;
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    return value;
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      <ConfigProvider
        theme={theme === 'light' ? lightTheme : darkTheme}
        locale={lang === 'zh' ? zhCN : enUS}
      >
        {children}
      </ConfigProvider>
    </AppContext.Provider>
  );
};