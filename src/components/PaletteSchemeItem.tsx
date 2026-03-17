import React from 'react';
import { RGB, HarmonyScheme, HARMONY_NAMES } from '../types/color';
import { generateHarmony } from '../utils/harmonySchemes';
import ColorCard from './ColorCard';

interface PaletteSchemeItemProps {
  baseColor: RGB;
  scheme: HarmonyScheme;
  onSave: (scheme: HarmonyScheme, colors: RGB[]) => void;
}

const PaletteSchemeItem: React.FC<PaletteSchemeItemProps> = ({ baseColor, scheme, onSave }) => {
  const { colors } = generateHarmony(baseColor, scheme);

  const handleSave = () => {
    onSave(scheme, colors);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">{HARMONY_NAMES[scheme]}</h3>
          <p className="text-xs text-gray-400">{getSchemeDescription(scheme)}</p>
        </div>
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow"
        >
          💾 保存
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {colors.map((color, index) => (
          <ColorCard key={index} rgb={color} />
        ))}
      </div>
    </div>
  );
};

const getSchemeDescription = (scheme: HarmonyScheme): string => {
  const descriptions: Record<HarmonyScheme, string> = {
    'complementary': '色环相对两色，强烈对比',
    'analogous': '色环相邻色，和谐统一',
    'triadic': '色环等距三色，丰富平衡',
    'square': '色环等距四色，变化丰富',
    'split-complementary': '主色+互补两侧色，对比和谐',
    'monochromatic': '同色相不同明度，简洁优雅',
  };
  
  return descriptions[scheme];
};

export default PaletteSchemeItem;