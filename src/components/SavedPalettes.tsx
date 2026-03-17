import React, { useState, useEffect } from 'react';
import { SavedPalette, HARMONY_NAMES } from '../types/color';
import { getSavedPalettes, deletePalette } from '../utils/storage';
import { rgbToHex } from '../utils/colorConversion';
import ColorCard from './ColorCard';

const SavedPalettes: React.FC = () => {
  const [palettes, setPalettes] = useState<SavedPalette[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setPalettes(getSavedPalettes());
  }, []);

  const handleDelete = (id: string) => {
    deletePalette(id);
    setPalettes(getSavedPalettes());
  };

  if (palettes.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          💝 已保存的配色 ({palettes.length})
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? '收起' : '展开'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-6 mt-6">
          {palettes.map((palette) => (
            <div
              key={palette.id}
              className="border border-gray-700 rounded-xl p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-white font-medium">
                    {HARMONY_NAMES[palette.scheme]}
                  </span>
                  <span className="text-gray-400 text-sm ml-3">
                    基础色: {rgbToHex(palette.baseColor)}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(palette.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  🗑️ 删除
                </button>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
                {palette.colors.map((color, index) => (
                  <ColorCard key={index} rgb={color} />
                ))}
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                保存时间: {new Date(palette.createdAt).toLocaleString('zh-CN')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPalettes;
