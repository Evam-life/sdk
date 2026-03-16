# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Evam SDK (`@evam-life/sdk`) is a TypeScript SDK for building Certified Applications on the Evam platform (first responder vehicle services). It provides an event-driven API for communicating with Evam's Vehicle Services Android environment and falls back to browser-based behavior when running outside Vehicle Services.

## Commands

- **Build**: `npm run build` (runs `tsup` for core + `tsc` for scripts in parallel via `npm-run-all`)
- **Test all**: `npm run test:all` (Jest with jsdom environment)
- **Test single file**: `npx jest __tests__/path/to/file.test.ts`
- **Test with logs**: `npm run test:with-log`
- **Lint**: `npm run lint` (ESLint, zero warnings allowed)
- **Format**: `npm run format` (Prettier on `src/`)
- **Detect circular deps**: `npm run detect-circular-deps`
- **Generate docs**: `npm run docs:generate` (TypeDoc)

## Architecture

### Dual-Environment Design

The SDK detects whether it's running inside Vehicle Services (Android WebView) via the global `Android` object (`src/data/const/IS_RUNNING_IN_VS.ts`). Every API method uses `AndroidHandler` which either calls the native Android bridge or executes a `nonVsEnvironmentCallback` fallback for development/testing.

### Core Layers

- **`src/api/EvamApi.ts`** — The main singleton class. All public methods are static, organized into namespaces: `event`, `operation`, `notification`, `telephony`, `rakel`, `map`, `cs`, `app`, and `test-utils`. The class is exported without its prototype (see `src/api/index.ts`) to present a plain object interface.
- **`src/api/AndroidHandler.ts`** — Bridge to native Android methods. Routes calls through `androidWrapper` in VS or the fallback outside VS.
- **`src/api/EventMapHandler.ts`** — Generic event pub/sub built on DOM `CustomEvent`. `VehicleServicesEventMapHandler` extends it with Zod parser validation.
- **`src/api/NotificationHandler.ts`** — Manages notification lifecycle and callbacks.

### Type System (Zod-driven)

Types are derived from Zod schemas, not the other way around:

1. **Parsers** (`src/data/parsers/vehicle-services/`) — Zod schemas for each Vehicle Services payload (e.g., `operationParser`, `locationParser`).
2. **Types** (`src/types/vehicle-services/`) — TypeScript types inferred from parsers via `z.infer`.
3. **Event interface** (`src/types/interfaces/VehicleServicesEventPayloadInterface.ts`) — Maps event names to their payload types. All payloads are `| undefined`.
4. **Parser map** (`src/data/parser-maps/vehicleServicesPayloadParserMap.ts`) — Runtime map connecting event names to their Zod parsers for validation.

### Path Aliases

- `@/*` → `./src/*`
- `@/tests/*` → `./__tests__/*`

### Build

Uses `tsup` (CJS + ESM output, terser minification, sourcemaps, dts generation). Entry point: `src/index.ts`.

## Adding a New Vehicle Services Event

1. Create a Zod parser in `src/data/parsers/vehicle-services/` named `<payload>Parser.ts`, export from `src/data/parsers/vehicle-services/index.ts`.
2. Add the inferred type in `src/types/vehicle-services/` using `z.infer`.
3. Add the event name + payload type to `VehicleServicesEventPayloadInterface` (payload must be `| undefined`).
4. Add the event/parser pair to `src/data/parser-maps/vehicleServicesPayloadParserMap.ts`.
5. Add the event to `src/data/array/vehicleServicesEvents`.

## Adding a New Android Method

1. Add the method name and signature to `src/types/interfaces/AndroidMethodNameSignatureMap.ts`. Parameters must be primitives (`string | number | boolean`); objects must be stringified.
2. Add the method to the appropriate `EvamApi` namespace, using `AndroidHandler.call()` with a `nonVsEnvironmentCallback`.

## Code Style

- Prettier: semicolons, double quotes, no parens on single arrow params
- ESLint: `@typescript-eslint/recommended`, zero warnings
- TypeScript: strict mode, `noUncheckedIndexedAccess`, `isolatedModules`

## CI

GitLab CI (`.gitlab-ci.yml`): lint → detect circular deps → test on merge requests and tags. Deploys to npm on tagged master commits.
