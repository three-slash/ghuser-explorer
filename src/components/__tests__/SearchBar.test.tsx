import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/components/SearchBar';
import { useGithubStore } from '@/store/useGithubStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/store/useGithubStore');

describe('SearchBar', () => {
	let setQuery: any;
	beforeEach(() => {
		vi.clearAllMocks();
		setQuery = vi.fn();
		(useGithubStore as any).mockImplementation((selector: any) =>
			selector({
				query: '',
				setQuery,
				selectedUser: null,
				selectUser: vi.fn(),
				clearErrors: vi.fn(),
			}),
		);
	});

	it('renders input and button, allows typing, and calls setQuery', () => {
		render(<SearchBar />);
		const input = screen.getByPlaceholderText(/enter username/i);
		const button = screen.getByRole('button', { name: /search/i });
		fireEvent.change(input, { target: { value: 'octocat' } });
		fireEvent.click(button);
		expect(setQuery).toHaveBeenCalledWith('octocat');
	});
});
