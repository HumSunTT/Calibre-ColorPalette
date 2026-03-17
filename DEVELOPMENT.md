# Calibre 调色盘 - 开发文档 / Development Documentation / 開発ドキュメント

## 项目概述 / Project Overview / プロジェクト概要

**Calibre 调色盘** 是一款专为 Calibre 电子书阅读器设计的配色工具，帮助用户快速生成专业、美观的阅读配色方案，并一键导出为 Calibre CSS 样式文件。

**Calibre Color Palette** is a color scheme tool designed specifically for Calibre e-book readers, helping users quickly generate professional and beautiful reading color schemes and export them to Calibre CSS style files with one click.

**Calibre カラーパレット**は、Calibre電子書籍リーダー専用に設計された配色ツールで、ユーザーがプロフェッショナルで美しい読書配色を素早く生成し、ワンクリックでCalibre CSSスタイルファイルとしてエクスポートできます。

---

## 功能需求 / Feature Requirements / 機能要件

### 核心功能 / Core Features / コア機能

1. **配色方案生成** / Color Scheme Generation / 配色生成
   - 基于 HSL 颜色空间生成配色
   - 10 种配色算法（单色、互补、三角、矩形等）
   - 17 种预设色系（中国传统色、马卡龙、莫兰迪等）

2. **实时预览** / Real-time Preview / リアルタイムプレビュー
   - 电子书文字预览
   - 多种阅读场景模拟

3. **样式编辑器** / Style Editor / スタイルエディター
   - 背景颜色调整
   - 各位置文字颜色调整（标题、正文、引用等）
   - 字体大小、加粗等特效编辑

4. **一键导出** / One-Click Export / ワンクリックエクスポート
   - 导出 Calibre 兼容的 CSS 样式文件

5. **多语言支持** / Multi-language Support / 多言語サポート
   - 中文 / English / 日本語

6. **屏幕取色** / Screen Color Picker / スクリーンカラーピッカー
   - 支持从屏幕任意位置拾取颜色（Chrome/Edge）

---

## 技术栈 / Tech Stack / 技術スタック

| 技术 / Technology | 版本 | 用途 / Purpose |
|------------------|------|----------------|
| React | 18.2.0 | 前端框架 |
| TypeScript | 5.2.2 | 类型安全 |
| Vite | 5.0.8 | 构建工具 |
| Electron | 28.0.0 | 桌面应用框架 |
| Tailwind CSS | 3.4.0 | 样式框架 |
| i18next | 25.8.18 | 国际化 |
| tinycolor2 | 1.6.0 | 颜色处理 |

---

## 项目结构 / Project Structure / プロジェクト構造

```
color-palette/
├── .github/
│   └── workflows/
│       └── release.yml      # GitHub Actions 自动构建发布
├── electron/
│   └── main.js              # Electron 主进程
├── src/
│   ├── components/          # React 组件
│   │   ├── ColorInput.tsx   # 颜色输入组件
│   │   ├── ColorPicker.tsx  # 屏幕取色组件
│   │   ├── ColorPresets.tsx # 预设色系组件
│   │   ├── ColorSchemes.tsx # 配色方案组件
│   │   ├── ExportButton.tsx # CSS 导出组件
│   │   ├── StyleEditor.tsx  # 样式编辑器
│   │   └── TextPreview.tsx  # 电子书预览
│   ├── data/
│   │   └── colorPresets.ts  # 17 种预设色系数据
│   ├── i18n/
│   │   ├── en.json          # 英文翻译
│   │   ├── ja.json          # 日文翻译
│   │   └── zh.json          # 中文翻译
│   ├── utils/
│   │   └── colorUtils.ts    # 颜色处理工具函数
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 入口文件
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 开发过程 / Development Process / 開発プロセス

### 阶段一：基础功能开发 / Phase 1: Basic Features / フェーズ1：基本機能

1. **初始化项目**
   ```bash
   npm create vite@latest color-palette -- --template react-ts
   cd color-palette
   npm install
   ```

2. **安装依赖**
   ```bash
   npm install tinycolor2 react-i18next i18next i18next-browser-languagedetector
   npm install -D tailwindcss postcss autoprefixer electron electron-builder concurrently wait-on
   ```

3. **配置 Tailwind CSS**
   ```bash
   npx tailwindcss init -p
   ```

### 阶段二：核心功能实现 / Phase 2: Core Features / フェーズ2：コア機能

1. **配色算法实现** (`src/utils/colorUtils.ts`)
   - 实现 HSL 颜色空间转换
   - 实现 10 种配色算法

2. **UI 组件开发**
   - ColorInput: 颜色输入
   - ColorSchemes: 配色方案展示
   - TextPreview: 电子书预览
   - StyleEditor: 样式编辑

3. **国际化配置**
   - 创建中/英/日三语翻译文件
   - 配置 i18next

### 阶段三：Electron 桌面应用 / Phase 3: Electron Desktop App / フェーズ3：Electronアプリ

1. **配置 Electron**
   - 创建 `electron/main.js` 主进程
   - 配置 `package.json` 构建脚本

2. **GitHub Actions 自动发布**
   - 创建 `.github/workflows/release.yml`
   - 配置 Windows 安装包自动构建

---

## 调试过程 / Debugging Process / デバッグプロセス

### 问题 1：HSL 颜色转换错误

**现象 / Issue**: 配色方案显示的都是 `#030303`

**原因 / Cause**: `tinycolor2` 的 `toHsl()` 返回 HSL 值范围是 0-1，而代码期望 0-100

**解决方案 / Solution**:
```typescript
// 错误 / Wrong
const hsl = tinycolor(baseColor).toHsl();
const h = hsl.h; // 0-360
const s = hsl.s; // 0-1 (期望 0-100)
const l = hsl.l; // 0-1 (期望 0-100)

// 正确 / Correct
const hsl = tinycolor(baseColor).toHsl();
const h = hsl.h;        // 0-360
const s = hsl.s * 100;  // 0-100
const l = hsl.l * 100;  // 0-100
```

### 问题 2：输入框失焦问题

**现象 / Issue**: 样式编辑器中的颜色输入框每输入一个字符就失焦

**原因 / Cause**: 组件在每次渲染时重新创建内联函数

**解决方案 / Solution**: 使用 `useCallback` 和稳定的 `key` 属性

### 问题 3：GitHub Actions 构建失败

**现象 1 / Issue 1**: `cannot find specified resource "build/icon.ico"`

**解决方案 / Solution**: 移除 `package.json` 中的图标配置，使用默认图标

**现象 2 / Issue 2**: `GitHub Personal Access Token is not set`

**解决方案 / Solution**: 
1. 在 GitHub 设置中创建 Personal Access Token
2. 添加到仓库 Secrets（名称：`GH_TOKEN`）

**现象 3 / Issue 3**: `GitHub release failed with status: 403`

**解决方案 / Solution**: 在 workflow 中添加 `permissions: contents: write`

---

## 发布流程 / Release Process / リリースプロセス

### 自动发布 / Automatic Release / 自動リリース

1. **创建并推送 tag**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **GitHub Actions 自动执行**
   - 检出代码
   - 安装依赖
   - 构建 Web 应用
   - 构建 Electron 安装包
   - 创建 GitHub Release
   - 上传安装包

3. **下载安装包**
   - 访问 https://github.com/HumSunTT/Calibre-ColorPalette/releases

### 手动本地构建 / Manual Local Build / 手動ローカルビルド

```bash
# 开发模式
npm run electron:dev

# 构建 Windows 安装包
npm run electron:build:win
```

---

## 配置文件说明 / Configuration Files / 設定ファイル

### package.json (electron-builder 配置)

```json
{
  "build": {
    "appId": "com.humsuntt.calibre-color-palette",
    "productName": "Calibre 调色盘",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "electron/**/*",
      "package.json"
    ],
    "win": {
      "target": [{ "target": "nsis", "arch": ["x64"] }]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowToChangeInstallationDirectory": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "Calibre 调色盘"
    }
  }
}
```

### .github/workflows/release.yml

```yaml
name: Build and Release Windows

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - run: npx electron-builder --win --publish never
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: softprops/action-gh-release@v1
        with:
          files: release/*.exe
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 预设色系 / Color Presets / プリセット色系

| 色系名称 | 描述 | 颜色数量 |
|---------|------|---------|
| 中国传统色 | 中国传统色彩 | 12 |
| 日本传统色 | 日本传统色彩 | 12 |
| 马卡龙 | 柔和糖果色 | 6 |
| 莫兰迪 | 高级灰调 | 6 |
| 复古 | 复古怀旧色 | 6 |
| 森林 | 自然绿色系 | 6 |
| 海洋 | 海洋蓝色系 | 6 |
| 日落 | 温暖橙红系 | 6 |
| 薰衣草 | 紫色系 | 6 |
| 大地 | 棕色系 | 6 |
| 霓虹 | 鲜艳荧光色 | 6 |
| 粉彩 | 柔和粉色系 | 6 |
| 咖啡 | 咖啡棕色系 | 6 |
| 秋叶 | 秋季色彩 | 6 |
| 冬日 | 冷色调 | 6 |
| 春天 | 清新绿色 | 6 |
| 夏日 | 明亮活力 | 6 |

---

## 使用说明 / Usage / 使用方法

### 开发 / Development / 開発

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run electron:dev
```

### 构建 / Build / ビルド

```bash
# 构建 Web 应用
npm run build

# 构建 Electron 安装包
npm run electron:build:win
```

### 发布 / Release / リリース

```bash
# 创建并推送 tag 触发自动发布
git tag v1.x.x
git push origin v1.x.x
```

---

## 许可证 / License / ライセンス

MIT License

---

## 作者 / Author / 作者

HumSunTT

- GitHub: https://github.com/HumSunTT
