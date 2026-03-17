export interface ColorPreset {
  id: string;
  name: string;
  nameEn: string;
  nameJa: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    text: string;
  };
}

export const colorPresets: ColorPreset[] = [
  {
    id: 'default',
    name: '默认蓝',
    nameEn: 'Default Blue',
    nameJa: 'デフォルト青',
    colors: {
      primary: '#6496C8',
      secondary: '#8DB6CD',
      accent: '#4A90D9',
      bg: '#F5F5F0',
      text: '#2C3E50',
    },
  },
  {
    id: 'chinese-red',
    name: '中国红',
    nameEn: 'Chinese Red',
    nameJa: '中国紅',
    colors: {
      primary: '#C41E3A',
      secondary: '#E74C3C',
      accent: '#B22222',
      bg: '#FFF8F0',
      text: '#3D2314',
    },
  },
  {
    id: 'chinese-ink',
    name: '水墨黑',
    nameEn: 'Chinese Ink',
    nameJa: '水墨黒',
    colors: {
      primary: '#4A5568',
      secondary: '#718096',
      accent: '#2D3748',
      bg: '#E8E6E1',
      text: '#1A202C',
    },
  },
  {
    id: 'chinese-jade',
    name: '翡翠绿',
    nameEn: 'Jade Green',
    nameJa: '翡翠緑',
    colors: {
      primary: '#2D8B6F',
      secondary: '#3DA88A',
      accent: '#1E6B54',
      bg: '#F0F5F0',
      text: '#1A3A28',
    },
  },
  {
    id: 'chinese-purple',
    name: '紫禁城',
    nameEn: 'Forbidden Purple',
    nameJa: '紫禁城',
    colors: {
      primary: '#7B5588',
      secondary: '#9B6BA8',
      accent: '#5A3D66',
      bg: '#F8F5F8',
      text: '#2C1A32',
    },
  },
  {
    id: 'macaron-pink',
    name: '马卡龙粉',
    nameEn: 'Macaron Pink',
    nameJa: 'マカロンピンク',
    colors: {
      primary: '#E8A0B0',
      secondary: '#F0B8C4',
      accent: '#C8788C',
      bg: '#FDF5F5',
      text: '#4A2830',
    },
  },
  {
    id: 'macaron-mint',
    name: '马卡龙绿',
    nameEn: 'Macaron Mint',
    nameJa: 'マカロンミント',
    colors: {
      primary: '#6CB8A0',
      secondary: '#88C8B4',
      accent: '#4A9880',
      bg: '#F0FAF5',
      text: '#1A3830',
    },
  },
  {
    id: 'macaron-lavender',
    name: '马卡龙紫',
    nameEn: 'Macaron Lavender',
    nameJa: 'マカロンラベンダー',
    colors: {
      primary: '#A090C0',
      secondary: '#B8A8D0',
      accent: '#8068A8',
      bg: '#F8F5FA',
      text: '#2A2040',
    },
  },
  {
    id: 'morandi-gray',
    name: '莫兰迪灰',
    nameEn: 'Morandi Gray',
    nameJa: 'モランディグレー',
    colors: {
      primary: '#8A8A80',
      secondary: '#A0A098',
      accent: '#6A6A62',
      bg: '#E8E8E0',
      text: '#2A2A28',
    },
  },
  {
    id: 'morandi-blue',
    name: '莫兰迪蓝',
    nameEn: 'Morandi Blue',
    nameJa: 'モランディブルー',
    colors: {
      primary: '#6890A0',
      secondary: '#80A8B8',
      accent: '#487080',
      bg: '#F0F5F8',
      text: '#1A2830',
    },
  },
  {
    id: 'morandi-green',
    name: '莫兰迪绿',
    nameEn: 'Morandi Green',
    nameJa: 'モランディグリーン',
    colors: {
      primary: '#789878',
      secondary: '#90B090',
      accent: '#587858',
      bg: '#F0F5F0',
      text: '#1A2818',
    },
  },
  {
    id: 'retro-cream',
    name: '复古米黄',
    nameEn: 'Retro Cream',
    nameJa: 'レトロクリーム',
    colors: {
      primary: '#B89868',
      secondary: '#D0B080',
      accent: '#987848',
      bg: '#FAF5E8',
      text: '#3A2818',
    },
  },
  {
    id: 'ocean-blue',
    name: '海洋蓝',
    nameEn: 'Ocean Blue',
    nameJa: 'オーシャンブルー',
    colors: {
      primary: '#2878B0',
      secondary: '#4090C8',
      accent: '#185890',
      bg: '#F0F8F8',
      text: '#0A2030',
    },
  },
  {
    id: 'forest-green',
    name: '森林绿',
    nameEn: 'Forest Green',
    nameJa: 'フォレストグリーン',
    colors: {
      primary: '#388050',
      secondary: '#509868',
      accent: '#286038',
      bg: '#F2F8F0',
      text: '#0A280A',
    },
  },
  {
    id: 'sunset-orange',
    name: '日落橙',
    nameEn: 'Sunset Orange',
    nameJa: 'サンセットオレンジ',
    colors: {
      primary: '#D07040',
      secondary: '#E08858',
      accent: '#B05828',
      bg: '#FDF5F0',
      text: '#3A2010',
    },
  },
  {
    id: 'night-mode',
    name: '夜间模式',
    nameEn: 'Night Mode',
    nameJa: 'ナイトモード',
    colors: {
      primary: '#5DADE2',
      secondary: '#3498DB',
      accent: '#85C1E9',
      bg: '#1A1A2E',
      text: '#D8D8D8',
    },
  },
  {
    id: 'sepia',
    name: '羊皮纸',
    nameEn: 'Sepia',
    nameJa: 'セピア',
    colors: {
      primary: '#8B6848',
      secondary: '#A08060',
      accent: '#6B4828',
      bg: '#F4ECD8',
      text: '#3A2818',
    },
  },
];