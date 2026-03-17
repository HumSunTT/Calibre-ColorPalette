/**
 * Image Color Extraction Utility
 * Extracts dominant colors from images using Canvas API and color quantization
 */

import { RGB } from '../types/color';

/**
 * Supported image formats for extraction
 */
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/**
 * Default number of colors to extract
 */
const DEFAULT_COLOR_COUNT = 8;

/**
 * Pixel sampling skip factor (1 = sample every pixel, 4 = sample every 4th pixel)
 */
const SAMPLE_SKIP_FACTOR = 4;

/**
 * Quantization step size (32 = round to nearest 32 for each RGB channel)
 */
const QUANTIZE_STEP = 32;

/**
 * Extract dominant colors from an image file
 * @param file - Image file to extract colors from
 * @param colorCount - Number of colors to return (default: 8)
 * @returns Promise resolving to array of hex color strings
 */
export async function extractColorsFromFile(
  file: File,
  colorCount: number = DEFAULT_COLOR_COUNT
): Promise<string[]> {
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    throw new Error(
      `Unsupported image format: ${file.type}. Supported formats: ${SUPPORTED_FORMATS.join(', ')}`
    );
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      try {
        const colors = extractColorsFromImage(img, colorCount);
        resolve(colors);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = objectUrl;
  });
}

/**
 * Extract dominant colors from an HTMLImageElement
 * @param img - HTML image element to extract colors from
 * @param colorCount - Number of colors to return (default: 8)
 * @returns Array of hex color strings
 */
export function extractColorsFromImage(
  img: HTMLImageElement,
  colorCount: number = DEFAULT_COLOR_COUNT
): string[] {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2D canvas context');
  }

  const maxSize = 256;
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  canvas.width = Math.floor(img.width * scale);
  canvas.height = Math.floor(img.height * scale);

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return extractColorsFromImageData(imageData, colorCount);
}

/**
 * Extract dominant colors from ImageData
 * @param imageData - ImageData object to extract colors from
 * @param colorCount - Number of colors to return (default: 8)
 * @returns Array of hex color strings
 */
export function extractColorsFromImageData(
  imageData: ImageData,
  colorCount: number = DEFAULT_COLOR_COUNT
): string[] {
  const { data, width, height } = imageData;
  const colorMap = new Map<string, number>();

  for (let y = 0; y < height; y += SAMPLE_SKIP_FACTOR) {
    for (let x = 0; x < width; x += SAMPLE_SKIP_FACTOR) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      if (a < 128) continue;

      const brightness = (r + g + b) / 3;
      if (brightness < 10 || brightness > 245) continue;

      const quantizedColor = quantizeRGB({ r, g, b });
      const colorKey = rgbToKey(quantizedColor);

      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
    }
  }

  return quantizeColors(colorMap, colorCount);
}

/**
 * Quantize a single RGB value by rounding each channel
 * @param rgb - RGB color to quantize
 * @returns Quantized RGB color
 */
function quantizeRGB(rgb: RGB): RGB {
  const quantize = (value: number): number => {
    return Math.round(value / QUANTIZE_STEP) * QUANTIZE_STEP;
  };

  return {
    r: Math.min(255, quantize(rgb.r)),
    g: Math.min(255, quantize(rgb.g)),
    b: Math.min(255, quantize(rgb.b)),
  };
}

/**
 * Convert RGB to a string key for Map storage
 * @param rgb - RGB color
 * @returns String key in format "r,g,b"
 */
function rgbToKey(rgb: RGB): string {
  return `${rgb.r},${rgb.g},${rgb.b}`;
}

/**
 * Convert RGB to hex string
 * @param rgb - RGB color
 * @returns Hex color string (#RRGGBB)
 */
function rgbToHex(rgb: RGB): string {
  const toHex = (value: number): string => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
}

/**
 * Convert key back to RGB
 * @param key - String key in format "r,g,b"
 * @returns RGB color
 */
function keyToRGB(key: string): RGB {
  const [r, g, b] = key.split(',').map(Number);
  return { r, g, b };
}

/**
 * Color quantization using frequency-based selection
 * Returns the most common colors from the color map
 * @param pixels - Map of color keys to their frequency counts
 * @param colorCount - Number of colors to return
 * @returns Array of hex color strings
 */
function quantizeColors(pixels: Map<string, number>, colorCount: number): string[] {
  if (pixels.size === 0) {
    return [];
  }

  const sortedColors = Array.from(pixels.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, Math.min(colorCount * 3, pixels.size));

  const selectedColors: RGB[] = [];
  const minColorDistance = 50;

  for (const [key] of sortedColors) {
    if (selectedColors.length >= colorCount) break;

    const color = keyToRGB(key);

    const isTooSimilar = selectedColors.some((selected) => {
      return colorDistance(color, selected) < minColorDistance;
    });

    if (!isTooSimilar) {
      selectedColors.push(color);
    }
  }

  if (selectedColors.length < colorCount) {
    for (const [key] of sortedColors) {
      if (selectedColors.length >= colorCount) break;

      const color = keyToRGB(key);
      if (!selectedColors.some((c) => rgbToKey(c) === key)) {
        selectedColors.push(color);
      }
    }
  }

  return selectedColors.map(rgbToHex);
}

/**
 * Calculate Euclidean distance between two RGB colors
 * @param color1 - First color
 * @param color2 - Second color
 * @returns Distance value (0-441, where 441 is max distance between black and white)
 */
function colorDistance(color1: RGB, color2: RGB): number {
  const dr = color1.r - color2.r;
  const dg = color1.g - color2.g;
  const db = color1.b - color2.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Validate if a file is a supported image format
 * @param file - File to validate
 * @returns True if the file is a supported image format
 */
export function isValidImageFile(file: File): boolean {
  return SUPPORTED_FORMATS.includes(file.type);
}

/**
 * Get list of supported image formats
 * @returns Array of supported MIME types
 */
export function getSupportedFormats(): string[] {
  return [...SUPPORTED_FORMATS];
}
