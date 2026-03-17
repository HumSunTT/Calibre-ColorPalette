import React from 'react';
import { RGB } from '../types/color';
import { rgbToHex, rgbToString, hslToString, rgbToHsl, getContrastColor } from '../utils/colorConversion';
import { rgbToCssString } from '../utils/storage';

interface ColorPreviewProps {
  rgb: RGB;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ rgb }) => {
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  const backgroundColor = rgbToCssString(rgb);
  const textColor = getContrastColor(rgb);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">当前颜色</h2>
      
      <div
        className="w-full h-40 rounded-xl mb-6 flex items-center justify-center shadow-lg"
        style={{ backgroundColor }}
      >
        <span
          className="text-3xl font-bold"
          style={{ color: textColor }}
        >
          {hex}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">HEX</div>
          <div className="text-white font-mono">{hex}</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">RGB</div>
          <div className="text-white font-mono">{rgbToString(rgb)}</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">HSL</div>
          <div className="text-white font-mono">{hslToString(hsl)}</div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;
