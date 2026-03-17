import React, { useState } from 'react';
import { RGB } from './types/color';
import { generateRandomColor } from './utils/harmonySchemes';
import ColorInput from './components/ColorInput';
import ColorPreview from './components/ColorPreview';
import PaletteSchemeItem from './components/PaletteSchemeItem';
import TextPreview from './components/TextPreview';
import SavedPalettes from './components/SavedPalettes';
import { HarmonyScheme } from './types/color';
import { generateId, savePalette } from './utils/storage';

const App: React.FC = () => {
  const [rgb, setRgb] = useState<RGB>({ r: 100, g: 150, b: 200 });
  const [savedNotification, setSavedNotification] = useState(false);

  const schemes: HarmonyScheme[] = [
    'complementary',
    'analogous',
    'triadic',
    'square',
    'split-complementary',
    'monochromatic',
  ];

  const handleRandom = () => {
    setRgb(generateRandomColor());
  };

  const handleSave = (scheme: HarmonyScheme, colors: RGB[]) => {
    const palette = {
      id: generateId(),
      baseColor: rgb,
      scheme,
      colors,
      createdAt: new Date().toISOString(),
    };
    
    savePalette(palette);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎨 调色盘
          </h1>
          <p className="text-gray-400">
            输入颜色，生成专业配色方案，一键导出 Calibre 样式
          </p>
        </header>
        
        {savedNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            ✅ 配色方案已保存!
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <ColorInput rgb={rgb} onChange={setRgb} onRandom={handleRandom} />
            <ColorPreview rgb={rgb} />
          </div>
          
          <div className="lg:col-span-5">
            <TextPreview baseColor={rgb} />
          </div>
          
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-lg font-bold text-white">配色方案</h2>
            {schemes.map((scheme) => (
              <PaletteSchemeItem
                key={scheme}
                baseColor={rgb}
                scheme={scheme}
                onSave={handleSave}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-6">
          <SavedPalettes />
        </div>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>💡 点击颜色卡片复制色值，点击"导出 Calibre CSS"一键获取阅读器样式</p>
        </footer>
      </div>
    </div>
  );
};

export default App;