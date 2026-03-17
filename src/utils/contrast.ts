import { RGB, from '../types/color';
import { hexToRgb } from '../utils/colorConversion';
import tinycolor2 from 'tinycolor2';

/**
 * Contrast information for accessibility checking
 */
export interface ContrastInfo {
  /** Contrast ratio between 1 and 21 */
  ratio: number;
  /** WCAG level: 'AAA' | 'AA' | 'Fail' */
  level: 'AAA' | 'AA' | 'Fail';
  /** Whether the contrast meets at least AA standard */
  isAccessible: boolean;
}

/**
 * Get WCAG contrast level
 * @param ratio Contrast ratio
 * @returns WCAG level
 */
export function getWCAGLevel(ratio: number): 'AAA' | 'AA' | 'Fail' {
  if (ratio >= 7) {
    return 'AAA';
  }
  if (ratio >= 4.5) {
    return 'AA';
  }
  return 'Fail';
}

/**
 * Calculate relative luminance
 * WCAG 2.0 formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return 0;
  }

  // Convert RGB to 0-1 range
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  // Convert sRGB to linear RGB
  const rLinear = srgbToLinear(r);
  const gLinear = srgbToLinear(g);
  const bLinear = srgbToLinear(b);

  // Calculate luminance using WCAG 2.0 coefficients
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Convert sRGB channel to linear RGB
 * WCAG 2.0 formula
 */
function srgbToLinear(srgb: number): number {
  const srgbNorm = srgb / 255;
  if (srgbNorm <= 0.03928) {
    return srgbNorm / 12.92;
  }
  return Math.pow((srgbNorm + 0.055) / 1.055, 2.4);
}

/**
 * Calculate contrast ratio between two colors
 * WCAG 2.0 formula: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrastRatio(fg: string, bg: string): number {
  const fgLuminance = getLuminance(fg);
  const bgLuminance = getLuminance(bg);

  // L1 is the lighter color, L2 is the darker color
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  // Calculate contrast ratio
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return Math.round(ratio * 100) / 100;
}

/**
 * Get comprehensive contrast information
 */
export function getContrastInfo(fg: string, bg: string): ContrastInfo {
  const ratio = getContrastRatio(fg, bg);
  const level = getWCAGLevel(ratio);

  return {
    ratio,
    level,
    isAccessible: level !== 'Fail',
  };
}

/**
 * Check if contrast meets WCAG AA standard
 */
export function meetsAA(fg: string, bg: string): boolean {
  return getContrastRatio(fg, bg) >= 4.5;
}

/**
 * Check if contrast meets WCAG AAA standard
 */
export function meetsAAA(fg: string, bg: string): boolean {
  return getContrastRatio(fg, bg) >= 7;
}
