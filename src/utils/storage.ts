import { SavedPalette, RGB } from '../types/color';

const STORAGE_KEY = 'color-palette-saved';

export const savePalette = (palette: SavedPalette): void => {
  const palettes = getSavedPalettes();
  palettes.push(palette);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
};

export const getSavedPalettes = (): SavedPalette[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const deletePalette = (id: string): void => {
  const palettes = getSavedPalettes();
  const filtered = palettes.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch {
    return false;
  }
};

export const rgbToCssString = (rgb: RGB): string => {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
};