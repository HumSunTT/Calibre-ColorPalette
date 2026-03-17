import { RGB, HarmonyScheme } from '../types/color';
import { rgbToHsl, hslToRgb } from './colorConversion';

interface HarmonyResult {
  colors: RGB[];
  variants: RGB[][];
}

export const generateHarmony = (baseColor: RGB, scheme: HarmonyScheme): HarmonyResult => {
  const hsl = rgbToHsl(baseColor);
  let colors: RGB[] = [];
  
  switch (scheme) {
    case 'complementary':
      colors = generateComplementary(hsl);
      break;
    case 'analogous':
      colors = generateAnalogous(hsl);
      break;
    case 'triadic':
      colors = generateTriadic(hsl);
      break;
    case 'square':
      colors = generateSquare(hsl);
      break;
    case 'split-complementary':
      colors = generateSplitComplementary(hsl);
      break;
    case 'monochromatic':
      colors = generateMonochromatic(hsl);
      break;
    default:
      colors = [baseColor];
  }
  
  const variants = colors.map(color => generateVariants(color));
  
  return { colors, variants };
};

const generateComplementary = (hsl: { h: number; s: number; l: number }): RGB[] => {
  const baseRgb = hslToRgb(hsl);
  const complementHue = (hsl.h + 180) % 360;
  const complementRgb = hslToRgb({ h: complementHue, s: hsl.s, l: hsl.l });
  
  return [baseRgb, complementRgb];
};

const generateAnalogous = (hsl: { h: number; s: number; l: number }): RGB[] => {
  const colors: RGB[] = [];
  const hueSteps = [-30, 0, 30];
  
  hueSteps.forEach(step => {
    const hue = (hsl.h + step + 360) % 360;
    colors.push(hslToRgb({ h: hue, s: hsl.s, l: hsl.l }));
  });
  
  return colors;
};

const generateTriadic = (hsl: { h: number; s: number; l: number }): RGB[] => {
  const colors: RGB[] = [];
  const hueSteps = [0, 120, 240];
  
  hueSteps.forEach(step => {
    const hue = (hsl.h + step) % 360;
    colors.push(hslToRgb({ h: hue, s: hsl.s, l: hsl.l }));
  });
  
  return colors;
};

const generateSquare = (hsl: { h: number; s: number; l: number }): RGB[] => {
  const colors: RGB[] = [];
  const hueSteps = [0, 90, 180, 270];
  
  hueSteps.forEach(step => {
    const hue = (hsl.h + step) % 360;
    colors.push(hslToRgb({ h: hue, s: hsl.s, l: hsl.l }));
  });
  
  return colors;
};

const generateSplitComplementary = (hsl: { h: number; s: number; l: number }): RGB[] => {
  const colors: RGB[] = [];
  const hueSteps = [0, 150, 210];
  
  hueSteps.forEach(step => {
    const hue = (hsl.h + step) % 360;
    colors.push(hslToRgb({ h: hue, s: hsl.s, l: hsl.l }));
  });
  
  return colors;
};

const generateMonochromatic = (hsl: { h: number; s: number; l: number }): RGB[] => {
  const colors: RGB[] = [];
  const lightnessSteps = [20, 35, 50, 65, 80];
  
  lightnessSteps.forEach(lightness => {
    colors.push(hslToRgb({ h: hsl.h, s: hsl.s, l: lightness }));
  });
  
  return colors;
};

const generateVariants = (rgb: RGB): RGB[] => {
  const hsl = rgbToHsl(rgb);
  const variants: RGB[] = [];
  
  const lightnessOffsets = [-15, 0, 15];
  
  lightnessOffsets.forEach(offset => {
    const newLightness = Math.max(10, Math.min(90, hsl.l + offset));
    variants.push(hslToRgb({ h: hsl.h, s: hsl.s, l: newLightness }));
  });
  
  return variants;
};

export const generateRandomColor = (): RGB => {
  return {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };
};
