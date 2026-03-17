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
  const [localRgb, setLocalRgb] = useState(rgb);

  useEffect(() => {
    setHexInput(rgbToHex(rgb));
    setHexError(false);
    setLocalRgb(rgb);
  }, [rgb]);

  const handleSliderChange = (channel: 'r' | 'g' | 'b', value: number) => {
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

  const handleRgbInputChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = value === '' ? 0 : parseInt(value) || 0;
    const clampedValue = Math.min(255, Math.max(0, numValue));
    setLocalRgb(prev => ({ ...prev, [channel]: clampedValue }));
  };

  const handleRgbInputBlur = () => {
    onChange(localRgb);
  };

  const handleRgbInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onChange(localRgb);
    }
  };

  const sliders = [
    { channel: 'r' as const, label: 'R', value: rgb.r },
    { channel: 'g' as const, label: 'G', value: rgb.g },
    { channel: 'b' as const, label: 'B', value: rgb.b },
  ];

  const getSliderColor = (channel: 'r' | 'g' | 'b') => {
    return channel === 'r' ? '#ef4444' : channel === 'g' ? '#22c55e' : '#3b82f6';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-white">颜色输入</h2>
        <button
          onClick={onRandom}
          className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg text-sm"
        >
          🎲 随机
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-xs text-gray-400 mb-1.5">HEX 颜色值</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={hexInput}
            onChange={(e) => handleHexChange(e.target.value)}
            placeholder="#3498DB"
            maxLength={7}
            className={`flex-1 px-3 py-2 bg-gray-700 border-2 rounded-lg text-white font-mono focus:outline-none transition-colors ${
              hexError ? 'border-red-500' : 'border-gray-600 focus:border-blue-500'
            }`}
          />
          <input
            type="color"
            value={rgbToHex(rgb)}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-600 bg-transparent"
          />
        </div>
        {hexError && (
          <p className="text-red-400 text-xs mt-1">请输入有效的HEX值</p>
        )}
      </div>
      
      {sliders.map(({ channel, label, value }) => (
        <div key={channel} className="flex items-center gap-3 mb-3">
          <span className="w-6 text-sm font-bold text-gray-300">{label}</span>
          <input
            type="range"
            min="0"
            max="255"
            value={value}
            onChange={(e) => handleSliderChange(channel, parseInt(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${getSliderColor(channel)} 0%, ${getSliderColor(channel)} ${(value / 255) * 100}%, #374151 ${(value / 255) * 100}%, #374151 100%)`
            }}
          />
          <span className="w-10 text-right text-sm text-gray-300 font-mono">{value}</span>
        </div>
      ))}
      
      <div className="flex gap-3 mt-4">
        {(['r', 'g', 'b'] as const).map((channel) => (
          <div key={channel} className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">{channel.toUpperCase()}</label>
            <input
              type="number"
              min="0"
              max="255"
              value={localRgb[channel]}
              onChange={(e) => handleRgbInputChange(channel, e.target.value)}
              onBlur={handleRgbInputBlur}
              onKeyDown={handleRgbInputKeyDown}
              className="w-full px-2 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorInput;