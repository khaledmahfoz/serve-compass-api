# Introduction

Welcome to **Serve Compass**, a backend service built with **NestJS** and **TypeScript** for managing modern restaurant operations.

Serve Compass exposes a set of RESTful APIs for:

- **Authentication & Authorization** – email/password login, Google OAuth, sessions, and role-based access control.
- **Catalog Management** – creating and managing **categories** and **products**, including image upload and deletion.
- **User & Role Management** – managing users, roles, and role assignments.

This documentation is generated with **Compodoc** and is intended for:

- Backend developers integrating or extending the API.
- Frontend/mobile developers consuming the endpoints.
- DevOps engineers deploying and operating the service.

In the next sections, you will find:

- **Modules** – a breakdown of the main NestJS modules (`auth`, `users`, `roles`, `categories`, `products`, etc.).
- **DTOs & Entities** – the shapes of requests/responses and database models.
- **Guides** – endpoint-level details and usage patterns provided per module.

If you are new to the codebase, a recommended path is:

1. Start with the **modules overview** to understand the architecture.
2. Review the **auth module** to learn how sessions and security are handled.
3. Explore **categories** and **products** modules for core business flows.

You can always refer back to this introduction as a high-level map of the system.
