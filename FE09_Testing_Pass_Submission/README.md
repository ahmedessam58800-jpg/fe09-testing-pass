# FE-09 — Testing Pass

This submission uses a small **Freelance Proposal Assistant** UI so the tests cover the same kind of AI workflow used in my capstone work.

## What is tested

### Component tests — Vitest + React Testing Library
1. Chat message pending state
2. Chat message streaming state
3. Chat message error state
4. Validated form rejects a short description
5. Validated form submits a valid description
6. Tool-result component renders successful evidence
7. Full App flow uses a **mocked AI module**, never a real AI API

The tests query by accessible **role and label**, not CSS class names or test IDs.

### Playwright end-to-end
`tests/primary-flow.spec.js` covers the main user flow:
- open the app
- enter a valid job description
- submit it
- intercept `/api/generate-proposal` with a deterministic mocked response
- verify the proposal appears
- verify the portfolio evidence tool result appears

The test also saves `test-results/primary-flow-passed.png` as evidence.

## AI route policy
The app has one route wrapper in `src/api/ai.js`, but automated tests **never call a real AI API**:
- Vitest mocks the `generateProposal` module
- Playwright intercepts the browser request

## CI
`.github/workflows/ci.yml` runs on every push to `main` and on pull requests. It:
1. installs dependencies with `npm install`
2. runs component tests
3. builds the app
4. installs Chromium
5. runs Playwright
6. uploads Playwright evidence

A failing test makes the GitHub Actions job fail, so test failures block a green merge status.

## Commands
```bash
npm install
npm run test:run
npm run build
npx playwright install chromium
npm run test:e2e
```

## Files that matter
- `src/components/ChatMessage.jsx`
- `src/components/ChatMessage.test.jsx`
- `src/components/ProposalForm.jsx`
- `src/components/ProposalForm.test.jsx`
- `src/components/ToolResult.jsx`
- `src/components/ToolResult.test.jsx`
- `src/App.test.jsx`
- `tests/primary-flow.spec.js`
- `.github/workflows/ci.yml`

## Submission checklist
- [x] 6+ meaningful component tests
- [x] pending, streaming, and error chat states tested
- [x] one validated form tested
- [x] one tool-result component tested
- [x] AI route mocked in tests
- [x] one Playwright primary-flow test
- [x] GitHub Actions CI workflow included
- [ ] Push this folder to GitHub and capture the real green GitHub Actions run screenshot

The final unchecked item must be completed from the real GitHub repository; a CI screenshot should not be fabricated before the workflow has actually run.


## Local verification note
The package is complete, but dependency installation could not be completed inside the artifact-generation sandbox. The GitHub Actions workflow installs the dependencies in CI before running the suite. Use the commands above locally if you want to verify before pushing.
