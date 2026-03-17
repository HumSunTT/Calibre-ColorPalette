import React from 'react';
import { useTranslation } from 'react-i18next';
import { RGB } from '../types/color';
import { rgbToHex, rgbToString, hslToString, rgbToHsl } from '../utils/colorConversion';
import { rgbToCssString } from '../utils/storage';

interface ColorPreviewProps {
  rgb: RGB;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ rgb }) => {
  const { t } = useTranslation();
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const backgroundColor = rgbToCssString(rgb);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-3">{t('colorPreview.title')}</h2>
      
      <div
        className="w-full h-24 rounded-xl mb-4 flex items-center justify-center shadow-lg"
        style={{ backgroundColor }}
      >
        <span
          className="text-2xl font-bold"
          style={{ color: hsl.l > 50 ? '#1a1a1a' : '#FFFFFF' }}
        >
          {hex}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="bg-gray-700/50 rounded-lg p-2">
          <div className="text-xs text-gray-400 mb-0.5">HEX</div>
          <div className="text-white font-mono text-sm">{hex}</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-2">
          <div className="text-xs text-gray-400 mb-0.5">RGB</div>
          <div className="text-white font-mono text-sm">{rgbToString(rgb)}</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-2">
          <div className="text-xs text-gray-400 mb-0.5">HSL</div>
          <div className="text-white font-mono text-sm">{hslToString(hsl)}</div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;