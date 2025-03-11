import { Typography, Card, Tabs, List, Button, Empty } from 'antd';
import { StarFilled, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;

interface Website {
  id: string;
  title: string;
  url: string;
  description: string;
  groupId?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  websites: Website[];
}

const Profile = () => {
  // TODO: 从Redux store获取用户信息和关注数据
  const followedGroups: Group[] = [];
  const followedWebsites: Website[] = [];

  const handleUnfollowGroup = (groupId: string) => {
    // TODO: 实现取消关注分组的逻辑
    console.log('取消关注分组:', groupId);
  };

  const handleUnfollowWebsite = (websiteId: string) => {
    // TODO: 实现取消关注网站的逻辑
    console.log('取消关注网站:', websiteId);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Title level={2}>个人中心</Title>
      <Card>
        <Tabs defaultActiveKey="groups">
          <TabPane tab="关注的分组" key="groups">
            {followedGroups.length > 0 ? (
              <List
                dataSource={followedGroups}
                renderItem={group => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleUnfollowGroup(group.id)}
                      >
                        取消关注
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={group.name}
                      description={group.description}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无关注的分组" />
            )}
          </TabPane>
          <TabPane tab="关注的网站" key="websites">
            {followedWebsites.length > 0 ? (
              <List
                dataSource={followedWebsites}
                renderItem={website => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleUnfollowWebsite(website.id)}
                      >
                        取消关注
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={<a href={website.url} target="_blank" rel="noopener noreferrer">{website.title}</a>}
                      description={website.description}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无关注的网站" />
            )}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;