import React, { useState } from 'react';
import { RGB, HarmonyScheme, HARMONY_NAMES } from '../types/color';
import { generateHarmony } from '../utils/harmonySchemes';
import { rgbToHex, getContrastColor } from '../utils/colorConversion';
import { rgbToCssString, copyToClipboard } from '../utils/storage';

interface TextPreviewProps {
  baseColor: RGB;
}

const SAMPLE_TEXT = `第一章 初遇

那是一个深秋的傍晚，夕阳的余晖洒落在古老的石板路上，为这座小城镀上了一层金色的光芒。林晓站在咖啡馆的玻璃窗前，望着窗外匆匆走过的行人，心中泛起一丝莫名的期待。

"您的拿铁，请慢用。"服务员轻声说道，打断了她纷飞的思绪。

"谢谢。"林晓微笑着接过咖啡，目光却不经意间扫过角落里那个安静的身影。那个人正专注地翻阅着一本泛黄的旧书，仿佛周围的喧嚣与他毫无关系。

就在这一刻，命运悄然转动……`;

const schemes: HarmonyScheme[] = [
  'complementary',
  'analogous',
  'triadic',
  'square',
  'split-complementary',
  'monochromatic',
];

const generateCalibreCSS = (bgColor: RGB, textColor: string, accentColor: RGB): string => {
  const bgHex = rgbToHex(bgColor);
  const accentHex = rgbToHex(accentColor);
  
  return `/* Calibre 阅读器样式 - 配色方案 */
/* 使用方法：Calibre -> 首选项 -> 外观 -> 样式 -> 粘贴此CSS */

body {
    background-color: ${bgHex};
    color: ${textColor};
    font-family: "Noto Serif CJK SC", "Source Han Serif CN", "宋体", serif;
    line-height: 1.8;
    padding: 20px 30px;
}

h1, h2, h3 {
    color: ${accentHex};
    margin-top: 1.5em;
    margin-bottom: 0.8em;
}

h1 { font-size: 1.8em; }
h2 { font-size: 1.5em; }
h3 { font-size: 1.3em; }

p {
    text-indent: 2em;
    margin: 0.8em 0;
}

a {
    color: ${accentHex};
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

blockquote {
    border-left: 3px solid ${accentHex};
    margin: 1em 0;
    padding: 0.5em 1em;
    background-color: rgba(255,255,255,0.05);
}

code, pre {
    background-color: rgba(0,0,0,0.2);
    padding: 2px 6px;
    border-radius: 4px;
}

hr {
    border: none;
    border-top: 1px solid ${accentHex}40;
    margin: 2em 0;
}

table {
    border-collapse: collapse;
    margin: 1em auto;
}

th, td {
    border: 1px solid ${accentHex}60;
    padding: 8px 12px;
}

th {
    background-color: rgba(0,0,0,0.2);
}`;
};

const TextPreview: React.FC<TextPreviewProps> = ({ baseColor }) => {
  const [selectedScheme, setSelectedScheme] = useState<HarmonyScheme>('complementary');
  const [copied, setCopied] = useState<string | null>(null);
  const [showCSSModal, setShowCSSModal] = useState(false);

  const { colors } = generateHarmony(baseColor, selectedScheme);
  
  const bgColor = colors[0];
  const textColor = getContrastColor(bgColor);
  const accentColor = colors[1] || colors[0];
  const calibreCSS = generateCalibreCSS(bgColor, textColor, accentColor);

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(type);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  const handleCopyCSS = (type: string) => {
    let cssCode = '';
    if (type === 'simple') {
      cssCode = `background-color: ${rgbToHex(bgColor)};\ncolor: ${textColor};`;
    }
    handleCopy(cssCode, type);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">📖 电子书预览</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCSSModal(true)}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            📦 导出 Calibre CSS
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {schemes.map((scheme) => (
          <button
            key={scheme}
            onClick={() => setSelectedScheme(scheme)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedScheme === scheme
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {HARMONY_NAMES[scheme]}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-6 shadow-xl transition-all duration-300 cursor-pointer"
        style={{ backgroundColor: rgbToCssString(bgColor) }}
        onClick={() => handleCopyCSS('simple')}
        title="点击复制简单CSS"
      >
        <div 
          className="prose max-w-none"
          style={{ color: textColor }}
        >
          <h1 
            className="text-2xl font-bold mb-4"
            style={{ color: rgbToCssString(accentColor) }}
          >
            示例章节
          </h1>
          <div className="text-base leading-relaxed whitespace-pre-wrap font-serif">
            {SAMPLE_TEXT}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div 
          className="rounded-lg p-3 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ backgroundColor: rgbToCssString(bgColor) }}
          onClick={() => handleCopy(rgbToHex(bgColor), 'bg')}
          title="点击复制"
        >
          <div className="text-xs opacity-70" style={{ color: textColor }}>背景色</div>
          <div className="font-mono font-medium" style={{ color: textColor }}>
            {rgbToHex(bgColor)}
          </div>
          {copied === 'bg' && (
            <div className="text-xs mt-1" style={{ color: textColor }}>✓ 已复制</div>
          )}
        </div>
        <div 
          className="rounded-lg p-3 cursor-pointer hover:opacity-80 transition-opacity"
          style={{ backgroundColor: textColor }}
          onClick={() => handleCopy(textColor, 'text')}
          title="点击复制"
        >
          <div className="text-xs opacity-70" style={{ color: rgbToCssString(bgColor) }}>文字色</div>
          <div className="font-mono font-medium" style={{ color: rgbToCssString(bgColor) }}>
            {textColor}
          </div>
          {copied === 'text' && (
            <div className="text-xs mt-1" style={{ color: rgbToCssString(bgColor) }}>✓ 已复制</div>
          )}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-3">
        <div className="text-xs text-gray-400 mb-2">当前方案所有颜色</div>
        <div className="flex gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex-1 h-8 rounded cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: rgbToCssString(color) }}
              onClick={() => handleCopy(rgbToHex(color), `color-${index}`)}
              title={`${rgbToHex(color)} - 点击复制`}
            />
          ))}
        </div>
      </div>

      {showCSSModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowCSSModal(false)}>
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">📦 Calibre CSS 样式</h3>
              <button 
                onClick={() => setShowCSSModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <pre className="text-green-400 text-sm whitespace-pre-wrap">{calibreCSS}</pre>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleCopy(calibreCSS, 'calibre')}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors"
              >
                {copied === 'calibre' ? '✓ 已复制到剪贴板' : '📋 一键复制 CSS'}
              </button>
            </div>
            
            <div className="mt-4 text-sm text-gray-400 space-y-2">
              <p className="font-medium text-white">使用方法：</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>打开 Calibre 阅读器</li>
                <li>点击 <code className="bg-gray-700 px-1 rounded">首选项</code> → <code className="bg-gray-700 px-1 rounded">外观</code></li>
                <li>选择 <code className="bg-gray-700 px-1 rounded">样式</code> 选项卡</li>
                <li>将复制的 CSS 粘贴到样式框中</li>
                <li>点击应用，享受新配色！</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextPreview;