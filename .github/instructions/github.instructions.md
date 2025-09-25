# GitHub Copilot Branch

## Issue Workflow: Best Practices


### 1. Always Work From an Issue

- Every feature, bugfix, or documentation change should start with a GitHub issue.
- Use issues to track requirements, discussion, and acceptance criteria.

### 2. Create a Dedicated Branch Per Issue
- Name your branch after the issue for traceability, e.g.:
  - `issue-42-fix-login-bug`
  - `feature/123-add-user-profile`
- Avoid working directly on `main` or `develop`.

### 3. Reference the Issue in Branch and PR
- Include the issue number in your branch name and pull request title/body.
- Use keywords like `Closes #42` in the PR description to auto-close the issue on merge.

### 4. Keep Branches Focused and Short-Lived
- Only include changes relevant to the issue.
- Rebase or merge frequently to keep up with `main`.

### 5. Pull Request Best Practices
- Open a pull request as soon as you start work (draft PRs are encouraged).
- Link the PR to the issue.
- Request reviews early and update the PR as you work.

### 6. Never Merge Without Review
- Require at least one review before merging.
- Use status checks and CI to enforce code quality.

### 7. Clean Up After Merge
- Delete the feature branch after merging.
- Ensure the issue is closed (auto-closed if using keywords).

### 8. Use GitHub Copilot for Guidance, Not as a Substitute for Review
- Copilot can suggest code and workflows, but always review and test before merging.

---

**Summary Workflow:**
1. Create an issue.
2. Create a branch named after the issue.
3. Work on the branch, commit referencing the issue.
4. Open a PR referencing the issue.
5. Get review, merge, and close the issue.
6. Delete the branch.

This ensures traceability, code quality, and a clean project history.
