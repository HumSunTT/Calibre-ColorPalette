import React, { useState, useEffect } from 'react';
import { RGB } from '../types/color';
import { rgbToHex, hexToRgb } from '../utils/colorConversion';

interface ColorInputProps {
  rgb: RGB;
  onChange: (rgb: RGB) => void;
  onRandom: () => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ rgb, onChange, onRandom }) => {
  const [hexInput, setHexInput] = useState(rgbToHex(rgb));
  const [hexError, setHexError] = useState(false);

  useEffect(() => {
    setHexInput(rgbToHex(rgb));
    setHexError(false);
  }, [rgb]);

  const handleChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: value };
    onChange(newRgb);
  };

  const handleHexChange = (value: string) => {
    let hex = value.toUpperCase();
    if (!hex.startsWith('#')) {
      hex = '#' + hex;
    }
    setHexInput(hex);
    
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      const newRgb = hexToRgb(hex);
      onChange(newRgb);
      setHexError(false);
    } else if (hex.length > 1) {
      setHexError(true);
    }
  };

  const sliders = [
    { channel: 'r' as const, label: 'R', color: 'bg-red-500', value: rgb.r },
    { channel: 'g' as const, label: 'G', color: 'bg-green-500', value: rgb.g },
    { channel: 'b' as const, label: 'B', color: 'bg-blue-500', value: rgb.b },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">颜色输入</h2>
        <button
          onClick={onRandom}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg"
        >
          🎲 随机颜色
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">HEX 颜色值 (如 #3498DB)</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#3498DB"
            maxLength={7}
            className={`flex-1 px-4 py-3 bg-gray-700 border-2 rounded-lg text-white font-mono text-lg focus:outline-none transition-colors ${
              hexError ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
            }`}
          />
          <input
            type="color"
            value={rgbToHex(rgb)}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-14 h-12 rounded-lg cursor-pointer border-2 border-gray-600 bg-transparent"
          />
        </div>
        {hexError && (
          <p className="text-red-400 text-sm mt-1">请输入有效的HEX颜色值 (如 #3498DB)</p>
        )}
      </div>
      
      {sliders.map(({ channel, label, color, value }) => (
        <div key={channel} className="slider-container">
          <span className="slider-label text-gray-300">{label}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={value}
            onChange={(e) => handleChange(channel, parseInt(e.target.value))}
            className={`slider-input ${color}`}
            style={{
              background: `linear-gradient(to right, ${color} 0%, ${color} ${(value / 255) * 100}%, #374151 ${(value / 255) * 100}%, #374151 100%)`
            }}
          />
          <span className="w-12 text-right text-gray-300 font-mono">{value}</span>
        </div>
      ))}
      
      <div className="flex gap-4 mt-6">
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">R</label>
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.r}
            onChange={(e) => handleChange('r', Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">G</label>
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.g}
            onChange={(e) => handleChange('g', Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-2">B</label>
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.b}
            onChange={(e) => handleChange('b', Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorInput;
