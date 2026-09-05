interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="status-message error-message">
      <p>{message}</p>
      <button className="button button-secondary" onClick={onRetry}>Tentar novamente</button>
    </div>
  )
}
