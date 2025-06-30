import { RepositoryItem } from './RepositoryItem';
import { Alert } from '@/components/ui/alert';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepos } from '@/utils/api';
import type { GithubRepo } from '@/utils/api';
import { Skeleton } from '@/components/ui/skeleton';

export interface RepositoryListProps {
	username: string;
}

export function RepositoryList({ username }: RepositoryListProps) {
	const {
		data: repos = [],
		isLoading,
		isError,
		error,
	} = useQuery<GithubRepo[], Error>({
		queryKey: ['repos', username],
		queryFn: () => fetchGithubRepos(username),
		enabled: !!username,
		retry: false,
	});

	if (isLoading) {
		return (
			<div className="flex flex-col gap-3 pb-4">
				{[...Array(3)].map((_, i) => (
					<Skeleton key={i} className="h-[110px] w-full rounded-xl" />
				))}
			</div>
		);
	}
	if (isError) return <Alert variant="destructive">{error?.message || 'Failed to fetch repositories.'}</Alert>;
	if (!isLoading && repos.length === 0)
		return <div className="py-4 text-center text-muted-foreground">This user has no public repositories.</div>;

	const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
	return (
		<div className="flex flex-col gap-3 pb-4">
			{sortedRepos.map((repo) => (
				<RepositoryItem key={repo.id} repo={repo} />
			))}
		</div>
	);
}
