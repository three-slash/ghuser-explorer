import ky from 'ky';

export interface GithubUser {
	login: string;
	id: number;
	avatar_url: string;
}

export interface GithubRepo {
	id: number;
	name: string;
	description: string;
	stargazers_count: number;
	language: string;
	html_url: string;
	updated_at: string;
}

const api = ky.create({
	prefixUrl: import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com/',
	headers: {
		Accept: 'application/vnd.github.v3+json',
	},
});

export async function searchGithubUsers(query: string) {
	const res = await api
		.get(`search/users`, {
			searchParams: { q: query, per_page: 5, sort: 'followers', order: 'desc' },
		})
		.json<{ items: GithubUser[] }>();
	return res.items;
}

export async function fetchGithubRepos(username: string) {
	return api
		.get(`users/${username}/repos`, {
			searchParams: { sort: 'stars', direction: 'desc' },
		})
		.json<GithubRepo[]>();
}

export { api };
