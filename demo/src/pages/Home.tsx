import { useState, useEffect } from 'react';
import { Tabs, List, Button, Space, Typography, message, Input, Avatar, Tooltip, Card } from 'antd';
import { StarOutlined, StarFilled, FolderOutlined, SearchOutlined, FireOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UpdatesPanel from '../components/UpdatesPanel';
import HistoryPanel from '../components/HistoryPanel';
import { mockGroups, mockWebsites } from '../mock/data';
import { useApp } from '../contexts/AppContext';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Website {
  _id: string;
  title: string;
  url: string;
  description: string;
  followers: string[];
  group?: string;
}

interface Group {
  _id: string;
  name: string;
  description: string;
  followers: string[];
  websites: Website[];
}

const Home = () => {
  const { t } = useApp();
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [followedGroups, setFollowedGroups] = useState<Group[]>([]);
  const [followedWebsites, setFollowedWebsites] = useState<Website[]>([]);
  const [recommendedGroups, setRecommendedGroups] = useState<Group[]>([]);
  const [popularGroups, setPopularGroups] = useState<Group[]>([]);
  const [popularWebsites, setPopularWebsites] = useState<Website[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const mockData = mockGroups.map(group => ({
          ...group,
          _id: group.id,
          followers: [],
          websites: mockWebsites
            .filter(website => website.group === group.id)
            .map(website => ({
              ...website,
              _id: website.id,
              followers: []
            }))
        }));
        setGroups(mockData);

        // 模拟用户关注的分组和网站
        const userId = localStorage.getItem('userId');
        const userFollowedGroups = mockData.filter(group => group.createdBy === userId);
        setFollowedGroups(userFollowedGroups);

        const userFollowedWebsites = mockWebsites
          .filter(website => website.createdBy === userId)
          .map(website => ({ ...website, _id: website.id, followers: [] }));
        setFollowedWebsites(userFollowedWebsites);

        // 模拟推荐的分组（这里简单地选择一些分组作为推荐）
        setRecommendedGroups(mockData.slice(0, 3));

        // 模拟热门分组和网站（按followers数量排序，这里简单模拟）
        setPopularGroups(mockData.slice(2, 5));
        setPopularWebsites(mockWebsites
          .slice(0, 6)
          .map(website => ({ ...website, _id: website.id, followers: [] })));

      } catch (error) {
        console.error('获取数据错误:', error);
        message.error('获取数据失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleFollowGroup = async (groupId: string) => {
    try {
      setGroups(groups.map(group =>
        group._id === groupId
          ? {
            ...group,
            followers: group.followers.includes(localStorage.getItem('userId'))
              ? group.followers.filter(id => id !== localStorage.getItem('userId'))
              : [...group.followers, localStorage.getItem('userId')]
          }
          : group
      ));
      message.success('操作成功');
    } catch (error) {
      console.error('关注分组错误:', error);
      message.error('操作失败，请稍后重试');
    }
  };

  const handleFollowWebsite = async (websiteId: string) => {
    try {
      setGroups(groups.map(group => ({
        ...group,
        websites: group.websites.map(website =>
          website._id === websiteId
            ? {
              ...website,
              followers: website.followers.includes(localStorage.getItem('userId'))
                ? website.followers.filter(id => id !== localStorage.getItem('userId'))
                : [...website.followers, localStorage.getItem('userId')]
            }
            : website
        )
      })));
      message.success('操作成功');
    } catch (error) {
      console.error('关注网站错误:', error);
      message.error('操作失败，请稍后重试');
    }
  };

  const WebsiteCard = ({ website }: { website: Website }) => (
    <div className="p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer relative group">
      <div className="flex items-center justify-center mb-2">
        <Avatar
          src={`https://www.google.com/s2/favicons?domain=${website.url}&sz=32`}
          shape="square"
          size={48}
        />
      </div>
      <Tooltip title={website.title}>
        <div className="text-center font-medium truncate mb-1">
          {website.title}
        </div>
      </Tooltip>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          type="text"
          size="small"
          icon={website.followers?.includes(localStorage.getItem('userId')) ? <StarFilled /> : <StarOutlined />}
          onClick={() => handleFollowWebsite(website._id)}
          title={website.followers?.includes(localStorage.getItem('userId')) ? t('home.unfollow') : t('home.follow')}
        />
      </div>
      <a
        href={website.url}
        target="blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={website.title}
      />
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <HistoryPanel />
        <UpdatesPanel />
        {/* 添加订阅入口 */}
        <div className="fixed left-4 bottom-4 z-50">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate('/subscription')}
            className="shadow-lg"
          >
            升级 Plus
          </Button>
        </div>
        <div className="mt-8">
          {/* 我关注的 */}
          <div className="mb-8">
            <Title level={3}>我关注的</Title>
            <Tabs defaultActiveKey="groups">
              <TabPane tab="分组" key="groups">
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                  dataSource={followedGroups}
                  renderItem={group => (
                    <List.Item>
                      <Card
                        className="border shadow-sm"
                        title={
                          <Space>
                            <FolderOutlined />
                            <span>{group.name}</span>
                          </Space>
                        }
                        extra={
                          <Button
                            type="text"
                            size="small"
                            icon={<StarFilled />}
                            onClick={() => handleFollowGroup(group._id)}
                          />
                        }
                      >
                        <Text type="secondary">{group.description}</Text>
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="网站" key="websites">
                <List
                  grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                  dataSource={followedWebsites}
                  renderItem={website => (
                    <List.Item>
                      <WebsiteCard website={website} />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </div>

          {/* 推荐的 */}
          <Card className="mb-8">
            <Title level={3}>推荐的分组</Title>
            <Tabs>
              {recommendedGroups.map(group => (
                <TabPane
                  tab={
                    <Space>
                      <FolderOutlined />
                      <span>{group.name}</span>
                    </Space>
                  }
                  key={group._id}
                >
                  <List
                    grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                    dataSource={group.websites}
                    renderItem={website => (
                      <List.Item>
                        <WebsiteCard website={website} />
                      </List.Item>
                    )}
                  />
                </TabPane>
              ))}
            </Tabs>
          </Card>

          {/* 随便看看 */}
          <Card>
            <Title level={3}>随便看看</Title>
            <div className="mb-8">
              <Title level={4}>热门分组</Title>
              <Tabs>
                {popularGroups.map(group => (
                  <TabPane
                    tab={
                      <Space>
                        <FolderOutlined />
                        <span>{group.name}</span>
                        <FireOutlined className="text-red-500" />
                      </Space>
                    }
                    key={group._id}
                  >
                    <List
                      grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                      dataSource={group.websites}
                      renderItem={website => (
                        <List.Item>
                          <WebsiteCard website={website} />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                ))}
              </Tabs>
            </div>
            
            <div>
              <Title level={4}>热门网站</Title>
              <List
                grid={{ gutter: 16, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
                dataSource={popularWebsites}
                renderItem={website => (
                  <List.Item>
                    <WebsiteCard website={website} />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;