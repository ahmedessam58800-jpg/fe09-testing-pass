export async function generateProposal(jobDescription) {
  const response = await fetch('/api/generate-proposal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobDescription }),
  })

  if (!response.ok) {
    throw new Error('Proposal generation failed')
  }

  return response.json()
}
