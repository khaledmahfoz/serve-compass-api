---
description: 'Task list template for feature implementation'
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **NestJS modules**: `src/modules/[module-name]/`
- **Shared utilities**: `src/lib/[type]/` (constants, decorators, dtos, filters, guards, services, utils)
- **Entities**: `src/entities/`
- **Types**: `src/types/interfaces/` and `src/types/enums/`
- **Migrations**: `src/migrations/`
- **Tests**: `tests/unit/`, `tests/integration/`, `tests/e2e/`

## Constitution Compliance Notes

All implementation tasks MUST adhere to:

- **Type Safety**: TypeScript strict mode, explicit types, no `any` without justification
- **Modular Architecture**: Feature-based modules, self-contained, no circular dependencies
- **Test-First**: Tests written before or alongside implementation
- **Database Efficiency**: Pagination, no N+1 queries, proper indexes
- **Database Consistency**: Transactions for multi-step operations, migrations for schema changes
- **API Standards**: RESTful, proper status codes, DTOs with validation
- **Code Quality**: ESLint/Prettier, focused functions, Winston logging, proper error handling

## Phase 1: Setup & Research (Shared Infrastructure)

**Purpose**: Project initialization and technical investigation

- [ ] T001 [P] Review similar modules in codebase for patterns (AGENTS.md)
- [ ] T002 [P] Research required NestJS dependencies and modules
- [ ] T003 [P] Identify data model requirements and entity relationships
- [ ] T004 [P] Plan database migrations if schema changes needed
- [ ] T005 [P] Identify external service integrations (email, storage, cache)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Create/update entities in `src/entities/` with TypeORM decorators
- [ ] T007 [P] Create DTOs in `src/lib/dtos/` with class-validator decorators
- [ ] T008 [P] Create enums in `src/types/enums/` if new fixed value sets needed
- [ ] T009 [P] Create interfaces in `src/types/interfaces/` for shared types
- [ ] T010 Generate database migration file (if schema changes)
- [ ] T011 [P] Create base service interfaces and methods
- [ ] T012 Setup error handling and exception filters (if needed)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Unit test for [service/utility] in `tests/unit/`
- [ ] T014 [P] [US1] Unit test for [utility function] in `tests/unit/`
- [ ] T015 [P] [US1] Integration test for [endpoint] in `tests/integration/`

### Implementation for User Story 1

- [ ] T016 [P] [US1] Create [ServiceName] in `src/modules/[module]/[module].service.ts`
- [ ] T017 [P] [US1] Implement business logic with proper error handling and logging
- [ ] T018 [P] [US1] Create [ControllerName] in `src/modules/[module]/[module].controller.ts`
- [ ] T019 [P] [US1] Implement endpoints following RESTful conventions
- [ ] T020 [US1] Add DTOs with validation decorators for request/response
- [ ] T021 [US1] Add guards for authentication/authorization (if needed)
- [ ] T022 [US1] Add Swagger/Compodoc decorators for API documentation
- [ ] T023 [US1] Register module in `src/modules/[module]/[module].module.ts`
- [ ] T024 [US1] Add module to main module imports
- [ ] T025 [US1] Run database migration (if applicable)
- [ ] T026 [US1] Configure Winston logging for module operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T027 [P] [US2] Unit test for [service/utility] in `tests/unit/`
- [ ] T028 [P] [US2] Integration test for [endpoint] in `tests/integration/`

### Implementation for User Story 2

- [ ] T029 [P] [US2] Create/extend [ServiceName] in `src/modules/[module]/[module].service.ts`
- [ ] T030 [P] [US2] Implement business logic with transactions (if multi-step)
- [ ] T031 [P] [US2] Add endpoints to [ControllerName] in `src/modules/[module]/[module].controller.ts`
- [ ] T032 [US2] Add DTOs with validation for new endpoints
- [ ] T033 [US2] Ensure database queries use pagination and proper relations
- [ ] T034 [US2] Add Swagger decorators for new endpoints
- [ ] T035 [US2] Integrate with other modules via dependency injection

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T036 [P] [US3] Unit test for [service/utility] in `tests/unit/`
- [ ] T037 [P] [US3] Integration test for [endpoint] in `tests/integration/`

### Implementation for User Story 3

- [ ] T038 [P] [US3] Create/extend [ServiceName] in `src/modules/[module]/[module].service.ts`
- [ ] T039 [P] [US3] Add endpoints to [ControllerName]
- [ ] T040 [US3] Add DTOs with validation
- [ ] T041 [US3] Ensure database efficiency (indexes, no N+1 queries)
- [ ] T042 [US3] Add error handling and logging

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Update AGENTS.md if new patterns introduced
- [ ] TXXX [P] Run ESLint with auto-fix on all new code
- [ ] TXXX [P] Run Prettier on all new code
- [ ] TXXX Ensure all Winston logging uses appropriate levels
- [ ] TXXX [P] Run full test suite (unit, integration, e2e)
- [ ] TXXX Verify code coverage meets targets (80% unit, 60% integration)
- [ ] TXXX [P] API documentation review and update (Swagger)
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX Security review (input validation, authorization)
- [ ] TXXX Verify database migrations are reversible

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup & Research (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Research - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- DTOs before controllers
- Services before controllers
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- DTOs can be created in parallel across stories
- Services within different stories can be worked on in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Unit test for [service/utility] in tests/unit/"
Task: "Unit test for [utility function] in tests/unit/"
Task: "Integration test for [endpoint] in tests/integration/"

# Launch all implementation tasks for User Story 1 together:
Task: "Create [ServiceName] in src/modules/[module]/[module].service.ts"
Task: "Create [ControllerName] in src/modules/[module]/[module].controller.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup & Research
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup & Research + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup & Research + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All code must follow TypeScript strict mode
- Database queries must use pagination and avoid N+1
- Transactions required for multi-step database operations
- ESLint and Prettier must be run before committing
- Winston logging required for all operations
- Swagger/Compodoc decorators required for all endpoints
