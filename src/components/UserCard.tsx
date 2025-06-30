import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useGithubStore } from '@/store/useGithubStore';
import type { GithubUser } from '@/utils/api';
import { RepositoryList } from './RepositoryList';

export interface UserCardProps {
	user: GithubUser;
}

export function UserCard({ user }: UserCardProps) {
	const selectedUser = useGithubStore((s) => s.selectedUser);
	const isSelected = selectedUser?.login === user.login;

	return (
		<div
			className={cn(`flex flex-col transition-all`, isSelected ? 'bg-accent/40 border-primary' : 'hover:bg-accent/10')}
		>
			<div className="flex items-center gap-3 p-4 w-full text-left">
				<Avatar>
					<AvatarImage src={user.avatar_url} alt="@shadcn" />
				</Avatar>
				{user.login}
			</div>
			{isSelected && <RepositoryList username={user.login} />}
		</div>
	);
}
