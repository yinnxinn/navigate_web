import { useState } from 'react';
import { Card, Button, Typography, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'plus' | 'pro'>('free');

  const handleSubscribe = (plan: 'free' | 'plus' | 'pro') => {
    // TODO: 实现订阅逻辑
    console.log('订阅计划:', plan);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Title level={2} className="text-center mb-12">升级套餐</Title>
      <div className="flex justify-center space-x-8">
        {/* 免费版 */}
        <Card
          className={`w-80 ${selectedPlan === 'free' ? 'border-blue-500' : ''}`}
          onClick={() => setSelectedPlan('free')}
          hoverable
        >
          <Title level={3}>Free</Title>
          <div className="text-3xl font-bold mb-4">
            $<span className="text-5xl">0</span>
            <span className="text-base font-normal">/月</span>
          </div>
          <Text>了解 AI 如何帮助您处理日常任务</Text>
          <Button
            type={selectedPlan === 'free' ? 'primary' : 'default'}
            block
            className="mt-4"
            onClick={() => handleSubscribe('free')}
          >
            当前的套餐
          </Button>
          <ul className="mt-6 space-y-4">
            <li>✓ 访问 GPT-4o mini 和推理</li>
            <li>✓ 标准语音模式</li>
            <li>✓ 通过搜索从网络获取实时数据</li>
            <li>✓ 对 GPT-4o 的有限访问权限</li>
            <li>✓ 对文件上传、高级数据分析和图片生成功能的有限访问权限</li>
            <li>✓ 使用自定义 GPT</li>
          </ul>
        </Card>

        {/* Plus版 */}
        <Card
          className={`w-80 ${selectedPlan === 'plus' ? 'border-blue-500' : ''}`}
          onClick={() => setSelectedPlan('plus')}
          hoverable
        >
          <Title level={3}>Plus <Tag color="blue">热门</Tag></Title>
          <div className="text-3xl font-bold mb-4">
            $<span className="text-5xl">20</span>
            <span className="text-base font-normal">/月</span>
          </div>
          <Text>借助扩展的访问权限提升工作效率和创造力</Text>
          <Button
            type={selectedPlan === 'plus' ? 'primary' : 'default'}
            block
            className="mt-4"
            onClick={() => handleSubscribe('plus')}
          >
            获取 Plus
          </Button>
          <ul className="mt-6 space-y-4">
            <li>✓ Free 套餐中的所有功能</li>
            <li>✓ 对通用、文件上传、高级数据分析、网页浏览图片生成功能的扩展访问权限</li>
            <li>✓ 标准和高级语言模式</li>
            <li>✓ 对深入研究、多个推理模型（o3-mini、o3-mini-high 和 o1）以及 GPT-4.5 研究预览版的访问权限</li>
            <li>✓ 创建和使用任务、项目及自定义 GPT</li>
            <li>✓ 对 Sora 视觉生成功能的有限访问权限</li>
            <li>✓ 测试新功能的机会</li>
          </ul>
        </Card>

        {/* Pro版 */}
        <Card
          className={`w-80 ${selectedPlan === 'pro' ? 'border-blue-500' : ''}`}
          onClick={() => setSelectedPlan('pro')}
          hoverable
        >
          <Title level={3}>Pro</Title>
          <div className="text-3xl font-bold mb-4">
            $<span className="text-5xl">200</span>
            <span className="text-base font-normal">/月</span>
          </div>
          <Text>以更高访问级别完全体验 OpenAI 的功能</Text>
          <Button
            type={selectedPlan === 'pro' ? 'primary' : 'default'}
            block
            className="mt-4"
            onClick={() => handleSubscribe('pro')}
          >
            获取 Pro
          </Button>
          <ul className="mt-6 space-y-4">
            <li>✓ Plus 套餐中的所有功能</li>
            <li>✓ 无限制访问所有推理模型型 GPT-4o</li>
            <li>✓ 对高级语言功能的无限制访问权限</li>
            <li>✓ 对深入研究的扩展访问权限，该功能可对复杂任务执行多步骤在线研究。</li>
            <li>✓ 访问 GPT-4.5 和 Operator 研究预览版</li>
            <li>✓ 访问 o1 pro 模型，该模型使用多个计算提供高准确度的答案</li>
            <li>✓ 对 Sora 视觉生成功能的扩展访问权限</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;