---
name: ui-clean-architecture
description: Apply the UI clean architecture defined in the knowledge/ documentation for screens, sections, constants, layouts, and shared abstractions without importing external architectural assumptions.
---

# UI Clean Architecture Skill

Source of truth: the files under `knowledge/`.

This skill is the operational translation of the architecture described in `knowledge/`. It does not inherit rules from Clean Architecture, Hexagonal Architecture, DDD, MVC, MVVM, Vertical Slice Architecture, SOLID, or any other architectural school.

These instructions are the authority. When the documentation is silent, do not invent a rule. Prefer the simplest implementation compatible with the documented structure.

## Hard constraints

- Treat every screen/page as a `Domain`.
- A `Domain` is the highest-level component of the screen and must be imported/rendered by the framework according to the route.
- Each `Domain` must be `standalone`: it must know the required inputs and outputs needed for that screen to work independently.
- A `Domain` is the owner of its local `Components` and `Constants` when they exist only within that screen context.
- A `Domain` may use `Shared` abstractions when the abstraction is cross-domain and reused by different screens.
- `Components` are UI sections or atomic UI pieces; they are not a second architectural layer beyond that classification.
- `Section Components` must be stacked vertically to form the screen; they are not meant to directly reference other section components.
- `Atomic Components` are smaller and reusable, and may live beside a `Section Component` when they are only local, or in a shared area when reused by several domains.
- `Constants` must be centralized and exported; values and pure functions are grouped semantically, not fragmented by folder depth.
- `Layouts` store the boilerplate structure reused across screens, such as the shell of the HTML document and repeated layout wrappers.
- `Shared` stores abstractions used by multiple domains, following the same folder structure pattern used by domains.

## Vocabulary to preserve

Use the architecture's own vocabulary consistently:

- `Domain`
- `Components`
- `Componentes de Seção` / `Section Components`
- `Componente Atômico` / `Atomic Components`
- `Constants`
- `Layouts`
- `Shared`
- `standalone`

Do not replace these terms with terms from another architecture.

## Folder structure rules

Use the structure below as the default layout for the application:

```text
src/
  layouts/
  domains/
    <domain-name>/
      components/
      constants/
      index[tsx,astro,svelte]
  shared/
    components/
    constants/
```

### Layouts

- Put reusable page shell / boilerplate code in `src/layouts/`.
- Keep layout code framework-aware only when the framework requires it, but do not let layout code become a new architectural abstraction.

### Domains

- Each domain is a screen or page.
- The screen folder is named after the domain.
- Domain code owns all feature-specific UI and local abstractions.
- A screen folder can contain:
  - `index` (the root component representing the domain)
  - `components/` for section and atomic components local to that screen
  - `constants/` for screen-specific fixed values or pure functions

### Shared

- Put abstractions reused across screens in `src/shared/`.
- The folder structure mirrors the domain pattern and keeps cross-domain abstractions under one shared namespace.
- If a component, constant, or helper is needed by more than one `Domain`, it is a candidate for `Shared`.

### Constants

- Put constants in semantically named files.
- Keep files flat in `constants/` instead of over-fragmenting them into deep folder trees.
- Name exported values and pure functions in `SCREAMING_SNAKE_CASE`.
- Use constants for fixed system values and derivable values from `process.env` when needed.

## Decision rules for new work

### When creating a new screen

Context:
A new feature or route requires a screen.

Decision:
Check whether the screen is a standalone page with its own input/output requirements.

Action:
- Create a `Domain` folder under `src/domains/<domain-name>/`.
- Implement the root screen component in the domain `index` file.
- Compose the screen from section components that are stacked vertically.
- Pass required data from the domain down to those sections, never hide the screen contract inside deeper components.

### When deciding what belongs inside a domain

Context:
A piece of UI or logic is needed only for one screen.

Decision:
Determine whether it is local to that screen's context.

Action:
- If it is local to that screen, place it under the corresponding `Domain`.
- If it is reused by more than one screen, move it to `Shared`.

### When deciding between section and atomic component

Context:
A UI part is being created.

Decision:
Ask whether it is a major horizontal section of the page or a smaller repeated unit.

Action:
- If it represents a distinct section with its own context and purpose, create a `Section Component`.
- If it is a smaller reusable piece such as a repeated item inside a section, create an `Atomic Component`.
- When the atomic component is only used inside one section, keep it alongside that section's folder.
- When it is reused elsewhere, move it to the shared structure.

### When reviewing a component relationship

Context:
A component imports another component.

Decision:
Determine whether the imported component is a sibling section or a child/atomic piece.

Action:
- A `Section Component` should not directly relate to another `Section Component` as a peer dependency.
- A section component may react to local user events and update local state.
- If a section needs state shared with its children, pass the state down as props.
- Do not let section components become hidden routers for other sections.

### When creating or updating constants

Context:
Fixed values or pure functions are needed.

Decision:
Check whether they are local to a screen or shared across screens.

Action:
- If local to a screen, put them in the domain's `constants/`.
- If reused across screens, place them in `shared/constants/`.
- Keep naming in `SCREAMING_SNAKE_CASE`.

## Framework-specific conventions

Framework conventions such as `pages`, `app`, `routes`, or `page.tsx` may exist, but they are integration points, not architectural replacements.

The architecture remains the same even when a framework imposes a route file.

Example:

```tsx
// app/blog/page.tsx
import Blog from '@domain/blog'

export default async function Page() {
  const posts = await getPosts()
  return <Blog posts={posts} />
}
```

This route file is only the framework adapter. The actual screen composition lives in the `Domain` abstraction.

## Review checklist for architecture violations

Before approving a change, inspect these points:

- Does each screen live in a `Domain` folder and act as a standalone unit?
- Is the domain the highest-level screen component?
- Does a section component import another section component directly?
- Is a screen-specific abstraction placed in `Shared` when it is not truly cross-domain?
- Is a cross-domain abstraction kept in `Shared`?
- Are local constants inside the correct `Domain` or `Shared` location?
- Do constant names follow `SCREAMING_SNAKE_CASE`?
- Has a framework file been mistaken for the real structural abstraction?
- Are folder names and abstractions aligned with the domain/shared pattern?

## Forbidden practices

These are not allowed unless explicitly supported by the documented architecture:

- Do not infer architectural rules from known architecture schools or frameworks.
- Do not rename concepts to match Clean Architecture, DDD, or MVC terms.
- Do not treat a `Domain` as a generic business layer or a data layer.
- Do not create a new abstraction merely because it is considered a best practice.
- Do not place a cross-domain abstraction in a single screen folder if it is reused elsewhere.
- Do not let section components become peers of one another across the screen.
- Do not spread constants across fragmented folder structures.
- Do not assume dependency rules that are not explicit in this skill or the source `knowledge/` files.

## Default implementation heuristic

If the architecture does not define a detail, choose the simplest implementation that preserves the documented structure:

- screen-level ownership stays with the `Domain`
- local support code stays close to that `Domain`
- reused abstractions move to `Shared`
- visual composition is assembled from `Section Components`
- repeated UI pieces become `Atomic Components`
- constants remain centralized and named consistently

## Reference files

Use the source documentation for deeper details:

- `knowledge/index.md`
- `knowledge/domain/index.md`
- `knowledge/components/index.md`
- `knowledge/constants/index.md`

These files explain the architecture; this skill converts them into operational decisions for agents.
