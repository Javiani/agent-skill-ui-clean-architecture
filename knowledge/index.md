
# Descrição do UI Clean Architecture

Esta é uma leitura do clássico clean architecture do Uncle Bob porém olhando sob perspectiva de UI / front-end, de forma a manter o máximo de simplicidade, desacoplamento e simplicidade do sistema além de garantir uma padronização e melhor detalhamento das possíveis abstrações de uma aplicação front-end, bem como a forma como quebrar as partes do todo.

As duas macro partes que compõe essa arquitetura são:

- Estrutura de Pastas: Define em quais pastas e localização devem ficar as abstrações.

- Abstrações: Define quais sao os tipos de problemas de uma aplicação clássica front-end, onde moram as implementações das partes do sistema.


# Abstrações

- [Domains](./domain/index.md)
- [Components](./components/index.md)
- [Constants](./constants/index.md)
- [Servicos](./services/index.md)

# Estrutura de Pastas

O projeto deve ser separado em layouts, domains e shared.

## Layouts
Definem os tipos de layout do sistema, considerando as definições padrão de boilerplate do html desde a seção DOCTYPE, até o elemento <body>. Os elementos do layout serão aqueles reutilizados cross telas.
- A pasta deve conter uma lista de arquivos .ts / .js nao devem estar em uma estrutura quebrada em pastas, ex: default.[jsx, tsx, astro, svelte], admin.[jsx, tsx, astro, svelte] e assim por diante.


## Domains
O conjunto de [domínios](./domain/index.md) ( telas ) que a aplicação tem. Os domínios possuem todas as abstrações as quais ele depende como : [Components](./components/index.md), [Constants](./constants/index.md) quando estes aparecem apenas no contexto deste domínio.
	- [Components](./components/index.md), deve estar em uma pasta apenas para ele, e pode conter subpastas para armazenar os componentes atômicos que apenas existem no contexto deste componente de seção. Caso o componente atomico sirva para outros componentes de seção, entao este pode ficar em uma pasta irmã dos componentes de seção.
	- [Constants](./constants/index.md), devem ser uma lista de arquivos .ts / .js separados por arquivos de maneira semântica e nao devem estar em uma estrutura quebrada em pastas como os components, para simplificar.
  - [Entities](./entities/index.md), devem ser uma lista de arquivos .ts / .js separados por arquivos de maneira semântica e nao devem estar em uma estrutura quebrada em sub-pastas para simplificar.
  - [Services](./services/index.md), deve estar em uma pasta apenas para ele, e pode conter subpastas para armazenar os servicos de maneira contextualizada.


## Shared
Esta pasta armazena o conjunto de abstrações que são cross domínios, ou seja, aparecem ou sao reutilizados por outros domínios. São as abstrações compartilhadas. Seguem a mesma estrutura de pastas que os domínios com esta diferença apenas de armazenarem abstrações compartilhadas.

# Exemplo 

.
└── src/
    ├── layouts/
    │   └── default.[tsx,astro,svelte]
    ├── domains/
    │   └── home/
    │       ├── components/
    │       │   ├── header/
    │       │   │   └── index[tsx,astro,svelte]
    │       │   ├── hero/
    │       │   │   └── index[tsx,astro,svelte]
    │       │   └── features/
    │       │       └── index[tsx,astro,svelte]
    │       ├── constants/
    │       │   ├── environment.ts
    │       │   └── ...
    │       └── index[tsx,astro,svelte]
    └── shared/
        ├── components/
        └── constants/


# Especificidades de Frameworks

Os Frameworks possuem algumas convenções padrões para algumas pastas para gerar as url's relacionadas à este padrão de estrutura de pastas que eles definem, algumas convenções são: Ex: `pages`, `app` etc.
A arquitetura deve seguir estas convenções dos frameworks para as páginas, porém utilizando a abstração de dominios para gerar / compor as telas.

Um exemplo do caso do Next ( React ):

`app/blog/page.tsx`

```tsx
import Blog from '@domain/blog'
 
export default async function Page() {
  const posts = await getPosts()
  return (
    <Blog posts={posts} />
  )
}
```

`domain/blog/index.tsx`

```tsx

import Hero from './components/hero'
import Articles from './components/articles'
import Cta from './components/cta'
import FooterBlog from './components/footer'
 
export default function Blog({ posts }) {
  return (
	<>
		<Hero />
		<Articles posts={posts} />
		<Cta />
		<FooterBlog />
	</>
  )
}
```

A convenção `page.tsx` do framework acaba sendo um integrador para as abstrações das pastas do clean architecture.
