# Lab 7: Team Workflow Simulation

### Week 8 | Git & GitHub I

## Overview

In this lab, you'll apply the branching strategies and workflow concepts from this week's Atlassian readings by simulating a team development workflow — on your own. You'll work with a small TypeScript utility library, practicing feature branching, pull requests, merge conflict resolution, and code review — the same collaboration patterns used by professional development teams every day.

Rather than writing code from scratch, the focus here is on **how you manage changes**: creating branches, writing meaningful commit messages, opening and documenting pull requests, resolving conflicts, and reviewing code with a checklist. The TypeScript code you write is intentionally simple so you can concentrate on the workflow.

You'll practice:
- Creating and managing feature branches
- Writing descriptive commit messages and PR descriptions
- Resolving merge conflicts by hand
- Performing a structured self-review using a code review checklist
- Comparing workflow strategies (Feature Branch, Gitflow, Trunk-based)

**⏱️ Estimated Time:** 90–120 minutes

**Prerequisites:**
- Completed Labs 1–6
- Week 8 readings completed (Atlassian workflow articles)
- Node.js 20+ installed
- Comfortable with basic Git commands (`add`, `commit`, `push`, `pull`)

> [!IMPORTANT]
> **Windows Users:** We recommend using PowerShell rather than Command Prompt. Where commands differ between operating systems, both versions are provided. PowerShell commands are compatible with the Linux/macOS versions in most cases.

---

## Learning Objectives

By the end of this lab, you will be able to:

1. **Create** feature branches following naming conventions used in professional workflows
2. **Open** pull requests with descriptive titles, summaries, and linked context
3. **Resolve** merge conflicts by understanding both sides of a change and choosing the correct integration
4. **Perform** a structured code review using a checklist derived from industry practices
5. **Compare** Feature Branch, Gitflow, and Trunk-based Development workflows and articulate when each is appropriate
6. **Document** your branching and merging decisions with clear rationale

---

## Connection to Readings

This lab directly applies concepts from your Week 8 readings:

### From "Comparing Workflows" (Atlassian)
- **Centralized vs. distributed:** The article introduces a progression from a single-branch centralized workflow to more sophisticated branching models. In this lab, you'll start from `main` and immediately experience why feature branches exist — they let you develop in isolation without breaking the shared branch.
- **Pull requests as discussion:** The article emphasizes that pull requests are not just merge mechanisms but "a convenient way to talk about code." You'll practice writing PR descriptions that communicate *what* you changed and *why*.

### From "Gitflow Workflow" (Atlassian)
- **Branch roles:** Gitflow assigns specific purposes to branches (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`). While this lab uses a simplified Feature Branch workflow, you'll reflect on how Gitflow's stricter model would change your process.
- **The critique:** The article acknowledges that Gitflow's long-lived branches create challenges for CI/CD. You'll compare this to your experience in the lab when branches diverge and conflicts arise.

### From "Trunk-based Development" (Atlassian)
- **Short-lived branches:** Trunk-based development recommends keeping branches small and merging frequently — ideally within a day or two. In Part 3, you'll experience firsthand what happens when branches live too long and diverge, reinforcing why short-lived branches are preferred.
- **Feature flags vs. feature branches:** The article describes feature flags as an alternative to long-lived feature branches. You'll reflect on this trade-off in your documentation.

---

## Getting Started

### Step 1: Clone Your Repository

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Verify the Starter Project

```bash
npm test
```

✅ **Checkpoint:** You should see output similar to:

```
 ✓ src/__tests__/formatters.test.ts (4 tests) 
 ✓ src/__tests__/validators.test.ts (3 tests) 

 Test Files  2 passed (2)
      Tests  7 passed (7)
```

All 7 starter tests should pass. The project compiles and tests run — you're ready to begin.

### Step 4: Explore the Project Structure

Take a moment to understand what's already here:

```
team-workflow-lab/
├── .github/
│   ├── pull_request_template.md   # Auto-populates PR descriptions
│   └── workflows/
│       └── test.yml               # CI workflow
├── src/
│   ├── formatters.ts          # String formatting utilities
│   ├── validators.ts          # Input validation utilities
│   ├── helpers.ts             # 🔒 Empty — you'll add code here
│   └── __tests__/
│       ├── formatters.test.ts # 4 starter tests
│       ├── validators.test.ts # 3 starter tests
│       └── helpers.test.ts    # 🔒 Empty — you'll add tests here
├── CONTRIBUTING.md            # Template — you'll complete this
├── REVIEW_CHECKLIST.md        # Code review checklist — you'll use this
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── src/setupTests.ts
```

🤔 **Reflection Question:** Before you start branching, look at the existing code in `formatters.ts` and `validators.ts`. If two developers needed to add features to both files simultaneously, what problems might arise? How do the branching strategies from your readings address this?

---

## Part 1: Feature Branch Workflow (25 minutes)

In this part, you'll create a feature branch, implement a new utility function with tests, and open a pull request — following the Feature Branch Workflow described in the Atlassian article.

### Step 1.1: Create a Feature Branch

Create a branch using the `feature/` naming convention:

```bash
git checkout -b feature/add-slug-helper
```

> **Why this name?** The Feature Branch Workflow article explains that encapsulating features in dedicated branches makes it easy for multiple developers to work without disturbing `main`. The `feature/` prefix immediately communicates the branch's purpose to your team.

### Step 1.2: Implement the `slugify` Function

Open `src/helpers.ts` and add the following function:

```typescript
/**
 * Converts a string to a URL-friendly slug.
 * - Converts to lowercase
 * - Replaces spaces and special characters with hyphens
 * - Removes consecutive hyphens
 * - Trims hyphens from start and end
 *
 * @example slugify("Hello World!") → "hello-world"
 * @example slugify("  My Blog Post #1  ") → "my-blog-post-1"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
```

### Step 1.3: Write Tests for `slugify`

Open `src/__tests__/helpers.test.ts` and add tests:

```typescript
import { describe, it, expect } from 'vitest';
import { slugify } from '../helpers';

describe('slugify', () => {
  it('converts a simple string to a slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('handles special characters', () => {
    expect(slugify('My Blog Post #1!')).toBe('my-blog-post-1');
  });

  it('trims whitespace and hyphens', () => {
    expect(slugify('  spaced out  ')).toBe('spaced-out');
  });

  it('collapses multiple hyphens', () => {
    expect(slugify('too---many---hyphens')).toBe('too-many-hyphens');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('');
  });

  // TODO: Add at least 2 more test cases for slugify
  // Ideas: strings with numbers, strings with mixed case, strings that are already slugs
});
```

### Step 1.4: Verify Your Work

```bash
npm test
```

✅ **Checkpoint:** You should now see 12+ passing tests (7 starter + 5 new).

### Step 1.5: Commit with a Descriptive Message

```bash
git add src/helpers.ts src/__tests__/helpers.test.ts
git commit -m "feat: add slugify helper function with tests

- Implements URL-friendly slug conversion
- Handles special characters, whitespace, consecutive hyphens
- Includes 5+ test cases covering edge cases"
```

> **Why this format?** Professional teams use structured commit messages. The `feat:` prefix follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. The body explains *what* and *why*, not just *how*.

### Step 1.6: Push and Open a Pull Request

```bash
git push -u origin feature/add-slug-helper
```

Now go to your GitHub repository and open a Pull Request:

1. Click **"Compare & pull request"** (or go to the Pull Requests tab → New pull request)
2. **Title:** `feat: add slugify helper function`
3. **Description** — a template will auto-populate with a review checklist. Fill in the sections at the top:
   - What the PR adds
   - How you tested it
   - Any design decisions you made
4. **Do NOT merge yet** — you'll come back to this PR later

✅ **Checkpoint:** You should have an open PR from `feature/add-slug-helper` → `main` on GitHub.

🤔 **Reflection Question:** The Atlassian article says pull requests allow team members to "sign off on a feature before it gets integrated into the official project." Even though you're working alone, why is documenting your changes in a PR valuable? Think about what a future teammate (or future you) would want to know.

---

## Part 2: Simulating Parallel Work & Merge Conflicts (30 minutes)

In a real team, multiple developers work on different branches simultaneously. Sometimes those branches modify the same file, creating merge conflicts. In this part, you'll intentionally create a merge conflict and resolve it.

### Step 2.1: Switch Back to Main

```bash
git checkout main
```

> **Important:** You're switching back to `main` *without* merging your feature branch. This simulates a teammate starting new work from the same base.

### Step 2.2: Create a Second Feature Branch

```bash
git checkout -b feature/add-truncate-helper
```

### Step 2.3: Add a `truncate` Function to `helpers.ts`

Open `src/helpers.ts`. Since you're on `main` (not your slug branch), **this file is still empty**. Add the following:

```typescript
/**
 * Truncates a string to a maximum length, adding an ellipsis if truncated.
 *
 * @example truncate("Hello World", 5) → "Hello..."
 * @example truncate("Hi", 10) → "Hi"
 */
export function truncate(input: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new Error('maxLength must be non-negative');
  }
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength) + '...';
}
```

### Step 2.4: Add Tests for `truncate`

Open `src/__tests__/helpers.test.ts` (also empty on this branch). Add:

```typescript
import { describe, it, expect } from 'vitest';
import { truncate } from '../helpers';

describe('truncate', () => {
  it('truncates long strings and adds ellipsis', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
  });

  it('returns original string if within limit', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('handles exact length', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('throws for negative maxLength', () => {
    expect(() => truncate('test', -1)).toThrow('maxLength must be non-negative');
  });

  // TODO: Add at least 2 more test cases for truncate
  // Ideas: empty string input, maxLength of 0, very long strings
});
```

### Step 2.5: Commit and Push

```bash
git add src/helpers.ts src/__tests__/helpers.test.ts
git commit -m "feat: add truncate helper function with tests

- Implements string truncation with ellipsis
- Validates maxLength parameter
- Includes 4+ test cases including error handling"
```

```bash
git push -u origin feature/add-truncate-helper
```

### Step 2.6: Merge the First Branch into Main

Now merge `feature/add-slug-helper` into `main` first:

```bash
git checkout main
git merge feature/add-slug-helper
```

This should merge cleanly (no conflicts yet). Push the updated main:

```bash
git push origin main
```

### Step 2.7: Create the Merge Conflict

Now try to merge the second branch:

```bash
git merge feature/add-truncate-helper
```

⚡ **You should see a merge conflict!** Both branches modified `src/helpers.ts` and `src/__tests__/helpers.test.ts` starting from the same empty state.

### Step 2.8: Resolve the Conflict

Open `src/helpers.ts` in your editor. You'll see conflict markers like:

```
<<<<<<< HEAD
// ... slugify code from the first merge ...
=======
// ... truncate code from the second branch ...
>>>>>>> feature/add-truncate-helper
```

**Resolve the conflict** by keeping **both** functions. The final `src/helpers.ts` should contain both `slugify` and `truncate`. Remove all conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

Do the same for `src/__tests__/helpers.test.ts` — keep **both** test suites. Make sure the imports include both functions:

```typescript
import { slugify, truncate } from '../helpers';
```

### Step 2.9: Verify the Resolution

```bash
npm test
```

✅ **Checkpoint:** All tests should pass — both the `slugify` and `truncate` tests, plus the original 7 starter tests (16+ total).

### Step 2.10: Complete the Merge

```bash
git add src/helpers.ts src/__tests__/helpers.test.ts
git commit -m "merge: resolve conflict combining slugify and truncate helpers

- Both functions preserved from their respective feature branches
- Import statements updated to include both exports
- All tests passing after resolution"
```

```bash
git push origin main
```

🤔 **Reflection Question:** The trunk-based development article recommends keeping branches short-lived to reduce the risk of conflicts. In this exercise, both branches modified the same files. How would working in smaller increments (as trunk-based development recommends) have reduced or eliminated this conflict? What does the article say about the number of active branches a repository should have?

---

## Part 3: Code Review Practice (20 minutes)

Code review is a critical part of any team workflow. In this part, you'll practice reviewing code using a structured checklist — even though you're reviewing your own work.

### Step 3.1: Open Your First PR on GitHub

Go back to the pull request you opened in Part 1 (`feature/add-slug-helper`). Since you already merged this branch, the PR should show as merged. That's fine — you can still view the diff and add comments.

If it's not merged on GitHub yet, that's OK too. You'll perform the review on the diff either way.

### Step 3.2: Create a New Feature Branch for Review Practice

Create one more small feature to practice a proper review workflow:

```bash
git checkout main
git pull origin main
git checkout -b feature/add-capitalize-helper
```

Add to `src/helpers.ts` (below your existing functions):

```typescript
/**
 * Capitalizes the first letter of each word in a string.
 *
 * @example capitalizeWords("hello world") → "Hello World"
 * @example capitalizeWords("javaScript is FUN") → "Javascript Is Fun"
 */
export function capitalizeWords(input: string): string {
  return input
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

Add tests to `src/__tests__/helpers.test.ts`:

```typescript
describe('capitalizeWords', () => {
  it('capitalizes first letter of each word', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  it('lowercases other letters', () => {
    expect(capitalizeWords('javaScript is FUN')).toBe('Javascript Is Fun');
  });

  it('handles single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  // TODO: Add at least 1 more test case for capitalizeWords
});
```

> **Don't forget** to add `capitalizeWords` to the import statement at the top of the test file.

Commit, push, and open a new PR:

```bash
git add src/helpers.ts src/__tests__/helpers.test.ts
git commit -m "feat: add capitalizeWords helper function with tests"
git push -u origin feature/add-capitalize-helper
```

Open a Pull Request on GitHub from `feature/add-capitalize-helper` → `main`.

### Step 3.3: Perform a Self-Review

Your PR description was auto-populated with a review checklist (from the PR template). Use this checklist along with `REVIEW_CHECKLIST.md` to review your own code. Go through each item and check it off in the PR description. For each item, add a comment directly on the PR explaining how your code meets (or doesn't meet) the criteria.

**Add at least 5 review comments** on the PR. These should be substantive — not just "looks good" but observations like:
- "This handles edge cases for empty strings on line X"
- "The regex on line Y could be clearer — I'd consider adding a named constant"
- "Tests cover the happy path and error case, but I could add a test for strings with multiple spaces"

### Step 3.4: Address Your Own Feedback

If any of your review comments identified improvements, make them! Commit and push the changes to update the PR.

### Step 3.5: Merge the PR

Once you're satisfied with the review, merge the PR on GitHub using the **"Squash and merge"** option. This combines all branch commits into a single clean commit on `main`.

```bash
git checkout main
git pull origin main
```

✅ **Checkpoint:** Run `npm test` — all tests should pass (20+ tests total).

🤔 **Reflection Question:** The Feature Branch Workflow article says pull requests "initiate discussion about potential modifications." In a real team, what kinds of things might a reviewer catch that automated tests cannot? How does code review complement CI/CD?

---

## Part 4: Workflow Documentation (25 minutes)

### Step 4.1: Complete CONTRIBUTING.md

Open `CONTRIBUTING.md` in your repository. Fill in the template with guidelines based on what you practiced in this lab and learned from the readings. Include:

1. **Branch naming conventions** (what prefixes to use and why)
2. **Commit message format** (reference Conventional Commits)
3. **Pull request process** (what to include in a PR description)
4. **Code review expectations** (minimum comments, what to look for)
5. **Merge strategy** (when to use merge vs. squash vs. rebase — reference the readings)

### Step 4.2: Write Your README

Create or update the `README.md` (rename the lab instructions file to `LAB_INSTRUCTIONS.md` first, then create a new `README.md` for your submission):

```bash
# Linux/macOS/PowerShell:
mv README.md LAB_INSTRUCTIONS.md

# Windows Command Prompt:
ren README.md LAB_INSTRUCTIONS.md
```

Your new `README.md` must include:

1. **Your Name and Date**

2. **Workflow Summary** — A brief description of the workflow you followed in this lab (branching strategy, PR process, conflict resolution)

3. **Reflection Section** (minimum 300 words) addressing:
   - Compare the Feature Branch Workflow and Gitflow Workflow. When would you choose each? Reference specific points from the Atlassian articles.
   - The trunk-based development article recommends three or fewer active branches. How did your experience with merge conflicts in Part 2 support or challenge this recommendation?
   - The Gitflow article acknowledges that Gitflow "has fallen in popularity" in favor of trunk-based workflows. Based on your experience in this lab, why do you think that shift happened?
   - How would feature flags (described in the trunk-based development article) change the way you managed the `slugify` and `truncate` features?

4. **Key Concepts** section listing 3–5 concepts you learned

5. **Git Log** — Include the output of:
   ```bash
   git log --oneline --graph --all
   ```
   Paste this into your README inside a code block so the branch structure is visible.

### Step 4.3: Final Commit

```bash
git add -A
git commit -m "docs: add workflow documentation, contributing guide, and reflection"
git push origin main
```

✅ **Checkpoint:** Your repository should have a complete `README.md`, `CONTRIBUTING.md`, all helper functions, and a visible branch history with at least 3 feature branches.

---

## Deliverables

Your submission should include:

```
team-workflow-lab/
├── src/
│   ├── formatters.ts              # Provided (starter)
│   ├── validators.ts              # Provided (starter)
│   ├── helpers.ts                 # slugify + truncate + capitalizeWords
│   └── __tests__/
│       ├── formatters.test.ts     # Provided (starter)
│       ├── validators.test.ts     # Provided (starter)
│       └── helpers.test.ts        # Your tests for all helper functions
├── .github/
│   ├── pull_request_template.md   # PR template (provided)
│   └── workflows/
│       └── test.yml               # CI workflow (provided)
├── CONTRIBUTING.md                # Completed contribution guidelines
├── REVIEW_CHECKLIST.md            # Code review checklist (provided)
├── LAB_INSTRUCTIONS.md            # Original lab instructions (renamed)
├── README.md                      # Your submission (reflection + git log)
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── src/setupTests.ts
```

### README.md Requirements

Your `README.md` must include:

1. **Your Name and Date**
2. **Workflow Summary** — Brief description of your workflow
3. **Reflection Section** (minimum 300 words) answering the prompts above
4. **Key Concepts** section listing 3–5 concepts you learned
5. **Git Log** — Output of `git log --oneline --graph --all` in a code block

### Requirements Summary

- [ ] Minimum **20 passing tests** (7 starter + 13 added)
- [ ] Minimum **90% code coverage**
- [ ] At least **3 feature branches** visible in git history
- [ ] At least **1 merge conflict resolved** (visible in commit history)
- [ ] At least **1 pull request** with 5+ review comments on GitHub
- [ ] `CONTRIBUTING.md` completed with all 5 sections
- [ ] `README.md` with reflection (300+ words), key concepts, and git log
- [ ] TypeScript compiles without errors

---

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Branch/PR workflow (3+ branches, meaningful commit messages, PR descriptions) | 30 |
| Helper implementations (slugify, truncate, capitalizeWords with tests) | 20 |
| Merge conflict resolution (documented in commit history, both sides preserved) | 10 |
| Code review (5+ substantive comments on PR, improvements addressed) | 10 |
| CONTRIBUTING.md (all 5 sections, references readings) | 10 |
| README reflection (300+ words, addresses all prompts, connects to readings) | 10 |
| Code quality (90%+ coverage, TypeScript, clean code, TODOs completed) | 10 |
| **Total** | **100** |

---

## Stretch Goals

If you finish early, try these challenges:

1. **Simulate a Gitflow Workflow:** Create a `develop` branch, branch features off `develop` instead of `main`, then merge `develop` into `main` as a "release." Document the differences you notice.

2. **Add Branch Protection Rules:** In your repository settings, configure branch protection for `main` (require PR reviews, require status checks). Document what this prevents.

3. **Interactive Rebase:** Use `git rebase -i` to squash or reorder commits on a feature branch before merging. Document what you did and why.

4. **Automate with Git Hooks:** Add a pre-commit hook that runs `npm run typecheck` before allowing commits. Document how this improves workflow reliability.

---

## Troubleshooting

### "fatal: not a git repository"

Make sure you're inside the cloned repository directory. Run `ls -la` to check for a `.git` folder.

### Merge conflict markers still in file

If tests fail after resolving a conflict, search for leftover conflict markers:

```bash
# Linux/macOS/PowerShell:
grep -rn "<<<<<<\|======\|>>>>>>" src/

# Windows Command Prompt:
findstr /s /n "<<<<<<" src\*
```

Remove any remaining markers, then run `npm test` again.

### "Your branch is behind 'origin/main'"

```bash
git pull origin main
```

If you get conflicts during the pull, resolve them the same way you did in Part 2.

### Can't push to a branch

```bash
# Check which branch you're on:
git branch

# If on wrong branch:
git checkout <correct-branch>
```

### "npm ci" fails in GitHub Actions

Make sure `package-lock.json` is committed:

```bash
git add package-lock.json
git commit -m "chore: add package-lock.json"
git push
```

### Coverage not meeting threshold

Run `npm run test:coverage` locally and open `coverage/index.html` in a browser to see uncovered lines. Make sure all functions and error paths have tests.

---

## Submission

1. Push all branches and final `main` to your GitHub repository
2. Verify GitHub Actions passes all checks
3. Verify your PR(s) are visible with review comments
4. Submit your repository URL via Canvas

**Due:** Monday, March 2, 2026 at 11:59 PM

---

## Resources

- 📖 [Comparing Workflows (Atlassian)](https://www.atlassian.com/git/tutorials/comparing-workflows)
- 📖 [Gitflow Workflow (Atlassian)](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- 📖 [Trunk-based Development (Atlassian)](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development)
- 📖 [Git Branching (Official Git Book)](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- 📖 [Conventional Commits](https://www.conventionalcommits.org/)
