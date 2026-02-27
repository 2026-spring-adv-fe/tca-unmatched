# Copilot Instructions

## Commands

```bash
npm run dev       # start dev server
npm run build     # tsc type-check + vite build
npm run lint      # eslint
```

No test suite is configured.

## Architecture

This is a React 19 + TypeScript + Vite app for tracking Connect Four (Unmatched) game results. It uses `react-router` v7 with `HashRouter` and has three routes: `/` (Home), `/setup` (Setup), `/play` (Play).

**State lives in `App.tsx` and is drilled down as props — intentionally. Do not introduce React Context.**

- `gameResults: GameResult[]` is the single shared state value, owned by `App`
- `App` computes derived values (`getGeneralFacts`, `getMostPopularFirstMove`) before passing them to `Home` as props — child components receive processed data, not raw state
- `Play` receives only an `addNewGameResult` callback, not the state or setter directly
- `Setup` currently receives no props

All game result logic (types, pure functions) lives in `GameResults.ts`, not in components.

## Conventions

- Components use named exports (`export const Foo: React.FC<FooProps>`) with a co-located `type FooProps` in the same file
- `App.tsx` organizes its component body with comment headers: `// React hooks...`, `// Calculated state and other funcs...`, `// Return JSX...`
- Styling uses Tailwind CSS v4 + DaisyUI v5 utility classes directly in JSX (no separate CSS modules)
- `GameResults.ts` (not `.tsx`) holds all types and pure functions — no JSX, no hooks
