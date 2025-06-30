import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGithubStore } from '@/store/useGithubStore';
import { useState } from 'react';

export interface SearchBarProps {}

export function SearchBar({}: SearchBarProps) {
	const query = useGithubStore((s) => s.query);
	const setQuery = useGithubStore((s) => s.setQuery);
	const [localQuery, setLocalQuery] = useState(query);

	return (
		<form
			className="flex gap-2 w-full max-w-md mx-auto"
			onSubmit={(e) => {
				e.preventDefault();
				setQuery(localQuery);
			}}
		>
			<Input
				value={localQuery}
				onChange={(e) => setLocalQuery(e.target.value)}
				placeholder="Enter username"
				className="flex-1"
				aria-label="Enter username"
			/>
			<Button type="submit">Search</Button>
		</form>
	);
}
