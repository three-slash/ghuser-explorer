import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import type { GithubRepo } from '@/utils/api';
import { Star } from 'lucide-react';

export interface RepositoryItemProps {
	repo: GithubRepo;
}

export function RepositoryItem({ repo }: RepositoryItemProps) {
	return (
		<Card className="py-4 gap-2 bg-accent/5 border-primary">
			<CardHeader className="px-4">
				<div className="flex items-center gap-2">
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold hover:underline text-primary"
					>
						{repo.name}
					</a>
					<span className="flex items-center gap-1 text-xs text-yellow-600 ml-auto">
						<Star size={16} className="text-yellow-500" />
						{repo.stargazers_count}
					</span>
				</div>
			</CardHeader>
			<CardContent className="px-4">
				{repo.description && (
					<CardDescription className="line-clamp-2 text-card-foreground">{repo.description}</CardDescription>
				)}
				<div className="flex gap-2 text-xs mt-2 text-muted-foreground">
					{repo.language && <span>{repo.language}</span>}
					<span>Last updated: {new Date(repo.updated_at).toLocaleString()}</span>
				</div>
			</CardContent>
		</Card>
	);
}
