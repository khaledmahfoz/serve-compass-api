# Serve Compass – Restaurant Management API

Serve Compass is a **NestJS-based REST API** for managing restaurant data such as **products, categories, branches, users, and roles**.  
It is designed to be the backend for web and mobile front-ends, with a focus on clean architecture, strong typing, and robust tooling.

---

## Features

- **Authentication & Authorization**
  - Email/password login and registration
  - Google OAuth integration
  - Role-based access control and role management
- **Product & Category Management**
  - CRUD operations for categories and products
  - Image upload and deletion (via S3-compatible storage)
- **User & Role Management**
  - User CRUD
  - Assigning and managing user roles
- **Infrastructure & Tooling**
  - PostgreSQL via TypeORM
  - Redis + BullMQ for background jobs/queues
  - Nodemailer-based email sending
  - Winston logging with daily rotate files
  - Compodoc-powered API documentation

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (via TypeORM)
- **Caching / Queues**: Redis, BullMQ
- **Auth**: Passport (local + Google OAuth 2.0)
- **Mailing**: Nodemailer
- **Storage**: AWS S3 (via `@aws-sdk/client-s3`, `sharp` for image processing)
- **Testing**: Jest, Supertest
- **Documentation**: Compodoc

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- Yarn
- Docker & Docker Compose (for local DB/Redis via `docker-compose.dev.yaml`)

### Installation

```bash
# using yarn (recommended)
yarn install
```

---

## Running the App

### Development

Start PostgreSQL/Redis/etc. via Docker and run the Nest app in watch mode:

```bash
# start dev infra + backend (from package.json)
yarn start:dev
```

This uses `docker-compose.dev.yaml` to bring up services and then starts Nest in watch mode.

### Production Build

```bash
# build
yarn build

# run compiled app
yarn start:prod
```

---

## Scripts (package.json)

- **`start`** – Start NestJS in normal mode
- **`start:dev`** – Start Docker dev services and NestJS in watch mode
- **`start:debug`** – Start in debug mode with watch
- **`start:prod`** – Run compiled `dist/main.js`
- **`build`** – Compile TypeScript to `dist`
- **`test`** – Run Jest test suite
- **`test:watch`** – Jest in watch mode
- **`test:cov`** – Jest with coverage
- **`test:debug`** – Jest with Node inspector
- **`test:e2e`** – Run e2e tests
- **`lint`** – ESLint with auto-fix
- **`format`** – Prettier formatting
- **`docs:build`** – Generate Compodoc documentation
- **`docs:post-clean`** – Remove Compodoc unneeded files

Run any script with:

```bash
yarn <script-name>
```

---

## Documentation (Compodoc)

The project uses **Compodoc** for API and architecture documentation.

```bash
# generate documentation
yarn docs:build
```

Additional custom markdown documentation pages are configured via:

- `src/docs/summary.json`
- Markdown files such as `src/docs/introduction.md`

These appear in the Compodoc sidebar under the additional documentation section.

---

## Project Structure (High Level)

```text
src/
  entities/             # TypeORM entities (User, Role, Product, Category, etc.)
  lib/                  # Shared libraries, providers, utils, decorators
  migrations/           # Database migrations
  modules/
    auth/               # Auth & session management
    users/              # User CRUD and related logic
    roles/              # Roles and permissions
    roles-management/   # Managing user roles
    categories/         # Category CRUD and images
    products/           # Product CRUD and images
  types/                # Shared interfaces, enums, DTO types
  docs/                 # Custom markdown docs wired into Compodoc
main.ts                 # Application bootstrap
main.module.ts          # Root NestJS module
```

`dist/` and `documentation/` are generated folders for compiled code and generated docs, respectively.

---

## Testing

Run all tests:

```bash
yarn test
```

Run end-to-end tests:

```bash
yarn test:e2e
```

Run tests with coverage:

```bash
yarn test:cov
```

---

## License

This project is currently **UNLICENSED** (see `package.json`).  
Check with the repository owner before using it in production or distributing derivatives.
