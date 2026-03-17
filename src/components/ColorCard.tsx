import React, { useState } from 'react';
import { RGB } from '../types/color';
import { rgbToHex, getContrastColor } from '../utils/colorConversion';
import { copyToClipboard, rgbToCssString } from '../utils/storage';

interface ColorCardProps {
  rgb: RGB;
}

const ColorCard: React.FC<ColorCardProps> = ({ rgb }) => {
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
      title={`${hex} - 点击复制`}
    >
      <div 
        className="h-16 sm:h-20 flex items-center justify-center"
      >
        <span 
          className="text-xs sm:text-sm font-mono font-medium px-1"
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
          <span className="text-xs font-medium">已复制!</span>
        </div>
      )}
    </div>
  );
};

export default ColorCard;