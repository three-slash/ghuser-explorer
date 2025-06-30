import React from 'react';
import { Github } from 'lucide-react';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => (
	<header className="mb-10 text-center">
		<div className="flex items-center justify-center gap-2">
			<Github className="w-10 h-auto" />
			<h1 className="text-3xl md:text-4xl font-bold tracking-tight">GitHub Repositories Explorer</h1>
		</div>
		<p className="text-lg text-muted-foreground">
			Search and explore GitHub users and their repositories in one place.
		</p>
	</header>
);
