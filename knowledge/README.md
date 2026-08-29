# UI Clean Architecture - Knowledge

This folder contains the source-of-truth knowledge for the architecture used by this skill.

## Architectural goal

The goal is to build frontend applications that stay understandable, testable, and maintainable without coupling business logic to UI frameworks, browser APIs, or external integrations.

## Core idea

The architecture organizes software into layers with different responsibilities:
- inner layers hold stable business rules and application behavior
- outer layers handle user interaction, platform APIs, storage, and external services
- boundaries exist to translate data and protect the core from runtime details

This preserves independence from implementation choices while still enabling real-world UI delivery.

## Terminology

- Domain: rules and concepts that define the business or product behavior
- Application: coordinated workflows and use cases that operate on the domain
- Presentation/UI: screens, controls, user interaction, rendering, and inputs
- Infrastructure: technical implementations such as API clients, repository adapters, persistence, and platform access
- Adapter: a translation layer between internal structures and external systems
- Port: a contract or boundary needed by the inner layer to interact with external concerns

## Design principles

1. The domain should not know how the interface is rendered.
2. The application should not know how the network or storage is implemented.
3. UI and infrastructure are implementation details of the delivery system, not core business truth.
4. Business rules must be expressible and testable without a browser or framework runtime.
5. Dependencies move from the outside in, and the deeper the layer is, the less it depends on platform concerns.

## Dependency direction

A useful rule is:

- Higher-level policies decide behavior.
- Lower-level details implement mechanisms.
- Outer layers may depend on inner layers.
- Inner layers do not depend on outer layers.

This allows the core to remain stable even when the UI or infrastructure changes.

## What this architecture is not

This is not a generic “put everything in components” structure.
This is not a framework-specific pattern for a single UI library.
This is not a place to mix storage and data-shaping logic with domain policy.

It is a responsibility-driven architecture that separates what the system means from how it is delivered.
