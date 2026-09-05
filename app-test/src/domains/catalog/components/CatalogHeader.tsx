interface CatalogHeaderProps {
  query: string
  onQueryChange: (query: string) => void
  favoriteCount: number
  showingFavorites: boolean
  onToggleFavorites: () => void
}

export function CatalogHeader({ query, onQueryChange, favoriteCount, showingFavorites, onToggleFavorites }: CatalogHeaderProps) {
  return (
    <header className="catalog-header">
      <div className="brand-row">
        <div>
          <p className="eyebrow">Seu próximo filme favorito</p>
          <h1>Cinefilia<span>.</span></h1>
        </div>
        <button className={`favorites-filter ${showingFavorites ? 'active' : ''}`} onClick={onToggleFavorites}>
          <span>♥</span> Favoritos <strong>{favoriteCount}</strong>
        </button>
      </div>
      <div className="intro">
        <h2>Descubra histórias<br /><em>inesquecíveis.</em></h2>
        <p>Explore uma seleção de filmes e séries, encontre detalhes e guarde os títulos que você quer assistir.</p>
      </div>
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Buscar por título..." />
      </label>
    </header>
  )
}
