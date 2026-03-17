export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export type HarmonyScheme = 
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'square'
  | 'split-complementary'
  | 'monochromatic'
  | 'double-complementary'
  | 'compound'
  | 'shades'
  | 'neutral'
  | 'five-tone'
  | 'six-tone';

export interface ColorInfo {
  rgb: RGB;
  hex: string;
  hsl: HSL;
}

export interface SavedPalette {
  id: string;
  baseColor: RGB;
  scheme: HarmonyScheme;
  colors: RGB[];
  createdAt: string;
}

export const HARMONY_NAMES: Record<HarmonyScheme, string> = {
  'complementary': '互补色',
  'analogous': '类比色',
  'triadic': '三角色',
  'square': '四角色',
  'split-complementary': '分裂互补',
  'monochromatic': '单色系',
  'double-complementary': '双互补色',
  'compound': '复合色',
  'shades': '阴影色',
  'neutral': '中性色',
  'five-tone': '五角色',
  'six-tone': '六色色环',
};