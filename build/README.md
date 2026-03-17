# 构建资源目录

此目录存放 Electron 打包所需的图标文件。

## 需要的图标文件

- `icon.ico` - Windows 应用图标 (256x256 或更大)
- `icon.icns` - macOS 应用图标
- `icon.png` - Linux 应用图标 (512x512)

## 如何生成图标

### 在线工具
1. 访问 https://www.electronjs.org/docs/latest/tutorial/application-distribution
2. 或使用 https://www.img2ico.com/ 转换图片为 ico 格式

### 本地工具
```bash
# 安装 electron-icon-builder
npm install -D electron-icon-builder

# 从一个 1024x1024 的 PNG 图片生成所有格式
npx electron-icon-builder --input=./icon.png --output=./build
```

## 临时方案
如果不提供图标，electron-builder 会使用默认图标。