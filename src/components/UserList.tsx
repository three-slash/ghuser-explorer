import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { Pill } from '@/components/ui/kibo-ui/pill';
import { useGithubStore } from '@/store/useGithubStore';
import { searchGithubUsers, type GithubUser } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { RepositoryList } from './RepositoryList';
import { UserCard } from './UserCard';
import { Skeleton } from '@/components/ui/skeleton';

export interface UserListProps {}

export function UserList({}: UserListProps) {
	const query = useGithubStore((s) => s.query);

	const {
		data: users = [],
		isLoading,
		isError,
		error,
	} = useQuery<GithubUser[], Error>({
		queryKey: ['users', query],
		queryFn: () => (query ? searchGithubUsers(query) : Promise.resolve([])),
		enabled: !!query,
		retry: false,
	});

	if (!query) return null;

	return (
		<div className="w-full flex flex-col gap-4 items-center">
			<div className="mb-4 text-sm text-foreground">
				Showing users for{' '}
				<Pill variant="secondary" className="bg-accent-foreground text-xs text-accent py-1">
					{query}
				</Pill>
				{!isLoading && !isError && users.length > 0 && (
					<span className="ml-2 text-muted-foreground">
						({users.length} result{users.length > 1 ? 's' : ''})
					</span>
				)}
			</div>
			{isLoading && (
				<div className="w-full flex flex-col gap-4" data-testid="user-skeletons">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="flex items-center gap-4 rounded-md bg-background">
							{/* Avatar skeleton */}
							<Skeleton className="w-12 h-12 rounded-full" />
							<div className="flex-1 flex flex-col gap-2">
								<Skeleton className="w-1/2 h-5" />
							</div>
						</div>
					))}
				</div>
			)}
			{isError && <Alert variant="destructive">{error?.message || 'Failed to fetch users.'}</Alert>}
			{!isLoading && !isError && users.length === 0 && (
				<div className="py-4 text-center text-foreground">No users found matching your query</div>
			)}
			<Accordion type="single" collapsible className="w-full">
				{users.map((user) => (
					<AccordionItem value={user.login} key={user.id}>
						<AccordionTrigger className="!no-underline !p-0">
							<UserCard user={user} />
						</AccordionTrigger>
						<AccordionContent>
							<RepositoryList username={user.login} />
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
