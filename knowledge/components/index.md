
# Components

Components wrap the UI parts of the application. There are two component types:

- Section Components
- Atomic Components

## Section Components

A Section Component represents a horizontal screen block with one clear context and purpose. A screen is composed by stacking Section Components vertically from top to bottom.

Typical examples are `Header`, `Hero`, `Features`, `Examples`, `CTA`, and `Footer`.

┌──────────────────────────────────────────────┐
│                    HEADER                    │
│                                              │
│   Logo                 Navigation / Actions  │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│                     HERO                     │
│                                              │
│              Main headline                   │
│              Supporting text                 │
│              [ Primary CTA ]                 │
│                                              │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│                   FEATURES                   │
│                                              │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│   │ Feature  │ │ Feature  │ │ Feature  │     │
│   │    01    │ │    02    │ │    03    │     │
│   └──────────┘ └──────────┘ └──────────┘     │
│                                              │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│                   EXAMPLES                   │
│                                              │
│   ┌──────────────────────────────────────┐   │
│   │              Example 01              │   │
│   └──────────────────────────────────────┘   │
│                                              │
│   ┌──────────────────────────────────────┐   │
│   │              Example 02              │   │
│   └──────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│                     CTA                      │
│                                              │
│            Call to action message            │
│                                              │
│               [ Get Started ]                │
│                                              │
└──────────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────┐
│                    FOOTER                    │
│                                              │
│       Links · Social · Copyright             │
└──────────────────────────────────────────────┘


## Atomic Components

An Atomic Component is a smaller UI unit that can be generic or repeated. It may be used throughout the system, such as a button, or only within a small screen context, such as a repeated `Feature` item inside the `Features` section.

┌──────────────────────────────────────────────┐
│                   FEATURES                   │
│                                              │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│   │ Feature  │ │ Feature  │ │ Feature  │     │
│   │    01    │ │    02    │ │    03    │     │
│   └──────────┘ └──────────┘ └──────────┘     │
│                                              │
└──────────────────────────────────────────────┘

## Behavior

Every component is responsible for rendering its UI, reacting to user events such as clicks and mouseover, and updating its local state when needed.

- Pass state to child components when the children depend on it.
- A Section Component must be standalone.
- A Section Component must not directly depend on a sibling Section Component.
- A Section Component may receive properties from its parent, which is normally the Domain component.