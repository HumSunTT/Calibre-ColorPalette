import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
}

function applyTheme(isDark: boolean): void {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => {
        set((state) => {
          const newIsDark = !state.isDarkMode;
          applyTheme(newIsDark);
          return { isDarkMode: newIsDark };
        });
      },
      setDarkMode: (value) => {
        applyTheme(value);
        set({ isDarkMode: value });
      },
    }),
    {
      name: 'color-palette-theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.isDarkMode);
        }
      },
    }
  )
);

export const initializeTheme = (): void => {
  const stored = localStorage.getItem('color-palette-theme');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      if (data?.state?.isDarkMode !== undefined) {
        applyTheme(data.state.isDarkMode);
      }
    } catch {
      applyTheme(false);
    }
  }
};
