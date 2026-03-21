# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by `/speckit.plan` command. See `.specify/templates/plan-template.md` for execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: TypeScript (strict mode) with Node.js 22
**Primary Dependencies**: NestJS, TypeORM, PostgreSQL, Redis, BullMQ
**Storage**: PostgreSQL (TypeORM), Redis (sessions/cache), Backblaze B2 (images)
**Testing**: Jest, Supertest
**Target Platform**: Linux server (Node.js runtime)
**Project Type**: REST API service
**Performance Goals**: <200ms p95 API response, <100ms p95 database query
**Constraints**: Type safety required, modular architecture, test-first development
**Scale/Scope**: Restaurant management system with products, categories, users, roles

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### Principle Compliance

- [ ] **Type Safety**: All new code uses TypeScript strict mode with explicit types
- [ ] **Modular Architecture**: Feature follows NestJS modular pattern with self-contained modules
- [ ] **Test-First Development**: Tests planned before or alongside implementation
- [ ] **Database Efficiency**: Queries use pagination, avoid N+1, proper indexes
- [ ] **Database Consistency**: Transactions used for multi-step operations, migrations planned
- [ ] **API Design Standards**: RESTful conventions, proper status codes, DTOs with validation
- [ ] **Code Quality**: ESLint/Prettier rules followed, proper error handling, Winston logging

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── entities/            # TypeORM entities
├── lib/                # Shared utilities, constants, services
│   ├── constants/
│   ├── decorators/
│   ├── dtos/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── messages/
│   ├── processors/
│   ├── providers/
│   ├── services/
│   └── utils/
├── modules/             # Feature modules (auth, users, products, etc.)
├── migrations/          # Database migrations
├── types/              # TypeScript interfaces and enums
└── main.ts            # Application entry point

tests/
├── unit/               # Unit tests for services/utilities
├── integration/        # Integration tests for endpoints
└── e2e/             # End-to-end tests for critical flows
```

**Structure Decision**: NestJS feature-based modules with shared utilities in `src/lib/`, tests organized by type (unit/integration/e2e)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                   | Why Needed         | Simpler Alternative Rejected Because  |
| --------------------------- | ------------------ | ------------------------------------- |
| [e.g., using any type]      | [current need]     | [why explicit typing insufficient]    |
| [e.g., circular dependency] | [specific problem] | [why alternative design insufficient] |

## Implementation Phases

### Phase 0: Research

**Purpose**: Investigate technical requirements, dependencies, and constraints

- [ ] Research existing patterns in codebase (AGENTS.md, similar modules)
- [ ] Identify required dependencies (NestJS modules, TypeORM entities)
- [ ] Define data model changes (new/modified entities)
- [ ] Identify API endpoints needed (RESTful conventions)
- [ ] Document integration points (external services, other modules)

### Phase 1: Design

**Purpose**: Create detailed technical specifications

- [ ] Define entities with relationships (TypeORM decorators)
- [ ] Define DTOs with validation decorators (class-validator)
- [ ] Define API contracts (endpoints, request/response formats)
- [ ] Plan database migrations if schema changes required
- [ ] Define service interfaces and methods
- [ ] Plan test coverage (unit/integration/e2e)

### Phase 2: Implementation

**Purpose**: Implement feature following test-first principles

See `tasks.md` for detailed task breakdown by user story

## Risk Assessment

- [ ] Identify performance bottlenecks (N+1 queries, large datasets)
- [ ] Plan migration strategy (if schema changes)
- [ ] Identify security considerations (input validation, authorization)
- [ ] Plan error handling and logging strategy
- [ ] Ensure backward compatibility if breaking changes

## Success Criteria

- [ ] All constitution principles satisfied
- [ ] Code coverage meets minimum targets (80% unit, 60% integration)
- [ ] Performance requirements met (<200ms API, <100ms DB)
- [ ] All tests passing (unit, integration, e2e)
- [ ] ESLint and Prettier rules followed
- [ ] API documentation updated (Swagger decorators)
- [ ] Database migrations tested and reversible
