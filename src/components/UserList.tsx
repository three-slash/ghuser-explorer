import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { Pill, PillAvatar } from '@/components/ui/kibo-ui/pill';
import { useGithubStore } from '@/store/useGithubStore';
import { searchGithubUsers, type GithubUser } from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { RepositoryList } from './RepositoryList';
import { UserCard } from './UserCard';

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
			{isLoading && <div className="py-4 text-foreground">Loading users...</div>}
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
