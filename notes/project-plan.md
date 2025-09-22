# 📄 Project Plan Template (VS Code + AI Agent)

> *This document serves as a reference guide for the AI agent to understand the project context, navigate files, manage knowledge, and execute tasks efficiently without requiring real-time scanning.*

---

## 🔹 Table of Contents (TOC) – Top 5 Relevant Topics
*(Use this section to quickly locate high-level topics)*

1. [Project Start & Tech Stack](#project-start--tech-stack)
2. [Top 5 Commands](#top-5-commands)
3. [File Tree Structure](#file-tree-structure)
4. [Learning Strategy](#learning-strategy)
5. [Knowledge Management with Markdown](#knowledge-management-with-markdown)
6. [Database & Authentication Plan](#database--authentication-plan)
TODO: update TOC always
---

## 🚀 Project Start & Tech Stack

### Frameworks & Libraries
- **Next.js** → React framework with App Router
- **TypeScript** → Type-safe JavaScript
- **Tailwind CSS** → Utility-first CSS framework
- **Shadcn UI** → Pre-built React components (installed, read-only)
- **React** → Frontend framework used throughout

### Key Dependencies
- **@radix-ui/react-*** → Low-level UI primitives
- **@headlessui/react** → Unstyled UI components
- **lucide-react** → Icon library
- **class-variance-authority** → Component variant management

> ✅ All components are imported from `@radix-ui/react-*` or `@headlessui/react` via shadcn's wrapper.
> ⚠️ Shadcn components are **read-only**; avoid modifying source files in `src/components/ui/`.

---

## 🔧 Top 5 Commands

The AI agent should prioritize these actions:

| Command   | Purpose |
|----------|--------|
| `search` | Find content across files using keywords or patterns |
| `read`   | Read file contents (e.g., `.ts`, `.tsx`, `.md`) |
| `write`  | Modify or create new files (with caution) |
| `save`   | Save changes after editing |
| `list`   | List directory contents or available files |

> 💡 Use `search` first before writing — always check if content already exists.

---

## 📁 File Tree Structure

```text
project-root/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── admin/
│   │   ├── events/
│   │   ├── ideas/
│   │   ├── rules/
│   │   ├── signup/
│   │   └── volunteers/
│   ├── components/
│   │   ├── ui/                  # Shadcn components (read-only)
│   │   ├── layout/              # Layout components
│   │   ├── event-calendar.tsx
│   │   ├── poll.tsx
│   │   └── signup-form.tsx
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   └── ai/                      # AI-related functionality
├── docs/                        # Documentation files
├── notes/                       # Knowledge management
├── public/                      # Static assets
├── tailwind.config.ts
├── package.json
└── README.md
```

> 📌 The AI agent must respect read-only directories like `components/ui`.

---

## 🧠 Learning Strategy

### Goal: Learn `<Topic>` for `<Task>`

When tasked with learning a new concept or completing a task:

1. **Create a markdown note**:
   - Use filename pattern: `notes/<topic>.md`
   - Example: `notes/forms-validation.md`

2. **Search for existing knowledge**:
   ```bash
   search "forms validation"
   ```
   - If found, **read** and extend it.
   - If not found, **create** new note.

3. **Read TOC to find relevant sections**:
   - Use the table of contents at the top of the project plan or in `README.md` to navigate.

4. **Update TOC when adding new topics**:
   - Add entries under "Table of Contents" if the topic is significant.

> ✅ Always follow the principle: **Don't duplicate**. Reuse or extend existing knowledge.

---

## 📝 Knowledge Management with Markdown

### How to Store & Retrieve Knowledge

#### ✅ Create New Knowledge
```markdown
# <Topic>

## Overview
Brief description of the topic.

## Usage Examples
Code snippets or usage patterns.

## Related Files
- `src/components/form.tsx`
- `src/hooks/useForm.ts`
```

#### 🔍 Retrieve Knowledge
- Use `search "<keyword>"` to locate related files.
- Use `read notes/<topic>.md` to load stored knowledge.
- Use `read README.md` to review project overview and TOC.

#### 🔄 Update Knowledge
- Append to existing `.md` files instead of creating duplicates.
- Ensure consistency in naming and formatting.

> 🛠️ Tip: Use `#` and `##` headers consistently so TOC can be auto-generated.

---

## 🗄️ Database & Authentication Plan

### Current Status ✅ PHASE 1 COMPLETE
- **✅ Database infrastructure fully implemented** with Prisma ORM
- **✅ SQLite database** configured for development with PostgreSQL ready for production
- **✅ Complete database schema** with all models, relations, and enums
- **✅ Prisma client** generated and configured in `src/lib/prisma.ts`
- **✅ Seed data** created with sample categories, events, users, and registrations
- **✅ Database management scripts** added to package.json

### Architecture Implementation ✅
**Prisma ORM + Environment-Based Configuration**:
- **SQLite** for local development (zero configuration)
- **PostgreSQL** ready for production deployment
- **NextAuth.js** dependencies installed and ready
- **Migration and seed scripts** implemented and tested

### Implementation Roadmap
See [`notes/database-authentication-plan.md`](notes/database-authentication-plan.md) for the comprehensive implementation plan:

- **✅ Phase 1**: Foundation setup (Prisma, database schema, basic auth) - COMPLETE
- **Phase 2**: Authentication system (NextAuth, user roles, permissions)
- **Phase 3**: Data layer implementation (repositories, API routes)
- **Phase 4**: Feature integration (real data for all pages)

### Priority Features
1. **✅ Database Setup** - Prisma ORM with SQLite/PostgreSQL - COMPLETE
2. **User Authentication** - NextAuth.js with credentials
3. **Event Management** - Database-backed events with migrations
4. **Registration System** - Real registration persistence
5. **Admin Dashboard** - Live data management interface

### Testing Strategy
- **Playwright E2E tests** for each phase implementation
- **Unit tests** for repositories and utilities
- **Integration tests** for database connections
- **Migration and seed script testing**

### Code Quality Requirements
- **ESLint configuration** with strict rules
- **Prettier** for consistent code formatting
- **TypeScript strict mode** enabled
- **Codacy integration** for code quality reports
- **Test coverage** reporting and requirements
- **Zero warnings and errors** policy

---

## 🧩 Next Steps for AI Agent

1. **On startup**: Load `README.md` and this plan to establish context.
2. **Before any task**: Search for existing notes or code.
3. **After learning**: Write a markdown note and update TOC if needed.
4. **Always verify**: Confirm whether a file is read-only before attempting to write.

---

> ✅ This template ensures the AI agent operates with full awareness of the project's scope, tools, and knowledge system — reducing redundant work and improving accuracy.
