import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ChatMessage from './ChatMessage'

describe('ChatMessage', () => {
  it('shows the pending state through an accessible status', () => {
    render(<ChatMessage state="pending" />)
    expect(screen.getByRole('status', { name: /message pending/i })).toHaveTextContent('Thinking')
  })

  it('shows streaming content without hiding the message text', () => {
    render(<ChatMessage state="streaming" text="Drafting your proposal" />)
    expect(screen.getByRole('status', { name: /message streaming/i })).toHaveTextContent('Drafting your proposal')
  })

  it('shows an accessible error message when generation fails', () => {
    render(<ChatMessage state="error" />)
    expect(screen.getByRole('alert')).toHaveTextContent(/could not generate/i)
  })
})
