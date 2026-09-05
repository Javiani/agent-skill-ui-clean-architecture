# UI Clean Architecture reference

This file is a supporting reference for the main skill. It preserves the architectural vocabulary and examples from `knowledge/` without turning examples into normative rules.

## Core architecture summary

The architecture is organized around a UI-oriented decomposition of the application.

- The application is split into `layouts`, `domains`, and `shared`.
- `layouts` define reusable shell structure.
- `domains` define each screen/page.
- `shared` stores abstractions reused by multiple domains.
- `Domain` is the top-level abstraction of the screen.
- `Components` are defined within a domain or in shared when cross-domain.
- `Constants` are centralized exports.

## Domain rule

A `Domain` represents a page/screen and includes all dependencies needed so that the screen works independently.

Example from the source documentation:

```astro
---
import Header from '<path of the component>'
import Hero from '<path of the component>'
import Features from '<path of the component>'
import Examples from '<path of the component>'
import Cta from '<path of the component>'
import Footer from '<path of the component>'
---

<main>
  <Header />
  <Hero />
  <Features />
  <Examples />
  <Cta />
  <Footer />
</main>
```

The important rule is not the exact framework syntax; it is the idea that the `Domain` composes the full screen from its own section components.

## Section component rule

`Section Components` are the horizontal blocks that form a screen: `Header`, `Hero`, `Features`, `Examples`, `CTA`, `Footer`.

They are stacked vertically to build the page. They are standalone and should not directly depend on peer section components.

## Atomic component rule

`Atomic Components` are smaller repeated UI items. In the example, `Feature` is repeated within `Features`.

If the repeated item is only used inside one section, it may live beside that section's folder. If it is reused across domains, it belongs in `shared/components`.

## Constants rule

Constants are centralized in semantic files and exported for consumption across the application.

```ts
export const HTTP_METHODS = {
  CONNECT: 'CONNECT',
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  TRACE: 'TRACE'
}

export const GET_METHOD = (method: string) => {
  return HTTP_METHODS[method]
}
```

Rule: use `SCREAMING_SNAKE_CASE` for exported constants and pure helper functions.

## Example folder layout

```text
src/
  layouts/
    default.[tsx,astro,svelte]
  domains/
    home/
      components/
        header/
          index[tsx,astro,svelte]
        hero/
          index[tsx,astro,svelte]
        features/
          index[tsx,astro,svelte]
      constants/
        environment.ts
      entities/
        show.ts
      services/
        movie-api/
          index.ts
      index[tsx,astro,svelte]
  shared/
    components/
    constants/
```

## Relationship with framework conventions

The documentation explicitly states that framework conventions such as `pages`, `app`, or `page.tsx` may exist, but the architecture should follow those framework conventions for pages while using the `Domain` abstraction to compose the screen.

This means the framework route file is an integrator, not the architectural core.

## When the documentation is ambiguous

When a question is not clearly defined by `knowledge/`, do not invent a rule. Prefer a minimal, local implementation that still respects the documented boundary rules.

This skill must never substitute external architectural assumptions for missing specification detail.
