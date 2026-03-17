import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RGB } from '../types/color';
import { rgbToHex, getContrastColor } from '../utils/colorConversion';
import { copyToClipboard, rgbToCssString } from '../utils/storage';

interface ColorCardProps {
  rgb: RGB;
}

const ColorCard: React.FC<ColorCardProps> = ({ rgb }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const hex = rgbToHex(rgb);
  const backgroundColor = rgbToCssString(rgb);
  const textColor = getContrastColor(rgb);

  const handleClick = async () => {
    const success = await copyToClipboard(hex);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div
      className="relative rounded-lg cursor-pointer transition-all hover:scale-105 hover:shadow-lg overflow-hidden"
      style={{ backgroundColor }}
      onClick={handleClick}
      title={`${hex} - Click to copy`}
    >
      <div 
        className="h-14 flex items-center justify-center"
      >
        <span 
          className="text-sm font-mono font-medium px-2"
          style={{ color: textColor }}
        >
          {hex}
        </span>
      </div>
      
      {copied && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30"
          style={{ color: textColor }}
        >
          <span className="text-xs font-medium">{t('textPreview.copied')}</span>
        </div>
      )}
    </div>
  );
};

export default ColorCard;