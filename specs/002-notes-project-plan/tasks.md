# Tasks: Project Plan Template for AI Agent

**Input**: Design documents from `/specs/002-notes-project-plan/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → If not found: ERROR "No implementation plan found"
   → Extract: tech stack, libraries, structure
2. Load optional design documents:
   → data-model.md: Extract entities → model tasks
   → contracts/: Each file → contract test task
   → research.md: Extract decisions → setup tasks
3. Generate tasks by category:
   → Setup: project init, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, services, CLI commands
   → Integration: DB, middleware, logging
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All contracts have tests?
   → All entities have models?
   → All endpoints implemented?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 3.1: Setup
- [ ] T001 Initialize TypeScript project with Next.js 15+ dependencies
- [ ] T002 [P] Configure Tailwind CSS 4.1 with CSS-first configuration
- [ ] T003 [P] Setup Shadcn UI components (read-only configuration)
- [ ] T004 [P] Configure ESLint and Prettier for code quality
- [ ] T005 [P] Setup Prisma ORM with SQLite development configuration

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T006 [P] Contract test for project plan template structure in tests/contract/test_project_plan_template.py
- [ ] T007 [P] Integration test for AI agent startup procedures in tests/integration/test_ai_agent_startup.py
- [ ] T008 [P] Integration test for knowledge management workflows in tests/integration/test_knowledge_management.py
- [ ] T009 [P] Integration test for file navigation and read-only validation in tests/integration/test_file_navigation.py
- [ ] T010 [P] Integration test for learning strategy implementation in tests/integration/test_learning_strategy.py

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T011 [P] ProjectPlanTemplate entity model in src/models/project-plan-template.ts
- [ ] T012 [P] Section entity model in src/models/section.ts
- [ ] T013 [P] TechStack entity model in src/models/tech-stack.ts
- [ ] T014 [P] FileStructure entity model in src/models/file-structure.ts
- [ ] T015 [P] LearningStrategy entity model in src/models/learning-strategy.ts
- [ ] T016 [P] KnowledgeManagement entity model in src/models/knowledge-management.ts
- [ ] T017 [P] DatabaseAuthPlan entity model in src/models/database-auth-plan.ts
- [ ] T018 [P] NextSteps entity model in src/models/next-steps.ts
- [ ] T019 Project plan template service with CRUD operations in src/services/project-plan-service.ts
- [ ] T020 [P] File structure validation service in src/services/file-structure-service.ts
- [ ] T021 [P] Knowledge management service in src/services/knowledge-management-service.ts
- [ ] T022 [P] Learning strategy service in src/services/learning-strategy-service.ts
- [ ] T023 Main project plan template component in src/components/project-plan-template.tsx
- [ ] T024 [P] Section component with markdown support in src/components/section.tsx
- [ ] T025 [P] Tech stack display component in src/components/tech-stack.tsx
- [ ] T026 [P] File tree structure component in src/components/file-tree.tsx

## Phase 3.4: Integration
- [ ] T027 Connect all entity models to Prisma schema
- [ ] T028 [P] Database connection and configuration service in src/services/database-service.ts
- [ ] T029 [P] Authentication plan integration in src/services/auth-plan-service.ts
- [ ] T030 [P] Next steps workflow service in src/services/next-steps-service.ts
- [ ] T031 API route for project plan data access in src/app/api/project-plan/route.ts
- [ ] T032 [P] API route for tech stack information in src/app/api/tech-stack/route.ts
- [ ] T033 [P] API route for file structure data in src/app/api/file-structure/route.ts
- [ ] T034 Main project plan page component in src/app/project-plan/page.tsx
- [ ] T035 [P] Table of contents component with navigation in src/components/table-of-contents.tsx
- [ ] T036 [P] Learning strategy workflow component in src/components/learning-strategy.tsx

## Phase 3.5: Polish
- [ ] T037 [P] Unit tests for entity models in tests/unit/test_entities.py
- [ ] T038 [P] Unit tests for services in tests/unit/test_services.py
- [ ] T039 [P] Unit tests for components in tests/unit/test_components.py
- [ ] T040 Performance validation for API endpoints (<200ms response time)
- [ ] T041 [P] Update documentation structure in docs/project-plan-docs.md
- [ ] T042 [P] Create user guide for AI agent operations in docs/ai-agent-guide.md
- [ ] T043 [P] Update README.md with project plan template usage
- [ ] T044 Run all quickstart scenarios for validation
- [ ] T045 [P] Generate API documentation for all endpoints
- [ ] T046 [P] Code quality validation with Codacy analysis

## Dependencies
- Setup (T001-T005) before all other phases
- Tests (T006-T010) before implementation (T011-T026)
- Entity models (T011-T018) before services (T019-T022)
- Services before API routes (T027-T033)
- Database schema (T027) before database services (T028-T030)
- Core components before integration components (T023-T026 before T034-T036)
- Implementation before polish (T011-T036 before T037-T046)
- T027 blocks T028-T030
- T031-T033 can run in parallel after T027-T030 complete

## Parallel Example
```
# Launch T011-T018 together (entity models):
Task: "ProjectPlanTemplate entity model in src/models/project-plan-template.ts"
Task: "Section entity model in src/models/section.ts"
Task: "TechStack entity model in src/models/tech-stack.ts"
Task: "FileStructure entity model in src/models/file-structure.ts"
Task: "LearningStrategy entity model in src/models/learning-strategy.ts"
Task: "KnowledgeManagement entity model in src/models/knowledge-management.ts"
Task: "DatabaseAuthPlan entity model in src/models/database-auth-plan.ts"
Task: "NextSteps entity model in src/models/next-steps.ts"

# Launch T024-T026 together (components):
Task: "Section component with markdown support in src/components/section.tsx"
Task: "Tech stack display component in src/components/tech-stack.tsx"
Task: "File tree structure component in src/components/file-tree.tsx"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same file conflicts

## Task Generation Rules
*Applied during main() execution*

1. **From Contracts**:
   - Each contract file → contract test task [P]
   - Each endpoint → implementation task

2. **From Data Model**:
   - Each entity → model creation task [P]
   - Relationships → service layer tasks

3. **From User Stories**:
   - Each story → integration test [P]
   - Quickstart scenarios → validation tasks

4. **Ordering**:
   - Setup → Tests → Models → Services → Endpoints → Polish
   - Dependencies block parallel execution

## Validation Checklist
*GATE: Checked by main() before returning*

- [x] All contracts have corresponding tests
- [x] All entities have model tasks
- [x] All tests come before implementation
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task