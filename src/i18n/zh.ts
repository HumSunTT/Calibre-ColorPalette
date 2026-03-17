export default {
  title: 'Calibre 调色盘',
  subtitle: '生成专业配色方案，一键导出 Calibre 阅读器样式',
  
  presets: {
    title: '预设色系',
  },
  
  colorInput: {
    title: '颜色输入',
    hexLabel: 'HEX 颜色值',
    hexError: '请输入有效的HEX值',
    random: '随机',
    pickColor: '屏幕取色',
    pickColorNotSupported: '您的浏览器不支持屏幕取色功能，请使用 Chrome/Edge 浏览器',
    pickColorHint: '点击 🎯 按钮可从屏幕任意位置取色',
  },
  
  colorPreview: {
    title: '当前颜色',
  },
  
  textPreview: {
    title: '📖 电子书预览',
    editStyle: '🎨 编辑样式',
    exportCSS: '📦 导出 CSS',
    bg: '背景',
    text: '文字',
    copied: '已复制!',
    copyFailed: '复制失败，请手动复制',
  },
  
  styleEditor: {
    title: '🎨 样式编辑器',
    basicColors: '基础颜色',
    bg: '背景',
    mainText: '主文字',
    secondaryText: '次文字',
    link: '链接',
    blockquote: '引用',
    titleStyles: '标题样式',
    h1Chapter: 'H1 章节',
    h2Section: 'H2 节',
    h3Subsection: 'H3 小节',
    firstSentence: '首句强调',
    color: '颜色',
    fontSize: '字号',
  },
  
  cssModal: {
    title: '📦 Calibre CSS 样式',
    copy: '📋 一键复制 CSS',
    copied: '✓ 已复制到剪贴板',
    selectAll: '全选',
    usage: '使用方法：',
    step1: '打开 Calibre 阅读器',
    step2: '首选项 → 外观 → 样式',
    step3: '粘贴 CSS 到样式框',
    step4: '点击应用',
    tip: '提示：CSS 代码可直接选中复制',
  },
  
  schemes: {
    title: '配色方案',
    save: '💾 保存',
    triadic: '三角色',
    square: '四角色',
    'split-complementary': '分裂互补',
    monochromatic: '单色系',
    'double-complementary': '双互补色',
    compound: '复合色',
    shades: '阴影色',
    neutral: '中性色',
    'five-tone': '五角色',
    'six-tone': '六色色环',
  },
  
  schemeDescriptions: {
    triadic: '色环等距三色，丰富平衡',
    square: '色环等距四色，变化丰富',
    'split-complementary': '主色+互补两侧色，对比和谐',
    monochromatic: '同色相不同明度，简洁优雅',
    'double-complementary': '两组互补色，丰富对比',
    compound: '类比+互补，复杂和谐',
    shades: '同色调不同饱和度，层次丰富',
    neutral: '加入灰色调，柔和淡雅',
    'five-tone': '色环五等分，多彩均衡',
    'six-tone': '色环六等分，绚丽多彩',
  },
  
  sampleText: {
    chapter: '第一章 初遇',
    section1: '第一节 相逢',
    paragraph1: '那是一个深秋的傍晚，夕阳的余晖洒落在古老的石板路上。林晓站在咖啡馆的玻璃窗前，望着窗外匆匆走过的行人，心中泛起一丝莫名的期待。',
    dialog: '"您的拿铁，请慢用。"服务员轻声说道，打断了她纷飞的思绪。',
    paragraph2: '林晓微笑着接过咖啡，目光却不经意间扫过角落里那个安静的身影。那个人正专注地翻阅着一本泛黄的旧书，仿佛周围的喧嚣与他毫无关系。',
    section2: '第二节 心动',
    paragraph3: '就在这一刻，命运悄然转动。她从未想过，一个偶然的邂逅，竟会改变她此后的人生轨迹。窗外秋风轻拂，卷起几片金黄的落叶，在空中打着旋儿飘向远方。',
  },
  
  savedPalettes: {
    title: '💝 已保存的配色',
    expand: '展开',
    collapse: '收起',
    baseColor: '基础色',
    delete: '🗑️ 删除',
    savedAt: '保存时间',
    empty: '暂无保存的配色方案',
  },
  
  footer: {
    tip: '💡 点击颜色卡片复制色值，点击"导出 CSS"一键获取阅读器样式',
  },
  
  notification: {
    saved: '✅ 配色方案已保存!',
  },
};