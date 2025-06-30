import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/theme';

export interface FooterProps {
	year: number;
}

export const Footer: React.FC<FooterProps> = ({ year }) => {
	const theme = useThemeStore((state) => state.theme);
	const setTheme = useThemeStore((state) => state.setTheme);

	return (
		<footer className="w-full flex items-center justify-center mt-8 mb-4 text-xs gap-2 text-foreground">
			<span>&copy; copyright free {year} (it's OSS)</span>
			<span>—</span>
			<a
				href="https://github.com/oknoorap"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-2 hover:underline"
			>
				<img
					src="https://avatars.githubusercontent.com/u/247018?v=4"
					alt="Ribhararnus Pracutian"
					className="w-6 h-6 rounded-full border"
				/>
				Ribhararnus Pracutian
			</a>
			<button
				className="ml-4 p-1 rounded hover:bg-accent transition-colors"
				aria-label="Toggle theme"
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			>
				{theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
			</button>
		</footer>
	);
};
