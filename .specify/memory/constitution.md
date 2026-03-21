<!--
Sync Impact Report:
- Version change: (initial) → 1.0.0
- Modified principles: N/A (initial version)
- Added sections:
  * All 7 core principles (Type Safety, Modular Architecture, Test-First Development, Database Efficiency, Database Consistency, API Design Standards, Code Quality)
  * Technical Standards section
  * Development Workflow section
  * Governance section
- Removed sections: N/A (initial version)
- Templates requiring updates:
  * .specify/templates/plan-template.md - Constitution Check section needs to be added/updated
  * .specify/templates/spec-template.md - Requirements section aligned with principles
  * .specify/templates/tasks-template.md - Task categorization reflects principles
  * ⚠ Pending: Command templates - Need to verify and create/update command templates
- Follow-up TODOs: None
-->

# Serve Compass Constitution

## Core Principles

### I. Type Safety

All code MUST use TypeScript with strict mode enabled. Type definitions MUST be explicit and accurate for all function parameters, return types, and data structures. The `any` type MUST be avoided except where absolutely necessary, with justification. Interfaces MUST be used for public APIs and object shapes. Enums MUST be used for fixed sets of values (e.g., roles, auth providers). Generics MUST be used for reusable, type-safe components.

**Rationale**: Strong typing catches errors at compile-time rather than runtime, improves IDE support and documentation, prevents entire classes of bugs, and enables safer refactoring.

### II. Modular Architecture

The codebase MUST follow NestJS modular architecture with feature-based modules. Each module (auth, users, products, categories, etc.) MUST be self-contained with its own controllers, services, DTOs, and documentation. Shared utilities MUST be placed in `src/lib/` and exported for reuse. Modules MUST communicate through dependency injection and well-defined interfaces. Circular dependencies MUST be avoided. Each module MUST be independently testable.

**Rationale**: Modular design enables parallel development, reduces coupling, improves maintainability, and makes testing easier by isolating components.

### III. Test-First Development

Unit tests MUST be written for services and utilities before or alongside implementation. Integration tests MUST be written for API endpoints using Supertest. E2E tests MUST cover critical user flows (authentication, CRUD operations, file uploads). Tests MUST be independent and deterministic. Mock external dependencies (database, email, S3) in tests. Test coverage MUST be maintained at acceptable levels (targets defined in technical standards). Tests MUST be run in CI/CD pipeline.

**Rationale**: Tests serve as living documentation, prevent regressions, enable confident refactoring, and catch bugs early in the development cycle.

### IV. Database Efficiency

All database queries MUST be efficient and performant. Pagination MUST be used for list endpoints (avoid returning all records). Query results MUST be limited using `take` and `skip` parameters. N+1 queries MUST be avoided by using proper relations and eager loading (`relations` option). Database indexes MUST be defined on frequently queried fields (email, foreign keys, order fields). Complex queries MUST be optimized and tested for performance. Large datasets MUST use streaming or batch processing. Connection pooling MUST be configured properly.

**Rationale**: Efficient queries prevent performance degradation, scale with data growth, reduce database load, and ensure consistent response times.

### V. Database Consistency

Database operations MUST maintain data integrity and consistency. Transactions MUST be used for multi-step operations that involve multiple entities or services. Foreign key relationships MUST be properly defined with cascade rules. Unique constraints MUST be enforced at database level. Soft deletes MUST be used instead of hard deletes where data preservation is needed. Concurrent updates MUST be handled properly using optimistic locking or versioning. Migrations MUST be written and versioned for all schema changes. Referential integrity MUST never be violated.

**Rationale**: Consistency prevents data corruption, ensures reliable business logic, prevents orphaned records, and maintains data integrity across concurrent operations.

### VI. API Design Standards

All endpoints MUST follow RESTful conventions with appropriate HTTP methods (GET, POST, PATCH, DELETE). URL structures MUST be resource-based and consistent (e.g., `/products`, `/products/:id/image`). HTTP status codes MUST be used correctly (200, 201, 204, 400, 401, 403, 404, 409, 500). Request/response bodies MUST use DTOs with proper validation decorators. Error responses MUST follow a consistent structure with clear, actionable messages. APIs MUST be versioned if breaking changes are needed. All endpoints MUST be documented with Swagger/Compodoc decorators.

**Rationale**: Consistent API design improves developer experience, enables proper client implementation, ensures predictable behavior, and reduces integration friction.

### VII. Code Quality

All code MUST follow ESLint rules with auto-fix enabled. Prettier MUST be used for consistent formatting. Code MUST be reviewed by at least one team member before merging. Functions MUST be small and focused on a single responsibility. Comments MUST be used only to explain "why", not "what" (the code should be self-documenting). Magic numbers and strings MUST be extracted to constants. Error handling MUST be comprehensive with proper exception filters. Logging MUST use Winston with appropriate log levels and structured data.

**Rationale**: High-quality code is maintainable, readable, and less prone to bugs. Consistent style improves collaboration and reduces cognitive load.

## Technical Standards

### Technology Stack

- **Runtime**: Node.js 22 (Docker: 22-alpine3.21)
- **Framework**: NestJS with TypeScript strict mode
- **Database**: PostgreSQL with TypeORM
- **Caching**: Redis (for sessions and caching)
- **Queue**: BullMQ for background job processing
- **Authentication**: Passport with local strategy and Google OAuth 2.0
- **Storage**: S3-compatible storage (Backblaze B2) with Sharp for image processing
- **Email**: Nodemailer with Pug templates
- **Testing**: Jest, Supertest
- **Documentation**: Compodoc
- **Linting/Formatting**: ESLint, Prettier
- **Package Manager**: Yarn

### Performance Requirements

- API endpoints MUST respond within 200ms (p95) under normal load
- Database queries MUST complete within 100ms (p95) under normal load
- Image uploads MUST be compressed to WebP format before storage
- Background jobs MUST have exponential backoff retry (max 5 attempts)
- Pagination MUST be enforced with maximum limits (default: 10, max: 100)

### Security Requirements

- Passwords MUST be hashed using bcrypt with 10 salt rounds
- Session cookies MUST use httpOnly and secure flags in production
- Input validation MUST be enforced for all API endpoints using ValidationPipe
- File uploads MUST be validated for type and size (max 3MB for images)
- CORS MUST be configured to allow only approved origins
- Environment variables MUST be used for all sensitive configuration
- SQL injection vulnerabilities MUST be prevented through parameterized queries (TypeORM)

### Code Coverage Targets

- Unit test coverage: Minimum 80% for services and utilities
- Integration test coverage: Minimum 60% for API endpoints
- E2E test coverage: All critical user flows (authentication, CRUD, file uploads)

## Development Workflow

### Feature Development Process

1. **Specification**: Write feature specification in `/specs/[feature-name]/spec.md` with user stories and acceptance criteria
2. **Planning**: Run `/speckit.plan` to generate implementation plan with research, data model, and contracts
3. **Implementation**: Follow `/specs/[feature-name]/tasks.md` generated by `/speckit.tasks`
4. **Testing**: Write and run tests before, during, and after implementation
5. **Review**: Submit pull request for code review
6. **Merge**: Merge after approval and passing CI/CD checks

### Code Review Checklist

- [ ] Code follows TypeScript strict mode with proper typing
- [ ] No `any` types used without justification
- [ ] Modular architecture respected (feature-based modules)
- [ ] Unit tests written and passing for new services/utilities
- [ ] Integration tests written and passing for new endpoints
- [ ] Database queries are efficient (pagination, no N+1)
- [ ] Transactions used for multi-step operations
- [ ] API follows RESTful conventions
- [ ] Proper error handling and logging
- [ ] ESLint and Prettier rules followed
- [ ] Swagger documentation added/updated
- [ ] No hardcoded secrets or credentials

### Quality Gates

- All tests MUST pass (unit, integration, E2E)
- ESLint MUST pass with no errors
- Build MUST complete successfully
- Code coverage MUST meet minimum thresholds
- Security scan MUST pass (if configured)
- Documentation MUST be updated (API docs, README if needed)

### Deployment Process

1. **Branch**: Create feature branch from `main` following naming convention: `feature/description` or `fix/description`
2. **Develop**: Implement changes on feature branch
3. **Test**: Run full test suite locally (`yarn test`, `yarn test:e2e`)
4. **Review**: Submit pull request and address feedback
5. **Merge**: Merge to `main` after approval
6. **Build**: Production build (`yarn build`)
7. **Deploy**: Deploy to production environment

### Rollback Procedure

- Database migrations MUST be reversible or have rollback scripts
- Deployments MUST preserve previous versions for rollback
- Feature flags MUST be used for risky changes
- Database changes MUST be tested in staging first

## Governance

### Amendment Process

1. Proposed amendments MUST be documented with rationale and impact analysis
2. Amendments MUST be reviewed by development team
3. Amendments require consensus approval (no objections)
4. Version MUST be incremented according to semantic versioning rules:
   - MAJOR: Backward incompatible changes (principle removal or redefinition)
   - MINOR: New principle or materially expanded guidance
   - PATCH: Clarifications, wording improvements, non-semantic changes
5. Constitution MUST be updated with new version number and amendment date
6. Templates and documentation MUST be updated to reflect changes
7. Changes MUST be communicated to all team members

### Compliance Verification

- Constitution compliance MUST be verified during code reviews
- Automated checks MUST be added to CI/CD pipeline where possible
- Violations MUST be documented with justification in PR description
- Regular reviews MUST be conducted to ensure ongoing compliance
- Non-compliant code MUST be refactored or amended with proper approval

### Complexity Justification

- Violations of principles (especially simplicity and modularity) MUST be justified
- Justification MUST include:
  - Specific problem being solved
  - Why simpler alternatives were insufficient
  - Expected benefits of complexity
  - Plan to mitigate complexity risks
- Complex solutions MUST have adequate documentation and tests
- Technical debt MUST be tracked and addressed

### References

- Runtime development guidance: See `AGENTS.md` for comprehensive technical documentation
- API documentation: Generated via `yarn docs:build` (Compodoc)
- Quickstart guide: See project README.md
- Project structure: See `AGENTS.md` Code Organization section

**Version**: 1.0.0 | **Ratified**: 2026-03-21 | **Last Amended**: 2026-03-21
