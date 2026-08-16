import { useState } from 'react'

export default function ProposalForm({ onSubmit, disabled = false }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = value.trim()

    if (trimmed.length < 20) {
      setError('Please enter at least 20 characters from the job description.')
      return
    }

    setError('')
    onSubmit(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="job-description">Job description</label>
      <textarea
        id="job-description"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-describedby={error ? 'job-error' : undefined}
        aria-invalid={Boolean(error)}
        disabled={disabled}
        rows="6"
      />
      {error && <p id="job-error" role="alert">{error}</p>}
      <button type="submit" disabled={disabled}>
        {disabled ? 'Generating…' : 'Generate proposal'}
      </button>
    </form>
  )
}
