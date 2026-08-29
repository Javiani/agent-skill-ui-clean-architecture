# Rules, decisions, and conventions

## Classification of concerns

Use the following mental model when deciding where code belongs.

### Principle

A principle is a high-level rule that should guide all implementation choices.

Examples:
- keep business rules independent from interface and infrastructure
- depend on abstractions, not concrete implementations
- make the core stable even when technology changes

### Must

A must is a rule that should not be violated.

Examples:
- the domain layer must not import UI or infrastructure concerns
- the application layer must not become a dumping ground for platform-specific logic
- adapters must translate data at boundaries

### Should

A should is a recommended pattern that usually improves maintainability.

Examples:
- isolate data transformation at boundaries
- keep use cases small and focused
- centralize validation in the application or domain layer

### May

A may is an optional implementation approach.

Examples:
- use services, commands, or handlers depending on project preference
- define repositories or ports in different shapes if they preserve the same boundary rule

### Never

A never is a prohibited pattern.

Examples:
- mixing UI rendering code with business policies
- putting framework APIs directly inside domain rules
- letting infrastructure details define business invariants

## Decision tree

When adding code, ask:

1. Is this a business concept or policy? If yes, it belongs in the domain.
2. Is this an orchestration of multiple domain behaviors? If yes, it belongs in the application layer.
3. Is this a user interaction or rendering concern? If yes, it belongs in the presentation layer.
4. Is this an external service or platform adapter? If yes, it belongs in infrastructure.

If code is unclear, prefer the more stable inner layer and keep the adapter at the boundary.

## Directory and module conventions

A practical structure usually resembles:

- `domain/`
- `application/`
- `presentation/`
- `infrastructure/`
- `shared/` only for truly cross-cutting primitives that are neutral and not tied to a layer

Avoid placing files by UI framework alone. The architecture is organized by responsibility.

## Interface and boundary design

Use ports or contracts to protect the core from implementation choices.

A good boundary is explicit about what is required without exposing implementation details.
Examples:
- repository interface
- persistence adapter
- API client contract
- presenter contract

This keeps the application layer testable and allows different implementations behind the same abstraction.

## Example: concept vs implementation

Conceptual rule:
- A user account has a valid state transition.

Implementation example:
- A domain entity may enforce that an account cannot transition to `inactive` while it has active sessions.

This concept is architectural.
The specific technology used to verify it in code may be a method, a service, or a modular rule.

The architecture is not tied to a framework.

## Refactoring patterns

When a module mixes responsibilities, split it using these rules:

- move business rules inward
- move external concerns outward
- leave only coordination in the application layer
- keep transformation code at boundaries

## Review standards

A good implementation should answer these questions clearly:

- Is the business truth centralized in the domain?
- Is the application layer focused on workflow and orchestration?
- Are UI and infrastructure code isolated from the business center?
- Are adapters responsible only for translation and integration?
- Can domain logic be tested without rendering or network dependencies?

## Final rule

If logic changes when the interface changes, it is not a core business rule.
If logic changes when the technology changes, it is not a core business rule.
If it describes how the system must behave to satisfy user value, it belongs in the domain or application layers.
