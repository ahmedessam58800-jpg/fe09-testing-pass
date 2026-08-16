export default function ToolResult({ status, title, details }) {
  const isSuccess = status === 'success'

  return (
    <section className={`tool-result tool-result-${status}`} aria-label="Tool result">
      <h2>{title}</h2>
      <p>{details}</p>
      <span role="status">{isSuccess ? 'Tool completed successfully' : 'Tool reported an error'}</span>
    </section>
  )
}
