import tinycolor from 'tinycolor2';
import { RGB, HSL, ColorInfo } from '../types/color';

export const rgbToHex = (rgb: RGB): string => {
  return tinycolor(rgb).toHexString().toUpperCase();
};

export const rgbToHsl = (rgb: RGB): HSL => {
  const color = tinycolor(rgb);
  const hsl = color.toHsl();
  return {
    h: Math.round(hsl.h),
    s: Math.round(hsl.s * 100),
    l: Math.round(hsl.l * 100),
  };
};

export const hexToRgb = (hex: string): RGB => {
  const color = tinycolor(hex);
  const rgb = color.toRgb();
  return {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
  };
};

export const hslToRgb = (hsl: HSL): RGB => {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export const getColorInfo = (rgb: RGB): ColorInfo => {
  return {
    rgb,
    hex: rgbToHex(rgb),
    hsl: rgbToHsl(rgb),
  };
};

export const rgbToString = (rgb: RGB): string => {
  return `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};

export const hslToString = (hsl: HSL): string => {
  return `HSL(${hsl.h}°, ${hsl.s}%, ${hsl.l}%)`;
};

export const generateVariants = (rgb: RGB, count: number = 3): RGB[] => {
  const hsl = rgbToHsl(rgb);
  const variants: RGB[] = [];
  
  const lightnessSteps = [
    Math.max(20, hsl.l - 20),
    hsl.l,
    Math.min(80, hsl.l + 20),
  ];
  
  for (let i = 0; i < Math.min(count, lightnessSteps.length); i++) {
    variants.push(hslToRgb({ ...hsl, l: lightnessSteps[i] }));
  }
  
  return variants;
};

export const getContrastColor = (rgb: RGB): string => {
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};
