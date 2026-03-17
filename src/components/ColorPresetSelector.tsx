import React from 'react';
import { useTranslation } from 'react-i18next';
import { colorPresets, ColorPreset } from '../utils/colorPresets';

interface ColorPresetSelectorProps {
  onSelect: (preset: ColorPreset) => void;
  currentPresetId: string;
}

const ColorPresetSelector: React.FC<ColorPresetSelectorProps> = ({ onSelect, currentPresetId }) => {
  const { t, i18n } = useTranslation();

  const getPresetName = (preset: ColorPreset) => {
    switch (i18n.language) {
      case 'zh':
        return preset.name;
      case 'ja':
        return preset.nameJa;
      default:
        return preset.nameEn;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-3">🎨 {t('presets.title')}</h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {colorPresets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={`group relative rounded-lg p-2 transition-all hover:scale-105 ${
              currentPresetId === preset.id
                ? 'ring-2 ring-blue-500 bg-gray-700'
                : 'bg-gray-700/50 hover:bg-gray-700'
            }`}
          >
            <div className="flex gap-0.5 mb-1.5 justify-center">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: preset.colors.primary }}
              />
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: preset.colors.secondary }}
              />
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: preset.colors.accent }}
              />
            </div>
            <div 
              className="text-xs text-center truncate"
              style={{ color: currentPresetId === preset.id ? '#fff' : '#9CA3AF' }}
            >
              {getPresetName(preset)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPresetSelector;