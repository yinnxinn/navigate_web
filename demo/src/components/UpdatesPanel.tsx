import { useState, useEffect } from 'react';
import { Card, List, Typography, Badge, Drawer, Button, Space, Tag } from 'antd';
import { BellOutlined, ClockCircleOutlined, LinkOutlined } from '@ant-design/icons';
import { mockWebsites, mockGroups } from '../mock/data';

const { Text, Title } = Typography;

interface Update {
  id: string;
  title: string;
  content: string;
  source: string;
  sourceUrl: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  group: string;
}

const UpdatesPanel = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 模拟获取更新数据
  const fetchUpdates = () => {
    setLoading(true);
    // 这里模拟API调用，实际项目中应该调用真实的API
    setTimeout(() => {
      const newUpdates = mockWebsites.slice(0, 5).map((website, index) => ({
        id: `${Date.now()}-${index}`,
        title: `${website.title}更新了内容`,
        content: `AI分析：${website.description}有新的发展动态，建议关注。`,
        source: website.title,
        sourceUrl: website.url,
        timestamp: new Date(Date.now() - index * 3600000).toLocaleString(),
        sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
        group: mockGroups.find(g => g.id === website.group)?.name || ''
      }));
      setUpdates(prev => [...prev, ...newUpdates]);
      setLoading(false);
      setHasMore(updates.length < 50);
    }, 1000);
  };

  useEffect(() => {
    fetchUpdates();
    // 设置定时器，每5分钟获取一次更新
    const timer = setInterval(fetchUpdates, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };

  const UpdateCard = ({ update }: { update: Update }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow">
      <Space direction="vertical" className="w-full">
        <Space className="w-full justify-between">
          <Text strong>{update.title}</Text>
          <Tag color={getSentimentColor(update.sentiment)}>
            {update.sentiment === 'positive' ? '利好' : update.sentiment === 'negative' ? '利空' : '中性'}
          </Tag>
        </Space>
        <Text type="secondary">{update.content}</Text>
        <Space className="w-full justify-between">
          <Space>
            <LinkOutlined />
            <a href={update.sourceUrl} target="_blank" rel="noopener noreferrer">
              {update.source}
            </a>
            <Tag>{update.group}</Tag>
          </Space>
          <Space>
            <ClockCircleOutlined />
            <Text type="secondary">{update.timestamp}</Text>
          </Space>
        </Space>
      </Space>
    </Card>
  );

  const DesktopPanel = () => (
    <div className="fixed right-4 top-24 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-hidden hidden lg:block">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="m-0">实时更新</Title>
        <Badge count={updates.length} />
      </div>
      <div className="h-[calc(100vh-12rem)] overflow-y-auto">
        <List
          dataSource={updates}
          renderItem={update => (
            <List.Item key={update.id}>
              <UpdateCard update={update} />
            </List.Item>
          )}
          loading={loading}
          loadMore={
            hasMore && (
              <div className="text-center mt-4">
                <Button onClick={fetchUpdates} loading={loading}>
                  加载更多
                </Button>
              </div>
            )
          }
        />
      </div>
    </div>
  );

  const MobileDrawer = () => (
    <>
      <div className="fixed right-4 bottom-4 lg:hidden z-50">
        <Badge count={updates.length}>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<BellOutlined />}
            onClick={() => setVisible(true)}
          />
        </Badge>
      </div>
      <Drawer
        title="实时更新"
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        width={320}
      >
        <List
          dataSource={updates}
          renderItem={update => (
            <List.Item key={update.id}>
              <UpdateCard update={update} />
            </List.Item>
          )}
          loading={loading}
          loadMore={
            hasMore && (
              <div className="text-center mt-4">
                <Button onClick={fetchUpdates} loading={loading}>
                  加载更多
                </Button>
              </div>
            )
          }
        />
      </Drawer>
    </>
  );

  return (
    <>
      <DesktopPanel />
      <MobileDrawer />
    </>
  );
};

export default UpdatesPanel;