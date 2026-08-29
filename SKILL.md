# UI Clean Architecture Agent Skill

Use this skill when building or modifying a frontend application with a layered, framework-agnostic architecture inspired by Clean Architecture.

## When to use this skill

Use it for:
- introducing a new feature in an existing UI application
- refactoring legacy code toward a stable architecture
- deciding where new modules should live
- reviewing code for dependency violations
- designing domain logic, use cases, adapters, and infrastructure boundaries

If the task is about a business rule, state model, validation, or workflow orchestration, this skill should guide the design.

## Core principles

1. Keep business logic independent from UI, browser APIs, network layers, and framework details.
2. Dependencies always point inward: UI and infrastructure may depend on application/domain code, but domain code must not depend on UI or infrastructure.
3. Place behavior by responsibility, not by file type or framework convention.
4. Treat the UI as a delivery mechanism, not the source of truth for business decisions.
5. Use adapters at boundaries to translate between internal concepts and external systems.

## Mandatory rules

- Never put domain rules inside components, hooks, route handlers, or API clients unless they are adapter code.
- Never let domain or application code import browser-only, framework-only, or storage-specific APIs directly.
- Never make infrastructure code define core business rules.
- Never let a feature depend on a UI library when the logic could be expressed as a domain or application concern.
- Prefer interfaces/ports for external dependencies so the core can remain testable and independent.

## Decision criteria

Use these questions to decide where code belongs:

- If it expresses a business entity, rule, invariant, or state transition, it belongs in the domain.
- If it orchestrates a use case, validation, workflow, or coordination between domain concepts, it belongs in the application layer.
- If it adapts HTTP, storage, persistence, browser events, or a framework to the internal model, it belongs in a boundary adapter or infrastructure layer.
- If it renders UI, collects input, or displays output to the user, it belongs in the presentation/UI layer.

## Typical layer structure

- Domain: entities, value objects, rules, business policies, aggregates, core types
- Application: use cases, service orchestration, commands/queries, validation and flow control
- Adapters: controllers, presenters, mappers, DTO transformation, view models, UI-specific bridging
- Infrastructure: API clients, persistence, storage, caching, integrations, platform implementations

## Dependency flow

The normal direction is:

UI -> adapters -> application -> domain
Infrastructure -> adapters -> application -> domain

The important rule is that the inner layers do not import the outer layers.

## Implementation workflow

1. Start from the business problem, not from the UI.
2. Model the domain concepts and invariants first.
3. Define the use cases the application must fulfill.
4. Introduce ports or interfaces for external concerns.
5. Implement adapters for UI and infrastructure.
6. Compose the feature in the application layer before wiring it to the UI.
7. Keep the core logic free of framework-specific code.

## Creating new modules

When creating a new module, choose a folder name that matches responsibility, not technology. Good examples:
- `domain/user`
- `application/auth`
- `presentation/login`
- `infrastructure/http`

Avoid names that describe only a framework or a file type, such as:
- `components` for business rules
- `api` for domain logic
- `hooks` for core workflow logic
- `services` when the module is really an app use case

## Review checklist

Before accepting code, verify:
- domain code is free of UI and infrastructure imports
- application logic is not coupled to browser or framework APIs
- infrastructure adapters are thin and translation-oriented
- data shapes are translated at boundaries
- tests cover domain and application rules without depending on UI internals
- there are no cycles between layers

## Refactoring guidance

If code is hard to test, has UI-specific logic in the center of the app, or mixes network access with business decisions, move logic outward or inward according to responsibility:
- business rules into domain
- orchestration into application
- framework and API plumbing into adapters/infrastructure

## Anti-patterns

Never do these:
- Put validation, calculation, or state transitions directly in components
- Fetch data and then encode business rules inside a screen component
- Let the domain know about HTTP status codes, browser storage, or widget APIs
- Import a repository implementation directly into the application layer without an abstraction
- Build a feature by starting with presentation code and then wrapping core logic later

## Source-of-truth documentation

The architecture described in `knowledge/` is the authoritative source.
Use it when you need deeper rationale, examples, or explicit rules.

## References

- `knowledge/README.md`
- `knowledge/architecture.md`
- `knowledge/rules-and-decisions.md`
- `references/decision-tree.md`

## Quick example

An order feature should usually look like this:

- Domain: `Order`, `OrderStatus`, pricing rules, validation of state transitions
- Application: `CreateOrderUseCase`, `SubmitOrder`, input validation, orchestration
- Adapters: UI form, order presenter, HTTP order mapper
- Infrastructure: API client, repository implementation, local persistence

The key is that an `Order` can be created and validated without needing a browser, a specific framework, or a storage technology to exist.

## Final principle

When in doubt, ask: "Does this code represent business intent or external mechanics?"
If it is business intent, move it inward. If it is external mechanics, keep it at the boundary.
