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
      primary: '#2E5C8A',
      secondary: '#4A7BA7',
      accent: '#1A4A70',
      bg: '#F8F8F5',
      text: '#1A1A1A',
    },
  },
  {
    id: 'chinese-red',
    name: '中国红',
    nameEn: 'Chinese Red',
    nameJa: '中国紅',
    colors: {
      primary: '#B82828',
      secondary: '#D04040',
      accent: '#8A1818',
      bg: '#FFFAF5',
      text: '#1A0A0A',
    },
  },
  {
    id: 'chinese-ink',
    name: '水墨黑',
    nameEn: 'Chinese Ink',
    nameJa: '水墨黒',
    colors: {
      primary: '#2A2A2A',
      secondary: '#4A4A4A',
      accent: '#0A0A0A',
      bg: '#F5F5F0',
      text: '#0A0A0A',
    },
  },
  {
    id: 'chinese-jade',
    name: '翡翠绿',
    nameEn: 'Jade Green',
    nameJa: '翡翠緑',
    colors: {
      primary: '#1A6848',
      secondary: '#2A8868',
      accent: '#0A4828',
      bg: '#F5FAF5',
      text: '#0A1A0A',
    },
  },
  {
    id: 'chinese-purple',
    name: '紫禁城',
    nameEn: 'Forbidden Purple',
    nameJa: '紫禁城',
    colors: {
      primary: '#683868',
      secondary: '#885088',
      accent: '#482048',
      bg: '#FAF5FA',
      text: '#1A0A1A',
    },
  },
  {
    id: 'macaron-pink',
    name: '马卡龙粉',
    nameEn: 'Macaron Pink',
    nameJa: 'マカロンピンク',
    colors: {
      primary: '#D06080',
      secondary: '#E880A0',
      accent: '#A04060',
      bg: '#FFF8FA',
      text: '#2A0A10',
    },
  },
  {
    id: 'macaron-mint',
    name: '马卡龙绿',
    nameEn: 'Macaron Mint',
    nameJa: 'マカロンミント',
    colors: {
      primary: '#40A080',
      secondary: '#60B898',
      accent: '#208060',
      bg: '#F5FFF8',
      text: '#0A2A1A',
    },
  },
  {
    id: 'macaron-lavender',
    name: '马卡龙紫',
    nameEn: 'Macaron Lavender',
    nameJa: 'マカロンラベンダー',
    colors: {
      primary: '#8060A8',
      secondary: '#9880C0',
      accent: '#604088',
      bg: '#FAF8FF',
      text: '#1A1028',
    },
  },
  {
    id: 'morandi-gray',
    name: '莫兰迪灰',
    nameEn: 'Morandi Gray',
    nameJa: 'モランディグレー',
    colors: {
      primary: '#606058',
      secondary: '#787870',
      accent: '#404038',
      bg: '#F5F5F0',
      text: '#1A1A18',
    },
  },
  {
    id: 'morandi-blue',
    name: '莫兰迪蓝',
    nameEn: 'Morandi Blue',
    nameJa: 'モランディブルー',
    colors: {
      primary: '#487090',
      secondary: '#6088A8',
      accent: '#305070',
      bg: '#F5F8FA',
      text: '#0A1820',
    },
  },
  {
    id: 'morandi-green',
    name: '莫兰迪绿',
    nameEn: 'Morandi Green',
    nameJa: 'モランディグリーン',
    colors: {
      primary: '#507850',
      secondary: '#689068',
      accent: '#305830',
      bg: '#F5FAF5',
      text: '#0A180A',
    },
  },
  {
    id: 'retro-cream',
    name: '复古米黄',
    nameEn: 'Retro Cream',
    nameJa: 'レトロクリーム',
    colors: {
      primary: '#9A7840',
      secondary: '#B89058',
      accent: '#7A5820',
      bg: '#FFF8EC',
      text: '#2A1808',
    },
  },
  {
    id: 'ocean-blue',
    name: '海洋蓝',
    nameEn: 'Ocean Blue',
    nameJa: 'オーシャンブルー',
    colors: {
      primary: '#1860A0',
      secondary: '#3080C0',
      accent: '#084080',
      bg: '#F5FAFF',
      text: '#0A1520',
    },
  },
  {
    id: 'forest-green',
    name: '森林绿',
    nameEn: 'Forest Green',
    nameJa: 'フォレストグリーン',
    colors: {
      primary: '#287030',
      secondary: '#408848',
      accent: '#185020',
      bg: '#F5FFF5',
      text: '#0A150A',
    },
  },
  {
    id: 'sunset-orange',
    name: '日落橙',
    nameEn: 'Sunset Orange',
    nameJa: 'サンセットオレンジ',
    colors: {
      primary: '#C85030',
      secondary: '#E06848',
      accent: '#A03818',
      bg: '#FFFAF5',
      text: '#2A1008',
    },
  },
  {
    id: 'night-mode',
    name: '夜间模式',
    nameEn: 'Night Mode',
    nameJa: 'ナイトモード',
    colors: {
      primary: '#5090C8',
      secondary: '#68A8E0',
      accent: '#3878B0',
      bg: '#1A1A28',
      text: '#E0E0E0',
    },
  },
  {
    id: 'sepia',
    name: '羊皮纸',
    nameEn: 'Sepia',
    nameJa: 'セピア',
    colors: {
      primary: '#705830',
      secondary: '#8A7048',
      accent: '#504018',
      bg: '#F8F0E0',
      text: '#2A1808',
    },
  },
];