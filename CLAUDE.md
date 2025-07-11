# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a functional programming library for TypeScript called `@keienla/functional`. It provides a comprehensive set of utility functions for functional programming patterns including currying, composition, filtering, mapping, and type utilities.

## Development Commands

### Testing
- `npm test` - Run all tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run testVerbose` - Run tests with verbose output and watch mode
- `npm run testCoverage` - Run tests with coverage reporting

### Build & Deploy
- `npm run npmjs` - Deploy to npm using the deploy script

## Architecture

### Core Structure
- **Entry Point**: `src/functional.ts` - Main module that exports all functions
- **Function Organization**: Each utility function has its own directory under `src/` containing:
  - `{name}.ts` - Implementation
  - `{name}.test.ts` - Tests
  - `{name}.model.ts` - TypeScript type definitions (where applicable)
  - `{name}.md` - Documentation

### Key Directories
- `src/models/` - Core TypeScript utility types and interfaces
- `src/utils/` - Internal utility functions (currently just `_blank`)
- `src/_internal/` - Internal implementation helpers for core functions
- `src/_wip/` - Work in progress features (monads, etc.)

### TypeScript Configuration
- Target: ES6 with CommonJS modules
- Strict mode enabled with comprehensive type checking
- Outputs to `./dist/` with declaration files
- Entry point configured as `src/functional.ts`

### Testing Setup
- Uses Jest with ts-jest preset
- Test files: `*.test.ts` and `*.spec.ts`
- Coverage reports to `coverage/` directory
- Node environment for testing

## Key Function Categories

### Core Functional Programming
- **curry**: Advanced currying with blank parameter support
- **compose/pipe**: Function composition utilities
- **partial**: Partial application of functions
- **memoize**: Function memoization

### Data Transformation
- **map/filter/reduce**: Array and object transformation utilities
- **pick/pickAll**: Object property selection
- **mapObject/filterObject/reduceObject**: Object-specific operations

### Type Utilities
- **is/isnt**: Type checking functions
- **isType**: Comprehensive type checking with individual type checkers
- **type**: Get type of value as string
- **arrayIs/objectIs**: Specialized type checking

### Function Utilities
- **arity/nAry/unAry**: Arity manipulation
- **flipArgs/reverseArgs/gatherArgs/spreadArgs**: Argument manipulation
- **when/whenElse**: Conditional execution

## Special Features

### Blank Parameter System
The curry function supports a "blank" parameter system allowing partial application with placeholders. This is implemented in `src/utils/_blank.ts`.

### Advanced Type System
Extensive use of TypeScript's type system with complex utility types in `src/models/` for accurate type inference across all functional operations.

### Trampoline Function
`src/transpoline/` contains a trampoline implementation for optimizing recursive function calls.

## Working with This Codebase

### Adding New Functions
1. Create directory under `src/` with function name
2. Implement in `{name}.ts` with proper TypeScript types
3. Add comprehensive tests in `{name}.test.ts`
4. Create type definitions in `{name}.model.ts` if needed
5. Add documentation in `{name}.md`
6. Export from `src/functional.ts`
7. Update README.md with link to documentation

### Running Single Tests
Use Jest's pattern matching: `npm test -- --testNamePattern="curry"`

### Type Safety
All functions are designed with strict TypeScript typing. The `src/models/` directory contains sophisticated type utilities that enable precise type inference for functional operations.