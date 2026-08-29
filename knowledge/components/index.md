
# Components

Estruturas que envelopam as partes de UI do todo da aplicação. Podem ser de 2 tipos:

- Componente de Seção
- Componente Atômico

## Componentes de Seção

Envolvem a parte horizontal que possui um contexto e propósito único da tela. Uma tela é formada por componentes de seção "estacadas" ou seja uma em cima da outra até compor a tela inteira. 

Exemplo visual, cada um dos componentes abaixo representados são Componentes de Seção: Header, Hero, Features, Examples, CTA, Footer. 

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


## Componentes Atômicos

São componentes menores que podem ser genéricos, usados no sistema todo como botões ou outros itens que apenas aparecem pontualmente em algumas telas, mas que possuem repetições, como no caso descrito dos componentes de seção, um exemplo de componente atomico poderia ser o componente "Feature", pois ele aparece repetidamente mesmo que em um contexto pequeno ( dentro do macro componente Features ).

Exemplo de componente atômico "Feature", instanciado mais de uma vez dentro de um componente de Seção "Features":

┌──────────────────────────────────────────────┐
│                   FEATURES                   │
│                                              │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│   │ Feature  │ │ Feature  │ │ Feature  │     │
│   │    01    │ │    02    │ │    03    │     │
│   └──────────┘ └──────────┘ └──────────┘     │
│                                              │
└──────────────────────────────────────────────┘

## Comportamento

Além de renderizar a parte de UI cada componente é responsável por reagir à eventos e interações do usuário, como clicks, mouseover, etc e atualizar seu estado local e repassar o estado para seus componentes filhos caso haja dependencias entre eles.

Um componente de seção não deve se relacionar diretamente com outros componentes de seção, deve ser totalmente standalone, só podendo receber propriedades do seu pai que no caso é o componente que representa o domínio ( [Domain](../domain/index.md) ).