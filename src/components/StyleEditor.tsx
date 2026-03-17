import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RGB } from '../types/color';
import { rgbToHex, hexToRgb } from '../utils/colorConversion';

export interface StyleSettings {
  bg: string;
  text: string;
  textSecondary: string;
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  firstSentence: TextStyle;
  link: string;
  blockquote: string;
}

export interface TextStyle {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: number;
}

interface StyleEditorProps {
  settings: StyleSettings;
  onChange: (settings: StyleSettings) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ settings, onChange }) => {
  const { t } = useTranslation();
  
  const updateColor = (key: keyof StyleSettings, value: string) => {
    onChange({ ...settings, [key]: value });
  };

  const updateTextStyle = (key: 'h1' | 'h2' | 'h3' | 'firstSentence', prop: keyof TextStyle, value: string | boolean | number) => {
    onChange({
      ...settings,
      [key]: { ...settings[key], [prop]: value },
    });
  };

  const ColorInput = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 w-14 shrink-0">{label}</span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-6 h-5 rounded cursor-pointer border border-gray-600 bg-transparent"
        />
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={() => onChange(localValue)}
          onKeyDown={(e) => e.key === 'Enter' && onChange(localValue)}
          className="flex-1 min-w-0 px-1.5 py-0.5 bg-gray-700 border border-gray-600 rounded text-white text-xs font-mono"
        />
      </div>
    );
  };

  const TextStyleEditor = ({ label, styleKey }: { label: string; styleKey: 'h1' | 'h2' | 'h3' | 'firstSentence' }) => {
    const [localColor, setLocalColor] = useState(settings[styleKey].color);

    useEffect(() => {
      setLocalColor(settings[styleKey].color);
    }, [settings[styleKey].color]);

    return (
    <div className="bg-gray-700/50 rounded p-3 space-y-2">
      <div className="text-xs font-medium text-white">{label}</div>
      
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={settings[styleKey].color}
          onChange={(e) => updateTextStyle(styleKey, 'color', e.target.value)}
          className="w-6 h-5 rounded cursor-pointer border border-gray-600 bg-transparent"
        />
        <input
          type="text"
          value={localColor}
          onChange={(e) => setLocalColor(e.target.value)}
          onBlur={() => updateTextStyle(styleKey, 'color', localColor)}
          onKeyDown={(e) => e.key === 'Enter' && updateTextStyle(styleKey, 'color', localColor)}
          className="w-20 px-1.5 py-0.5 bg-gray-700 border border-gray-600 rounded text-white text-xs font-mono"
        />
        <input
          type="range"
          min="80"
          max="200"
          value={settings[styleKey].fontSize}
          onChange={(e) => updateTextStyle(styleKey, 'fontSize', parseInt(e.target.value))}
          className="flex-1 h-1"
        />
        <span className="text-xs text-gray-400 w-8">{settings[styleKey].fontSize}%</span>
      </div>

      <div className="flex gap-1">
        <button
          onClick={() => updateTextStyle(styleKey, 'bold', !settings[styleKey].bold)}
          className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
            settings[styleKey].bold ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
          }`}
        >
          B
        </button>
        <button
          onClick={() => updateTextStyle(styleKey, 'italic', !settings[styleKey].italic)}
          className={`px-2.5 py-1 rounded text-xs italic transition-colors ${
            settings[styleKey].italic ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
          }`}
        >
          I
        </button>
        <button
          onClick={() => updateTextStyle(styleKey, 'underline', !settings[styleKey].underline)}
          className={`px-2.5 py-1 rounded text-xs underline transition-colors ${
            settings[styleKey].underline ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
          }`}
        >
          U
        </button>
      </div>
    </div>
  )};

  return (
    <div className="bg-gray-800/80 rounded-xl p-4 space-y-4 overflow-auto min-h-[500px]">
      <h3 className="text-base font-bold text-white">{t('styleEditor.title')}</h3>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-300 border-b border-gray-700 pb-1">{t('styleEditor.basicColors')}</div>
        <ColorInput label={t('styleEditor.bg')} value={settings.bg} onChange={(v) => updateColor('bg', v)} />
        <ColorInput label={t('styleEditor.mainText')} value={settings.text} onChange={(v) => updateColor('text', v)} />
        <ColorInput label={t('styleEditor.secondaryText')} value={settings.textSecondary} onChange={(v) => updateColor('textSecondary', v)} />
        <ColorInput label={t('styleEditor.link')} value={settings.link} onChange={(v) => updateColor('link', v)} />
        <ColorInput label={t('styleEditor.blockquote')} value={settings.blockquote} onChange={(v) => updateColor('blockquote', v)} />
      </div>

      <div className="space-y-3">
        <div className="text-xs font-medium text-gray-300 border-b border-gray-700 pb-1">{t('styleEditor.titleStyles')}</div>
        <TextStyleEditor label={t('styleEditor.h1Chapter')} styleKey="h1" />
        <TextStyleEditor label={t('styleEditor.h2Section')} styleKey="h2" />
        <TextStyleEditor label={t('styleEditor.h3Subsection')} styleKey="h3" />
        <TextStyleEditor label={t('styleEditor.firstSentence')} styleKey="firstSentence" />
      </div>
    </div>
  );
};

export const createDefaultStyleSettings = (colors: RGB[]): StyleSettings => {
  const bg = rgbToHex(colors[0]);
  const accent = rgbToHex(colors[1] || colors[0]);
  const secondary = rgbToHex(colors[2] || colors[0]);
  const textColor = getContrastColor(bg);
  
  return {
    bg,
    text: textColor,
    textSecondary: secondary,
    h1: {
      color: accent,
      bold: true,
      italic: false,
      underline: false,
      fontSize: 180,
    },
    h2: {
      color: accent,
      bold: true,
      italic: false,
      underline: false,
      fontSize: 140,
    },
    h3: {
      color: accent,
      bold: true,
      italic: false,
      underline: false,
      fontSize: 120,
    },
    firstSentence: {
      color: accent,
      bold: true,
      italic: false,
      underline: false,
      fontSize: 108,
    },
    link: accent,
    blockquote: accent,
  };
};

const getContrastColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#FFFFFF';
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#1a1a1a' : '#FFFFFF';
};

export default StyleEditor;