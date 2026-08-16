import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ProposalForm from './ProposalForm'

describe('ProposalForm', () => {
  it('validates short job descriptions by label and role', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ProposalForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/job description/i), 'Too short')
    await user.click(screen.getByRole('button', { name: /generate proposal/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/at least 20 characters/i)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits a trimmed valid job description', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ProposalForm onSubmit={onSubmit} />)

    const text = '  Build a responsive React dashboard for a small team.  '
    await user.type(screen.getByLabelText(/job description/i), text)
    await user.click(screen.getByRole('button', { name: /generate proposal/i }))

    expect(onSubmit).toHaveBeenCalledWith(text.trim())
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
