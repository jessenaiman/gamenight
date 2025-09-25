## Bug Report: Test Suite Failures (2025-09-23)

### 1. TypeScript Syntax Error

- **File:** `tests/contract/test_project_plan_template.test.ts`
- **Summary:** Test suite fails due to a TypeScript syntax error at line 162.
- **Steps to Reproduce:**
  1. Run `pnpm test` in the project root.
  2. Observe the error in the contract test output.
- **Expected Behavior:**
  - Test suite should run without syntax errors.
- **Actual Behavior:**
  - Error: `error TS1128: Declaration or statement expected.`
  - Line 162: `});`
- **Relevant Logs/Error Output:**
  ```
  tests/contract/test_project_plan_template.test.ts:162:1 - error TS1128: Declaration or statement expected.
  162 });
      ~
  ```
- **Environment:**
  - OS: Linux
  - Node version: [fill in]
  - Package manager: pnpm
- **Additional Context:**
  - Review the test file for missing or extra brackets/parentheses near line 162.

---

### 2. Playwright/Jest Misconfiguration

- **File:** `tests/e2e/database-seeding.test.ts`
- **Summary:** Playwright tests are being run by Jest, causing failures.
- **Steps to Reproduce:**
  1. Run `pnpm test` in the project root.
  2. Observe Playwright error in the e2e test output.
- **Expected Behavior:**
  - Playwright tests should be run with Playwright’s test runner, not Jest.
- **Actual Behavior:**
  - Error: `Playwright Test needs to be invoked via 'pnpm exec playwright test' and excluded from Jest test runs.`
- **Relevant Logs/Error Output:**
  ```
  Playwright Test needs to be invoked via 'pnpm exec playwright test' and excluded from Jest test runs.
  ```
- **Environment:**
  - OS: Linux
  - Node version: [fill in]
  - Package manager: pnpm
- **Additional Context:**
  - Separate Playwright and Jest tests into different directories as recommended by Playwright docs.

---

### 3. Prisma Migration SQL Error

- **File:** `tests/integration/database.test.ts`
- **Summary:** Database migration tests fail due to unsupported SQL statements for SQLite.
- **Steps to Reproduce:**
  1. Run `pnpm test` in the project root.
  2. Observe migration errors in the integration test output.
- **Expected Behavior:**
  - Prisma migrations should apply cleanly to the SQLite database.
- **Actual Behavior:**
  - Error: `SQLite database error near "SET": syntax error in -- Migration: Initial schema setup`
- **Relevant Logs/Error Output:**
  ```
  Migration failed to apply cleanly to the shadow database.
  SQLite database error near "SET": syntax error in -- Migration: Initial schema setup
  SET QUOTED_IDENTIFIER ON;
  SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
  ```
- **Environment:**
  - OS: Linux
  - Node version: [fill in]
  - Package manager: pnpm
- **Additional Context:**
  - Remove or replace unsupported SQL statements in Prisma migrations for SQLite compatibility.
