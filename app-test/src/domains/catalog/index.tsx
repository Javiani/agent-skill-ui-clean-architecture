import { useEffect, useMemo, useState } from 'react'
import { ErrorState } from '../../shared/components/ErrorState'
import { LoadingState } from '../../shared/components/LoadingState'
import { FAVORITES_STORAGE_KEY } from '../../shared/constants/storage'
import { INITIAL_MOVIE_LIMIT } from './constants/catalog'
import { CatalogHeader } from './components/CatalogHeader'
import { MovieCard } from './components/MovieCard'
import { MovieDetails } from './components/MovieDetails'
import { fetchMovies, type Movie } from './movieApi'

export function Catalog() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
    return stored ? JSON.parse(stored) as number[] : []
  })
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [showingFavorites, setShowingFavorites] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMovies = () => {
    setIsLoading(true)
    setError(null)
    fetchMovies().then(setMovies).catch((cause: unknown) => {
      setError(cause instanceof Error ? cause.message : 'Ocorreu um erro inesperado.')
    }).finally(() => setIsLoading(false))
  }

  useEffect(() => { loadMovies() }, [])
  useEffect(() => { localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds)) }, [favoriteIds])

  const toggleFavorite = (movie: Movie) => {
    setFavoriteIds((current) => current.includes(movie.id) ? current.filter((id) => id !== movie.id) : [...current, movie.id])
  }

  const visibleMovies = useMemo(() => movies
    .filter((movie) => !showingFavorites || favoriteIds.includes(movie.id))
    .filter((movie) => movie.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, INITIAL_MOVIE_LIMIT), [movies, query, favoriteIds, showingFavorites])

  return (
    <main className="catalog-domain">
      <CatalogHeader query={query} onQueryChange={setQuery} favoriteCount={favoriteIds.length} showingFavorites={showingFavorites} onToggleFavorites={() => setShowingFavorites((current) => !current)} />
      <section className="catalog-section">
        <div className="section-heading"><p className="eyebrow">{showingFavorites ? 'Sua coleção' : 'Em destaque'}</p><span>{visibleMovies.length} títulos</span></div>
        {isLoading && <LoadingState />}
        {error && <ErrorState message={error} onRetry={loadMovies} />}
        {!isLoading && !error && visibleMovies.length === 0 && <p className="status-message">Nenhum título encontrado.</p>}
        {!isLoading && !error && visibleMovies.length > 0 && <div className="movie-grid">{visibleMovies.map((movie) => <MovieCard key={movie.id} movie={movie} isFavorite={favoriteIds.includes(movie.id)} onToggleFavorite={toggleFavorite} onSelect={setSelectedMovie} />)}</div>}
      </section>
      {selectedMovie && <MovieDetails movie={selectedMovie} isFavorite={favoriteIds.includes(selectedMovie.id)} onToggleFavorite={toggleFavorite} onClose={() => setSelectedMovie(null)} />}
    </main>
  )
}
