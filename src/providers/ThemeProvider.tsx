import { useThemeStore } from '@/store/theme';
import React, { useEffect } from 'react';

export interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');
		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			root.classList.add(systemTheme);
		} else {
			root.classList.add(theme);
		}
	}, [theme]);

	return <>{children}</>;
};
