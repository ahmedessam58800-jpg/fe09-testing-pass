import { useState } from 'react'
import { generateProposal } from './api/ai'
import ChatMessage from './components/ChatMessage'
import ProposalForm from './components/ProposalForm'
import ToolResult from './components/ToolResult'

export default function App() {
  const [job, setJob] = useState('')
  const [state, setState] = useState('idle')
  const [proposal, setProposal] = useState('')
  const [tool, setTool] = useState(null)

  async function handleGenerate(jobDescription) {
    setJob(jobDescription)
    setState('pending')
    setProposal('')
    setTool(null)

    try {
      const result = await generateProposal(jobDescription)
      setProposal(result.proposal)
      setTool({
        status: 'success',
        title: 'Portfolio evidence check',
        details: result.evidence,
      })
      setState('complete')
    } catch {
      setState('error')
      setTool({
        status: 'error',
        title: 'Portfolio evidence check',
        details: 'The mocked AI route returned an error.',
      })
    }
  }

  return (
    <main className="shell">
      <header>
        <p className="eyebrow">FE-09 · Testing pass</p>
        <h1>Freelance Proposal Assistant</h1>
        <p>Test-first UI for the highest-risk parts of an AI proposal workflow.</p>
      </header>

      <ProposalForm onSubmit={handleGenerate} disabled={state === 'pending'} />

      <section aria-label="Conversation" className="conversation">
        {job && <ChatMessage role="user" text={job} />}
        {state === 'pending' && <ChatMessage state="pending" />}
        {state === 'complete' && <ChatMessage state="complete" text={proposal} />}
        {state === 'error' && <ChatMessage state="error" />}
      </section>

      {tool && <ToolResult {...tool} />}
    </main>
  )
}
