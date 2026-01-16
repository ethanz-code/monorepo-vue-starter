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
IMPORTANT: Direct `git commit` is blocked by pre-commit hooks (`.husky/pre-commit`). Use:
- `bun run commit` - Interactive commit with Commitlint (emoji-based conventional commits)
- `bun run commit:check` - Run standardize (type-check + lint + format) before committing

To bypass the pre-commit restriction: `BYPASS_PRECOMMIT=1 git commit ...`

The pre-commit hook (`.husky/pre-commit:4-14`) checks for the `BYPASS_PRECOMMIT` environment variable and blocks commits unless it's set.

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
- **State Management**: Pinia via `@ethan-utils/pinia` wrapper (utility wrapper around Pinia)
- **HTTP Client**: Axios via `@ethan-utils/axios` wrapper (utility wrapper around Axios)
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

**Path Alias**: `@` maps to `src/` directory (configured in `vite.config.ts:19`)

### Key Configuration Details

#### API Client Initialization
The project uses `@ethan-utils/axios` wrapper for Axios, initialized in `src/main.ts:9-14` with:
- Base URL from `VITE_API_BASE_URL` env var (defaults to `http://localhost:3000/api`)
- 10 second timeout
- The wrapper creates a global request instance that can be imported from `@ethan-utils/axios`

#### State Management
Uses `@ethan-utils/pinia` wrapper for Pinia. Stores follow the composition API pattern (see `src/stores/counter.ts` for reference).

#### TypeScript Configuration
- Project references setup with separate configs for app and node
- Strict type checking enabled via vue-tsc

#### Linting Setup
Dual linting strategy (configured in `eslint.config.ts`):
1. **Oxlint**: Ultra-fast Rust-based linter for quick feedback (correctness rules only)
2. **ESLint**: Comprehensive linting with Vue, TypeScript, and Prettier integration
- ESLint config extends `@vue/eslint-config-typescript` and `eslint-plugin-vue`
- Prettier is integrated via `@vue/eslint-config-prettier`
- **Custom rule overrides** (see `eslint.config.ts:25-32`):
  - `vue/multi-word-component-names: off` - Allows single-word component names
  - `@typescript-eslint/no-explicit-any: off` - Allows `any` type usage
  - `@typescript-eslint/no-unused-vars: off` - Delegates unused var checks to Oxlint
  - No multiple empty lines, no trailing spaces enforced

#### Commit Convention
Custom emoji-based conventional commits configured in `.commitlintrc.ts`:
- feat: ✨, fix: 🐛, docs: 📚, style: 💎, refactor: 📦, perf: 🚀, test: 🚨, build: 🛠️, ci: ⚙️, chore: ♻️, revert: 🗑️
- Custom parser (`.commitlintrc.ts:7-25`) handles emoji prefixes using regex pattern matching
- Interactive prompts are in Chinese (see `.commitlintrc.ts:37-133`)

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
