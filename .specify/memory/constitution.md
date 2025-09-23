<!--
SYNC IMPACT REPORT
Version change: v0.0.0 → v1.0.0
List of modified principles: None (initial version)
Added sections:
- Core Principles (5 principles)
- Additional Constraints
- Development Workflow
- Governance
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
Follow-up TODOs: None
-->

# Game Night Central Constitution

## Core Principles

### Library-First Development
Every feature starts as a standalone library; Libraries must be self-contained, independently testable, and documented; Clear purpose required - no organizational-only libraries

### CLI Interface Standard
Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats

### Test-First Development (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced

### Integration Testing
Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas

### Observability & Versioning
Text I/O ensures debuggability; Structured logging required; MAJOR.MINOR.BUILD format for versioning

## Additional Constraints
Technology stack requirements: Next.js 15+, React 18+, TypeScript, Tailwind CSS 4.1, Shadcn UI; Compliance standards: ESLint configuration with strict rules, Prettier for consistent code formatting, TypeScript strict mode enabled, Zero warnings and errors policy; Deployment policies: SQLite for local development with PostgreSQL ready for production

## Development Workflow
Code review requirements: All PRs/reviews must verify compliance with constitutional principles; Testing gates: Unit tests required for all components, Integration tests for data layer, E2E tests for user flows; Deployment approval process: Feature branches for all changes, Pull request reviews required, CI/CD pipeline validation

## Governance
All PRs/reviews must verify compliance with constitutional principles; Complexity must be justified with documented rationale; Use AGENTS.md for runtime development guidance; Constitution supersedes all other practices; Amendments require documentation, approval, and migration plan

**Version**: 1.0.0 | **Ratified**: 2025-09-23 | **Last Amended**: 2025-09-23