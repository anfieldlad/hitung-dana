# HitungDana

HitungDana is a TypeScript monorepo for financial calculator applications.

The current version focuses on the first core feature:
- mortgage simulation
- principal loan input
- loan term input in years
- yearly interest input for each year of the term
- monthly amortization table output

Current app structure:
- product name: `HitungDana`
- first feature: `Mortgage Simulator`

## Tech Stack

- `pnpm` workspace
- `React`
- `Vite`
- `TypeScript`
- `Vitest`

## Repository Structure

- `apps/web`
  Main web application for the mortgage simulator.
- `packages/finance-core`
  Reusable mortgage simulation logic.
- `packages/shared`
  Shared types and formatting utilities.

## Running the Project

Install dependencies:

```bash
corepack pnpm install
```

Start the development server:

```bash
npm run dev
```

Default URL:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
npm run check
npm run build
npm run test
```

## Basic Workflow

1. Enter `Principal`
2. Enter `Term (Years)`
3. Fill in yearly interest rates for each year of the term
4. Click `View Amortization Table`
5. Review the summary and monthly amortization table

## Notes

- The current application runs without a backend.
- Simulation logic is separated from the UI to make it easier to maintain and reuse.
- The repository is structured to support future financial calculator features.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Copyright

Copyright (c) 2026 BAD AI ([badai.tech](https://badai.tech/)).
