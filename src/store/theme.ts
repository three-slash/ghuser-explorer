import { create } from 'zustand';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	getTheme: () => Theme;
}

const storageKey = 'vite-ui-theme';

export const useThemeStore = create<ThemeState>((set, get) => ({
	theme: (localStorage.getItem(storageKey) as Theme) || 'light',
	setTheme: (theme: Theme) => {
		localStorage.setItem(storageKey, theme);
		set({ theme });
	},
	getTheme: () => get().theme,
}));
