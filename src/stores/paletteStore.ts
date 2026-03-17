import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SavedPalette, RGB, HarmonyScheme } from '../types/color';

export interface PaletteItem extends SavedPalette {
  name?: string;
  favorite?: boolean;
  tags?: string[];
}

interface PaletteState {
  palettes: PaletteItem[];
  addPalette: (palette: PaletteItem) => void;
  deletePalette: (id: string) => void;
  renamePalette: (id: string, name: string) => void;
  toggleFavorite: (id: string) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
  updatePalette: (id: string, updates: Partial<PaletteItem>) => void;
  clearAllPalettes: () => void;
  getPaletteById: (id: string) => PaletteItem | undefined;
  getFavoritePalettes: () => PaletteItem[];
  getPalettesByTag: (tag: string) => PaletteItem[];
  exportPalettes: () => string;
  importPalettes: (jsonString: string) => boolean;
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const usePaletteStore = create<PaletteState>()(
  persist(
    (set, get) => ({
      palettes: [],

      addPalette: (palette) => {
        set((state) => ({
          palettes: [...state.palettes, palette]
        }));
      },

      deletePalette: (id) => {
        set((state) => ({
          palettes: state.palettes.filter((p) => p.id !== id)
        }));
      },

      renamePalette: (id, name) => {
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id ? { ...p, name } : p
          )
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id ? { ...p, favorite: !p.favorite } : p
          )
        }));
      },

      addTag: (id, tag) => {
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id
              ? { ...p, tags: [...(p.tags || []), tag] }
              : p
          )
        }));
      },

      removeTag: (id, tag) => {
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id
              ? { ...p, tags: (p.tags || []).filter((t) => t !== tag) }
              : p
          )
        }));
      },

      updatePalette: (id, updates) => {
        set((state) => ({
          palettes: state.palettes.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        }));
      },

      clearAllPalettes: () => {
        set({ palettes: [] });
      },

      getPaletteById: (id) => {
        return get().palettes.find((p) => p.id === id);
      },

      getFavoritePalettes: () => {
        return get().palettes.filter((p) => p.favorite);
      },

      getPalettesByTag: (tag) => {
        return get().palettes.filter((p) => p.tags?.includes(tag));
      },

      exportPalettes: () => {
        const palettes = get().palettes;
        return JSON.stringify(palettes, null, 2);
      },

      importPalettes: (jsonString) => {
        try {
          const imported = JSON.parse(jsonString) as PaletteItem[];
          if (Array.isArray(imported)) {
            set((state) => ({
              palettes: [
                ...state.palettes,
                ...imported.map((p) => ({
                  ...p,
                  id: p.id || generateId()
                }))
              ]
            }));
            return true;
          }
          return false;
        } catch {
          return false;
        }
      }
    }),
    {
      name: 'color-palette-saved',
      storage: createJSONStorage(() => localStorage),
      version: 1
    }
  )
);

export const createPalette = (
  baseColor: RGB,
  scheme: HarmonyScheme,
  colors: RGB[],
  name?: string
): PaletteItem => ({
  id: generateId(),
  baseColor,
  scheme,
  colors,
  createdAt: new Date().toISOString(),
  name,
  favorite: false,
  tags: []
});
