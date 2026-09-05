import type { Movie } from '../movieApi'

interface MovieDetailsProps {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
  onClose: () => void
}

export function MovieDetails({ movie, isFavorite, onToggleFavorite, onClose }: MovieDetailsProps) {
  return (
    <div className="details-backdrop" role="presentation" onClick={onClose}>
      <section className="details-panel" role="dialog" aria-modal="true" aria-label={`Detalhes de ${movie.name}`} onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Fechar detalhes">×</button>
        {movie.image && <img className="details-image" src={movie.image} alt="" />}
        <div className="details-copy">
          <p className="eyebrow">Detalhes do título</p>
          <h2>{movie.name}</h2>
          <p className="movie-meta">{movie.year ?? 'Ano não informado'} {movie.runtime ? `· ${movie.runtime} min` : ''}</p>
          <p>{movie.summary || 'Sinopse não disponível para este título.'}</p>
          <button className="button button-primary" onClick={() => onToggleFavorite(movie)}>
            {isFavorite ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}
          </button>
        </div>
      </section>
    </div>
  )
}
