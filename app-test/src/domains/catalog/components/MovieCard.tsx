import type { Movie } from '../movieApi'

interface MovieCardProps {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
  onSelect: (movie: Movie) => void
}

export function MovieCard({ movie, isFavorite, onToggleFavorite, onSelect }: MovieCardProps) {
  return (
    <article className="movie-card">
      <button className="movie-poster" onClick={() => onSelect(movie)} aria-label={`Ver detalhes de ${movie.name}`}>
        {movie.image ? <img src={movie.image} alt="" /> : <span>Sem imagem</span>}
      </button>
      <div className="movie-card-content">
        <div>
          <h3>{movie.name}</h3>
          <p>{movie.year ?? 'Ano não informado'}</p>
        </div>
        <button
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          onClick={() => onToggleFavorite(movie)}
          aria-label={isFavorite ? `Remover ${movie.name} dos favoritos` : `Favoritar ${movie.name}`}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  )
}
