import { hexToRgb } from '../utils/colorConversion';

export interface ContrastInfo {
  ratio: number;
  level: 'AAA' | 'AA' | 'Fail';
  isAccessible: boolean;
}

export function getWCAGLevel(ratio: number): 'AAA' | 'AA' | 'Fail' {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  return 'Fail';
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const rLinear = srgbToLinear(r);
  const gLinear = srgbToLinear(g);
  const bLinear = srgbToLinear(b);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function srgbToLinear(srgb: number): number {
  if (srgb <= 0.03928) return srgb / 12.92;
  return Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function getContrastRatio(fg: string, bg: string): number {
  const fgLuminance = getLuminance(fg);
  const bgLuminance = getLuminance(bg);

  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function getContrastInfo(fg: string, bg: string): ContrastInfo {
  const ratio = getContrastRatio(fg, bg);
  const level = getWCAGLevel(ratio);

  return {
    ratio,
    level,
    isAccessible: level !== 'Fail',
  };
}

export function meetsAA(fg: string, bg: string): boolean {
  return getContrastRatio(fg, bg) >= 4.5;
}

export function meetsAAA(fg: string, bg: string): boolean {
  return getContrastRatio(fg, bg) >= 7;
}
