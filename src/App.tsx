import React, { useState } from 'react';
import { RGB, HarmonyScheme } from './types/color';
import { generateRandomColor } from './utils/harmonySchemes';
import { generateId, savePalette } from './utils/storage';
import ColorInput from './components/ColorInput';
import ColorPreview from './components/ColorPreview';
import PaletteSchemeItem from './components/PaletteSchemeItem';
import SavedPalettes from './components/SavedPalettes';

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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-full mx-auto px-4">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎨 调色盘
          </h1>
          <p className="text-gray-400">
            输入RGB颜色，自动推荐专业配色方案
          </p>
        </header>
        
        {savedNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
            ✅ 配色方案已保存!
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧：颜色输入和预览 */}
          <div className="lg:w-80 flex-shrink-0 space-y-4">
            <ColorInput rgb={rgb} onChange={setRgb} onRandom={handleRandom} />
            <ColorPreview rgb={rgb} />
          </div>
          
          {/* 右侧：所有配色方案纵向排列 */}
          <div className="flex-1 space-y-4">
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
          <p>💡 提示: 点击颜色卡片上的按钮可复制颜色代码</p>
        </footer>
      </div>
    </div>
  );
};

export default App;