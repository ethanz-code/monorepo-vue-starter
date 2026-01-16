# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `bun dev` - Start development server (Vite)
- `bun run build` - Build for production (runs type-check + build-only)
- `bun run type-check` - Run TypeScript type checking with vue-tsc
- `bun run lint` - Run both Oxlint and ESLint with auto-fix
- `bun run lint:oxlint` - Run only Oxlint (extremely fast, 50-100x faster than ESLint)
- `bun run lint:eslint` - Run only ESLint
- `bun run format` - Format code with Prettier
- `bun run standardize` - Run type-check, lint, and format together

### Commit Workflow
IMPORTANT: Direct `git commit` is blocked by pre-commit hooks. Use:
- `bun run commit` - Interactive commit with Commitlint (emoji-based conventional commits)
- `bun run commit:check` - Run standardize (type-check + lint + format) before committing

To bypass the pre-commit restriction: `BYPASS_PRECOMMIT=1 git commit ...`

### Other Commands
- `bun run preview` - Preview production build locally

## Architecture Overview

### Monorepo Structure
- Uses Bun workspaces (`"workspaces": ["packages/*"]`)
- Currently has a placeholder package in `packages/`
- Root package contains the main Vue 3 SPA application

### Tech Stack
- **Runtime**: Bun as package manager and potential runtime
- **Build Tool**: Rolldown-Vite (Vite with Rolldown bundler for faster builds)
- **Framework**: Vue 3 with Composition API, Vue Router 4
- **State Management**: Pinia via `@ethan-utils/pinia` wrapper
- **HTTP Client**: Axios via `@ethan-utils/axios` wrapper
- **Styling**: TailwindCSS v4 (native Vite integration, no PostCSS config needed)
- **Icons**: lucide-vue-next
- **Utilities**: @vueuse/core, lodash-es

### Project Structure
```
src/
├── assets/         # Static assets and global styles (main.css)
├── components/     # Reusable Vue components
├── views/          # Page-level components (e.g., Home.vue)
├── router/         # Vue Router configuration
├── stores/         # Pinia stores (composition API style)
├── types/          # TypeScript type definitions
└── main.ts         # Application entry point
```

### Key Configuration Details

#### API Client Initialization
The Axios wrapper is initialized in `src/main.ts:9-12` with:
- Base URL from `VITE_API_BASE_URL` env var (defaults to `http://localhost:3000/api`)
- 10 second timeout

#### TypeScript Configuration
- Project references setup with separate configs for app and node
- Strict type checking enabled via vue-tsc

#### Linting Setup
Dual linting strategy:
1. **Oxlint**: Ultra-fast Rust-based linter for quick feedback (correctness rules only)
2. **ESLint**: Comprehensive linting with Vue, TypeScript, and Prettier integration
- ESLint config extends `@vue/eslint-config-typescript` and `eslint-plugin-vue`
- Prettier is integrated via `@vue/eslint-config-prettier`

#### Commit Convention
Custom emoji-based conventional commits configured in `.commitlintrc.ts`:
- feat: ✨, fix: 🐛, docs: 📚, style: 💎, refactor: 📦, perf: 🚀, test: 🚨, build: 🛠️, ci: ⚙️, chore: ♻️, revert: 🗑️
- Commitlint parser handles emoji prefixes in commit messages

#### Vite Plugins
- `@vitejs/plugin-vue` - Vue SFC support
- `@tailwindcss/vite` - TailwindCSS v4 integration
- `code-inspector-plugin` - Click-to-source navigation in browser

## Code Style
- Single quotes for strings
- Semicolons required
- 100 character print width
- TypeScript strict mode
- Vue 3 Composition API preferred
- Pinia stores using composition API style (see `src/stores/counter.ts`)
