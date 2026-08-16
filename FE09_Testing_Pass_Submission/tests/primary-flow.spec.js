import { expect, test } from '@playwright/test'

test('primary flow: valid job -> mocked AI -> proposal and evidence result', async ({ page }) => {
  await page.route('**/api/generate-proposal', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        proposal: 'I can help build this responsive React task interface.',
        evidence: 'Matched portfolio evidence: AI Task Manager using React, JavaScript, and CSS.',
      }),
    })
  })

  await page.goto('/')

  await page.getByLabel('Job description').fill(
    'Build a responsive React task interface where users can add, complete, filter, and delete tasks.',
  )
  await page.getByRole('button', { name: 'Generate proposal' }).click()

  await expect(page.getByText(/I can help build this responsive React task interface/i)).toBeVisible()
  await expect(page.getByRole('region', { name: 'Tool result' })).toContainText('AI Task Manager')

  await page.screenshot({ path: 'test-results/primary-flow-passed.png', fullPage: true })
})
