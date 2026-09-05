# Entities

Entities represent relevant data used for rendering or updating your application. Their role is to act as adapters, accepting JSON data and transforming it into a suitable format for your application.

Entities can shape a smaller model like a product, but also at the application level, like a full-page JSON structure, just like a BFF.

The naming convention is:
- entity name: noun, such as `Movie`, `Product`, or `User`
- structure type: noun + `Type`, such as `MovieType`, `ProductType`, `UserType`
- factory pattern: the entity is a function that receives the raw payload and returns the final typed shape

Code Example:

```ts
/**
 * @Entity Product
 */
export const Product = ({
  id = Number(-1),
  title = String('No title'),
  description = String('No description'),
  rating = Number(-1),
  stock = Number(-1),
  brand = String('No Brand defined'),
  category = String('No category'),
  image = String('No url for image'),
  ...rest
} = {}) => ({
  id,
  title,
  description,
  rating,
  stock,
  brand,
  category,
  image,
  price: {
    ...ProductPrice(rest),
  },
})

export type ProductType = {
  id: number
  title: string
  description: string
  rating: number
  stock: number
  brand: string
  category: string
  image: string
  price: {
    raw: number
    discount: string
    formatted: string
  }
}

/**
 * @Entity ProductPrice
 */
export const ProductPrice = ({
  price = Number(-1),
  discountPercentage = String('No discount percentage'),
}) => ({
  raw: price,
  discount: discountPercentage,
  formatted: price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
})
```

For this project, the same pattern is applied as:

```ts
export const Movie = ({
  id = Number(-1),
  title = String('Untitled movie'),
  overview = String('No overview available.'),
  release_date = String('Unknown release date'),
  vote_average = Number(0),
  poster_path = String(''),
  backdrop_path = String(''),
}: RawMovie = {}): MovieType => ({
  id,
  title,
  overview,
  release_date,
  vote_average,
  poster_path: toImageUrl(poster_path),
  backdrop_path: toImageUrl(backdrop_path),
})

export type MovieType = {
  id: number
  title: string
  overview: string
  release_date: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
}
```

This keeps the same factory-function structure used in the product example, while respecting the `Movie` / `MovieType` naming rule.