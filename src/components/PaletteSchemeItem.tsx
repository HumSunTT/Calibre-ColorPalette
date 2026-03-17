import React from 'react';
import { useTranslation } from 'react-i18next';
import { RGB, HarmonyScheme } from '../types/color';
import { generateHarmony } from '../utils/harmonySchemes';
import ColorCard from './ColorCard';

interface PaletteSchemeItemProps {
  baseColor: RGB;
  scheme: HarmonyScheme;
  onSave: (scheme: HarmonyScheme, colors: RGB[]) => void;
}

const PaletteSchemeItem: React.FC<PaletteSchemeItemProps> = ({ baseColor, scheme, onSave }) => {
  const { t } = useTranslation();
  const { colors } = generateHarmony(baseColor, scheme);

  const handleSave = () => {
    onSave(scheme, colors);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-base font-bold text-white">{t(`schemes.${scheme}`)}</h3>
          <p className="text-xs text-gray-400">{t(`schemeDescriptions.${scheme}`)}</p>
        </div>
        <button
          onClick={handleSave}
          className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded text-xs font-medium hover:opacity-90 transition-opacity shadow"
        >
          {t('schemes.save')}
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {colors.map((color, index) => (
          <ColorCard key={index} rgb={color} />
        ))}
      </div>
    </div>
  );
};

export default PaletteSchemeItem;