# GitHub Repositories Explorer

## Description
A modern, interactive, and fully responsive React web application to search for GitHub profiles and explore their public repositories. Built with Vite, TypeScript, Tailwind CSS, Shadcn UI, Zustand, and tested with Vitest. Deployable to Netlify.

## Features
- Search GitHub users by username (partial match)
- View up to 5 matching users with interactive cards
- Select a user to view all their public repositories
- Repository details: name, description, stars, language, last updated, GitHub link
- Loading and empty states for users and repositories
- Robust error handling (network, API, rate limit, not found, etc.)
- Responsive, mobile-first design (no horizontal scroll)
- Polished UI with Shadcn UI components
- State management with Zustand
- Unit and integration tests (Vitest, Testing Library, MSW)

## Tech Stack
- React (Vite + TypeScript)
- Tailwind CSS
- Shadcn UI
- Zustand
- Vitest, @testing-library/react, MSW
- Axios
- Bun (package manager)
- Netlify (deployment)

## Prerequisites
- [Bun](https://bun.sh/) (recommended)
- Node.js (for some CLI tools, optional)
- Git

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd github-repos-explorer
   ```
2. **Install dependencies:**
   ```sh
   bun install
   ```
3. **Start the development server:**
   ```sh
   bun run dev
   ```

## Running Tests
Run all unit and integration tests:
```sh
bun run test
```

## Deployment
- The app is configured for Netlify deployment. See `netlify.toml`.
- Build with:
  ```sh
  bun run build
  ```
- Deploy the `dist` folder to Netlify.

## Error Handling Overview
- **Network errors:** User-friendly alerts for connectivity issues
- **API rate limit:** Detects GitHub's 60/hr unauthenticated limit, shows clear message
- **User not found:** Graceful empty state for no results
- **Generic API errors:** Friendly error messages for all other cases

## Responsive Design
- Mobile-first layout
- Uses Tailwind's responsive utilities
- No horizontal scrolling at any width

## Live Demo
- _(Add your Netlify link here)_

## Acknowledgements
- [GitHub REST API](https://developer.github.com/v3/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bun](https://bun.sh/)
- [Vite](https://vite.dev/)

---

_See the code for more details on architecture and implementation._
