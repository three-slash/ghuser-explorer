import { create } from 'zustand';
import type { GithubUser } from '@/utils/api';

interface GithubState {
	query: string;
	selectedUser: GithubUser | null;
	setQuery: (query: string) => void;
	selectUser: (user: GithubUser) => void;
	clearErrors: () => void;
}

export const useGithubStore = create<GithubState>((set) => ({
	query: '',
	selectedUser: null,
	setQuery: (query) => set({ query }),
	selectUser: (user) => set({ selectedUser: user }),
	clearErrors: () => {},
}));
