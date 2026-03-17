import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RGB, HarmonyScheme } from './types/color';
import { generateRandomColor } from './utils/harmonySchemes';
import { hexToRgb } from './utils/colorConversion';
import ColorInput from './components/ColorInput';
import ColorPreview from './components/ColorPreview';
import ColorPresetSelector from './components/ColorPresetSelector';
import PaletteSchemeItem from './components/PaletteSchemeItem';
import TextPreview from './components/TextPreview';
import SavedPalettes from './components/SavedPalettes';
import ImageColorPicker from './components/ImageColorPicker';
import { generateId, savePalette } from './utils/storage';
import { ColorPreset } from './utils/colorPresets';
import { useThemeStore } from './stores/themeStore';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [rgb, setRgb] = useState<RGB>({ r: 100, g: 150, b: 200 });
  const [savedNotification, setSavedNotification] = useState(false);
  const [currentPresetId, setCurrentPresetId] = useState('default');
  const { isDarkMode, toggleTheme } = useThemeStore();

  const schemes: HarmonyScheme[] = [
    'triadic',
    'square',
    'split-complementary',
    'monochromatic',
    'double-complementary',
    'compound',
    'shades',
    'neutral',
    'five-tone',
    'six-tone',
  ];

  const handleRandom = () => {
    setRgb(generateRandomColor());
    setCurrentPresetId('');
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

  const handlePresetSelect = (preset: ColorPreset) => {
    setCurrentPresetId(preset.id);
    setRgb(hexToRgb(preset.colors.primary));
  };

  const handleColorsExtracted = (colors: string[]) => {
    if (colors.length > 0) {
      const primaryColor = colors[0];
      setRgb(hexToRgb(primaryColor));
      setCurrentPresetId('');
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={`min-h-screen py-6 px-4 transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-[1800px] mx-auto">
        <header className="text-center mb-6">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                🎨 {t('title')}
              </h1>
              <p className="text-gray-400">
                {t('subtitle')}
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                title={isDarkMode ? t('theme.lightMode') : t('theme.darkMode')}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <button
              onClick={() => changeLanguage('zh')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                i18n.language === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('ja')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                i18n.language === 'ja' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              日本語
            </button>
          </div>
        </header>
        
        {savedNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            {t('notification.saved')}
          </div>
        )}
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
          <div className="xl:col-span-2 space-y-4">
            <ColorPresetSelector
              onSelect={handlePresetSelect}
              currentPresetId={currentPresetId}
            />
            <ColorInput rgb={rgb} onChange={(r) => { setRgb(r); setCurrentPresetId(''); }} onRandom={handleRandom} />
            <ColorPreview rgb={rgb} />
            <ImageColorPicker onColorsExtracted={handleColorsExtracted} />
          </div>
          
          <div className="xl:col-span-6">
            <TextPreview baseColor={rgb} />
          </div>
          
          <div className="xl:col-span-4 space-y-3">
            <h2 className="text-lg font-bold text-white">{t('schemes.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        </div>
        
        <div className="mt-6">
          <SavedPalettes />
        </div>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>{t('footer.tip')}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;