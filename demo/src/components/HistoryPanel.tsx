import { useState, useEffect } from 'react';
import { Timeline, Card, Typography, Avatar, List, Divider } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { mockWebsites } from '../mock/data';

const { Title, Text } = Typography;

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  timestamp: string;
  date: string;
}

interface GroupedHistory {
  date: string;
  items: HistoryItem[];
}

const HistoryPanel = () => {
  const [history, setHistory] = useState<GroupedHistory[]>([]);

  useEffect(() => {
    // 模拟获取浏览历史数据
    const mockHistory = mockWebsites.slice(0, 15).map((website, index) => ({
      id: `${Date.now()}-${index}`,
      title: website.title,
      url: website.url,
      timestamp: new Date(Date.now() - index * 3600000 * (Math.random() * 24)).toLocaleString(),
      date: new Date(Date.now() - index * 3600000 * (Math.random() * 24)).toLocaleDateString()
    }));

    // 按日期分组
    const grouped = mockHistory.reduce((groups: GroupedHistory[], item) => {
      const group = groups.find(g => g.date === item.date);
      if (group) {
        group.items.push(item);
      } else {
        groups.push({ date: item.date, items: [item] });
      }
      return groups;
    }, []);

    // 按日期排序
    grouped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setHistory(grouped);
  }, []);

  return (
    <div className="fixed left-4 top-24 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden hidden lg:block">
      <div className="flex items-center justify-between mb-4">
        <Title level={4} className="m-0">浏览历史</Title>
        <ClockCircleOutlined />
      </div>
      <div className="h-[calc(100vh-12rem)] overflow-y-auto">
        {history.map(group => (
          <div key={group.date} className="mb-6">
            <Divider orientation="left">{group.date}</Divider>
            <List
              itemLayout="horizontal"
              dataSource={group.items}
              renderItem={item => (
                <List.Item className="py-2">
                  <div className="flex items-center space-x-3 w-full">
                    <Avatar
                      src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=32`}
                      shape="square"
                      size="small"
                    />
                    <div className="flex-1 min-w-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-blue-500 truncate block"
                      >
                        {item.title}
                      </a>
                      <Text type="secondary" className="text-xs block truncate">
                        {item.timestamp.split(' ')[1]}
                      </Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;