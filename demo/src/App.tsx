import { RouterProvider } from 'react-router-dom';
import { Button } from 'antd';
import { TranslationOutlined, BulbOutlined } from '@ant-design/icons';
import router from './router';
import { AppProvider, useApp } from './contexts/AppContext';
import './App.css';

const AppContent = () => {
  const { toggleTheme, toggleLang } = useApp();

  return (
    <>
      <div className="fixed top-4 right-4 space-x-2 z-50">
        <Button
          icon={<TranslationOutlined />}
          onClick={toggleLang}
          shape="circle"
        />
        <Button
          icon={<BulbOutlined />}
          onClick={toggleTheme}
          shape="circle"
        />
      </div>
      <RouterProvider router={router} />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
