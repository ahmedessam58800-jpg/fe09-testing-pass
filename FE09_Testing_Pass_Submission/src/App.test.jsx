import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { generateProposal } from './api/ai'

vi.mock('./api/ai', () => ({
  generateProposal: vi.fn(),
}))

describe('App AI flow', () => {
  it('uses the mocked AI route and renders proposal plus tool result', async () => {
    const user = userEvent.setup()
    generateProposal.mockResolvedValueOnce({
      proposal: 'I can build the requested React interface.',
      evidence: 'Matched AI Task Manager: React, JavaScript, CSS.',
    })

    render(<App />)

    await user.type(
      screen.getByLabelText(/job description/i),
      'Build a responsive React task interface with filters and task completion.',
    )
    await user.click(screen.getByRole('button', { name: /generate proposal/i }))

    expect(await screen.findByText(/I can build the requested React interface/i)).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /tool result/i })).toHaveTextContent(/AI Task Manager/i)
    expect(generateProposal).toHaveBeenCalledTimes(1)
  })
})
