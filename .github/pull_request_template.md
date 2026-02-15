## Description

<!-- What does this PR add or change? Explain the purpose clearly. -->

## Changes Made

<!-- List the key changes. What files were modified and why? -->

- 

## How I Tested This

<!-- Describe how you verified your changes work. -->

- [ ] All existing tests still pass (`npm test`)
- [ ] New tests added for new functionality
- [ ] TypeScript compiles without errors (`npm run typecheck`)

## Review Checklist

<!-- Go through each item and check it off. Add a comment on the PR for at least 5 items explaining how your code meets the criteria. See REVIEW_CHECKLIST.md for details. -->

### Functionality
- [ ] Code does what the PR description says it does
- [ ] Edge cases are handled (empty input, null, boundary values)
- [ ] Error cases throw meaningful errors or return appropriate defaults

### Testing
- [ ] New code has corresponding test cases
- [ ] Tests cover both happy path and error cases
- [ ] Tests are readable and describe *what* is being tested
- [ ] No tests are skipped or commented out

### Code Quality
- [ ] Variable and function names are descriptive
- [ ] Functions have JSDoc comments explaining purpose and parameters
- [ ] No commented-out code or debug statements
- [ ] TypeScript types are properly used (no `any`)
- [ ] Code follows existing patterns in the codebase

### Git Hygiene
- [ ] Commit messages follow Conventional Commits format
- [ ] Commits are logically grouped (not one giant commit)
- [ ] Branch name follows naming conventions
- [ ] No unrelated changes included in the PR
