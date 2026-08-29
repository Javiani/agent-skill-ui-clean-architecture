# Architecture and layer responsibilities

## 1. Domain layer

The domain layer contains the business model and the rules that remain valid regardless of the interface or technical implementation.

Typical contents:
- entities
- value objects
- business invariants
- domain services
- state transitions
- policies that describe what a valid business outcome is

This layer should not depend on:
- UI rendering code
- HTTP or fetch clients
- browser storage
- framework components
- database or persistence details

## 2. Application layer

The application layer coordinates use cases and orchestrates domain logic.

Typical contents:
- use-case classes or functions
- commands and queries
- workflow orchestration
- validation that depends on interaction between domain concepts
- application services

This layer defines how the system accomplishes a business task, but it does not decide how the information is rendered or stored.

## 3. Presentation/UI layer

The presentation layer handles interaction with the user, the interface shell, and rendering responsibilities.

Typical contents:
- screens
- forms
- route-level components
- view composition
- state derived from user actions
- translation between UI events and application inputs

This layer should adapt user actions to application commands and adapt application results to display models.

## 4. Infrastructure layer

The infrastructure layer handles external mechanisms.

Typical contents:
- networking clients
- persistence adapters
- storage implementations
- cache implementations
- integration connectors
- platform-specific wrappers

This layer should translate external protocols into internal contracts used by the application or domain.

## Boundary rules

At every boundary, use a conversion point.

Examples:
- UI event -> application command
- API response -> domain or application DTO
- persistence model -> domain entity
- local storage value -> application contract

The purpose is not to add ceremony; it is to preserve independence and testability.

## Preferred dependency direction

The general flow is:

presentation -> application -> domain
infrastructure -> application -> domain

The domain is the center: it expresses the stable meaning of the system.

The application orchestrates work.
The UI and infrastructure implement delivery and integration.

## Why this matters

This structure reduces coupling and makes the codebase resilient to change. When a framework changes, an API contract changes, or storage technology changes, the core business logic remains intact.

## Common anti-patterns

- business rules defined directly in component code
- fetching data and validating it in a screen component
- domain logic depending on a library-specific state container
- application use cases importing storage implementations directly
- making an API client the source of truth for domain behavior
