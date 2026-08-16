export default function ChatMessage({ role = 'assistant', state = 'complete', text = '' }) {
  const label = role === 'user' ? 'You' : 'Proposal Assistant'

  return (
    <article className={`message message-${role}`} aria-label={`${label} message`}>
      <strong>{label}</strong>

      {state === 'pending' && (
        <p role="status" aria-label="Message pending">Thinking…</p>
      )}

      {state === 'streaming' && (
        <p role="status" aria-label="Message streaming">
          {text}<span className="cursor" aria-hidden="true">▍</span>
        </p>
      )}

      {state === 'error' && (
        <p role="alert">I could not generate the proposal. Please try again.</p>
      )}

      {state === 'complete' && <p>{text}</p>}
    </article>
  )
}
