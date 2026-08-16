import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ToolResult from './ToolResult'

describe('ToolResult', () => {
  it('renders a successful tool result with user-facing evidence', () => {
    render(
      <ToolResult
        status="success"
        title="Portfolio evidence check"
        details="React project found"
      />,
    )

    expect(screen.getByRole('region', { name: /tool result/i })).toHaveTextContent('React project found')
    expect(screen.getByRole('status')).toHaveTextContent(/completed successfully/i)
  })
})
