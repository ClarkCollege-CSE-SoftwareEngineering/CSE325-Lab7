# Code Review Checklist

Use this checklist when reviewing pull requests. Add comments on the PR for each item you evaluate.

## Functionality
- [ ] Code does what the PR description says it does
- [ ] Edge cases are handled (empty input, null, boundary values)
- [ ] Error cases throw meaningful errors or return appropriate defaults

## Testing
- [ ] New code has corresponding test cases
- [ ] Tests cover both happy path and error cases
- [ ] Tests are readable and describe *what* is being tested
- [ ] No tests are skipped or commented out

## Code Quality
- [ ] Variable and function names are descriptive
- [ ] Functions have JSDoc comments explaining purpose and parameters
- [ ] No commented-out code or debug statements
- [ ] TypeScript types are properly used (no `any`)
- [ ] Code follows existing patterns in the codebase

## Git Hygiene
- [ ] Commit messages follow Conventional Commits format
- [ ] Commits are logically grouped (not one giant commit)
- [ ] Branch name follows naming conventions
- [ ] No unrelated changes included in the PR

## Documentation
- [ ] README or CONTRIBUTING.md updated if needed
- [ ] Complex logic has inline comments explaining *why*, not *what*
