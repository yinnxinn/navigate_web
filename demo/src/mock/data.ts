import { Website, User, Group } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: '123456'
  },
  {
    id: '2',
    username: 'test',
    email: 'test@example.com',
    password: '123456'
  }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'DeFi',
    description: '去中心化金融协议和平台',
    createdBy: '1',
    websites: ['1', '2', '3', '4']
  },
  {
    id: '2',
    name: 'NFT',
    description: 'NFT交易市场和创作平台',
    createdBy: '1',
    websites: ['5', '6', '7', '8']
  },
  {
    id: '3',
    name: 'GameFi',
    description: '区块链游戏和游戏金融',
    createdBy: '2',
    websites: ['9', '10', '11', '12']
  },
  {
    id: '4',
    name: 'DAO',
    description: '去中心化自治组织工具和平台',
    createdBy: '2',
    websites: ['13', '14', '15', '16']
  },
  {
    id: '5',
    name: '区块链基础设施',
    description: '区块链开发工具和基础设施',
    createdBy: '1',
    websites: ['17', '18', '19', '20']
  }
];

export const mockWebsites: Website[] = [
  {
    id: '1',
    title: 'Uniswap',
    url: 'https://uniswap.org',
    description: '最大的去中心化交易所之一',
    group: '1',
    createdBy: '1'
  },
  {
    id: '2',
    title: 'Aave',
    url: 'https://aave.com',
    description: '去中心化借贷协议',
    group: '1',
    createdBy: '1'
  },
  {
    id: '3',
    title: 'Curve',
    url: 'https://curve.fi',
    description: '稳定币交易平台',
    group: '1',
    createdBy: '1'
  },
  {
    id: '4',
    title: 'MakerDAO',
    url: 'https://makerdao.com',
    description: 'DAI稳定币发行平台',
    group: '1',
    createdBy: '1'
  },
  {
    id: '5',
    title: 'OpenSea',
    url: 'https://opensea.io',
    description: '最大的NFT交易市场',
    group: '2',
    createdBy: '1'
  },
  {
    id: '6',
    title: 'Rarible',
    url: 'https://rarible.com',
    description: 'NFT创作和交易平台',
    group: '2',
    createdBy: '1'
  },
  {
    id: '7',
    title: 'Foundation',
    url: 'https://foundation.app',
    description: '高质量艺术品NFT平台',
    group: '2',
    createdBy: '1'
  },
  {
    id: '8',
    title: 'SuperRare',
    url: 'https://superrare.com',
    description: '数字艺术品NFT市场',
    group: '2',
    createdBy: '1'
  },
  {
    id: '9',
    title: 'Axie Infinity',
    url: 'https://axieinfinity.com',
    description: '最受欢迎的区块链游戏之一',
    group: '3',
    createdBy: '2'
  },
  {
    id: '10',
    title: 'The Sandbox',
    url: 'https://www.sandbox.game',
    description: '区块链虚拟世界游戏',
    group: '3',
    createdBy: '2'
  },
  {
    id: '11',
    title: 'Decentraland',
    url: 'https://decentraland.org',
    description: '去中心化虚拟现实平台',
    group: '3',
    createdBy: '2'
  },
  {
    id: '12',
    title: 'Illuvium',
    url: 'https://illuvium.io',
    description: '开放世界RPG区块链游戏',
    group: '3',
    createdBy: '2'
  },
  {
    id: '13',
    title: 'Snapshot',
    url: 'https://snapshot.org',
    description: 'DAO治理投票平台',
    group: '4',
    createdBy: '2'
  },
  {
    id: '14',
    title: 'Aragon',
    url: 'https://aragon.org',
    description: 'DAO创建和管理平台',
    group: '4',
    createdBy: '2'
  },
  {
    id: '15',
    title: 'DAOhaus',
    url: 'https://daohaus.club',
    description: 'Moloch DAO创建平台',
    group: '4',
    createdBy: '2'
  },
  {
    id: '16',
    title: 'Colony',
    url: 'https://colony.io',
    description: '去中心化组织管理工具',
    group: '4',
    createdBy: '2'
  },
  {
    id: '17',
    title: 'Etherscan',
    url: 'https://etherscan.io',
    description: '以太坊区块浏览器',
    group: '5',
    createdBy: '1'
  },
  {
    id: '18',
    title: 'Infura',
    url: 'https://infura.io',
    description: '区块链基础设施服务',
    group: '5',
    createdBy: '1'
  },
  {
    id: '19',
    title: 'Alchemy',
    url: 'https://www.alchemy.com',
    description: 'Web3开发平台',
    group: '5',
    createdBy: '1'
  },
  {
    id: '20',
    title: 'Hardhat',
    url: 'https://hardhat.org',
    description: '以太坊开发环境',
    group: '5',
    createdBy: '1'
  }
];