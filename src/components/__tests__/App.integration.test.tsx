import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';
import { useQuery } from '@tanstack/react-query';
import { vi } from 'vitest';

vi.mock('@tanstack/react-query');

const users = [
	{ id: 1, login: 'octocat', avatar_url: 'avatar1' },
	{ id: 2, login: 'hubot', avatar_url: 'avatar2' },
];
const repos = [
	{ id: 1, name: 'repo1', stargazers_count: 10, html_url: 'url1', updated_at: '2023-01-01T00:00:00Z' },
	{ id: 2, name: 'repo2', stargazers_count: 5, html_url: 'url2', updated_at: '2023-01-02T00:00:00Z' },
];

describe('App integration', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		(useQuery as any).mockImplementation(({ queryKey }: any) => {
			if (queryKey[0] === 'users') {
				if (queryKey[1] === 'none') {
					return { data: [], isLoading: false, isError: false };
				}
				if (queryKey[1] === 'error') {
					return { isLoading: false, isError: true, error: { message: 'API error' } };
				}
				if (queryKey[1] === 'loading') {
					return { isLoading: true };
				}
				return { data: users, isLoading: false, isError: false };
			}
			if (queryKey[0] === 'repos') {
				if (queryKey[1] === 'octocat') {
					return { data: repos, isLoading: false, isError: false };
				}
				if (queryKey[1] === 'empty') {
					return { data: [], isLoading: false, isError: false };
				}
			}
			return { data: [], isLoading: false, isError: false };
		});
	});

	it('full user flow: search, select user, see repos', async () => {
		render(<App />);
		const input = screen.getByPlaceholderText(/enter username/i);
		fireEvent.change(input, { target: { value: 'octocat' } });
		fireEvent.click(screen.getByRole('button', { name: /search/i }));

		// Users should appear
		await waitFor(() => {
			expect(screen.getByText('octocat')).toBeInTheDocument();
			expect(screen.getByText('hubot')).toBeInTheDocument();
		});

		// Select a user
		fireEvent.click(screen.getAllByText('octocat')[0]);

		// Repos should appear
		await waitFor(() => {
			expect(screen.getByText('repo1')).toBeInTheDocument();
			expect(screen.getByText('repo2')).toBeInTheDocument();
		});
	});

	it('shows loading and error states', async () => {
		// Loading users
		(useQuery as any).mockImplementationOnce(() => ({ isLoading: true }));
		render(<App />);
		fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'loading' } });
		fireEvent.click(screen.getByRole('button', { name: /search/i }));
		expect(screen.getByText(/loading users/i)).toBeInTheDocument();

		// Error users
		(useQuery as any).mockImplementationOnce(() => ({ isError: true, error: { message: 'API error' } }));
		render(<App />);
		fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'error' } });
		fireEvent.click(screen.getByRole('button', { name: /search/i }));
		expect(screen.getByText(/api error/i)).toBeInTheDocument();
	});

	it('shows empty state for no users', async () => {
		render(<App />);
		fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'none' } });
		fireEvent.click(screen.getByRole('button', { name: /search/i }));
		expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
	});

	it('shows empty state for no repos', async () => {
		(useQuery as any).mockImplementation(({ queryKey }: any) => {
			if (queryKey[0] === 'users') {
				return { data: users, isLoading: false, isError: false };
			}
			if (queryKey[0] === 'repos') {
				return { data: [], isLoading: false, isError: false };
			}
			return { data: [], isLoading: false, isError: false };
		});
		render(<App />);
		fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'octocat' } });
		fireEvent.click(screen.getByRole('button', { name: /search/i }));
		await waitFor(() => {
			expect(screen.getByText('octocat')).toBeInTheDocument();
		});
		fireEvent.click(screen.getAllByText('octocat')[0]);
		expect(await screen.findByText(/no public repositories/i)).toBeInTheDocument();
	});
});
