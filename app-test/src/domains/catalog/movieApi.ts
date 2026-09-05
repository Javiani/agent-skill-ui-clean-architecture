import { TVMAZE_API_URL } from './constants/catalog'

export interface Movie {
  id: number
  name: string
  year: number | null
  image: string | null
  summary: string
  runtime: number | null
}

interface TvMazeShow {
  id: number
  name: string
  premiered?: string | null
  image?: { medium?: string; original?: string } | null
  summary?: string | null
  runtime?: number | null
}

function mapShow(show: TvMazeShow): Movie {
  return {
    id: show.id,
    name: show.name,
    year: show.premiered ? Number(show.premiered.slice(0, 4)) : null,
    image: show.image?.original ?? show.image?.medium ?? null,
    summary: show.summary?.replace(/<[^>]+>/g, '') ?? '',
    runtime: show.runtime ?? null,
  }
}

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch(`${TVMAZE_API_URL}?_embedded=cast`)
  if (!response.ok) throw new Error('Não foi possível carregar os filmes.')
  const shows = (await response.json()) as TvMazeShow[]
  return shows.map(mapShow)
}
