import { render, screen } from '@testing-library/react';
import { UserList } from '@/components/UserList';
import { useGithubStore } from '@/store/useGithubStore';
import { useQuery } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/store/useGithubStore');
vi.mock('@tanstack/react-query');

// Mock Zustand to always return the correct shape for the selector
(useGithubStore as any).mockImplementation((selector: any) =>
	selector({
		query: 'octocat',
		setQuery: vi.fn(),
		selectedUser: null,
		selectUser: vi.fn(),
		clearErrors: vi.fn(),
	}),
);

describe('UserList', () => {
	it('shows loading state', () => {
		(useQuery as any).mockReturnValue({ isLoading: true });
		render(<UserList />);
		expect(screen.getByText(/loading users/i)).toBeInTheDocument();
	});

	it('shows error state', () => {
		(useQuery as any).mockReturnValue({ isError: true, error: { message: 'API error' } });
		render(<UserList />);
		expect(screen.getByText(/api error/i)).toBeInTheDocument();
	});

	it('shows empty state', () => {
		(useQuery as any).mockReturnValue({ isLoading: false, isError: false, data: [] });
		render(<UserList />);
		expect(screen.getByText(/no users found/i)).toBeInTheDocument();
	});

	it('shows user cards', () => {
		(useQuery as any).mockReturnValue({
			isLoading: false,
			isError: false,
			data: [{ id: 1, login: 'octocat', avatar_url: 'avatar' }],
		});
		render(<UserList />);
		expect(screen.getAllByText(/octocat/i).length).toBeGreaterThan(1);
	});
});
