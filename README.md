# Game Night Central

A comprehensive web application for managing game night events, registrations, and community engagement.

## 🚀 Getting Started

To get started, take a look at `src/app/page.tsx`.

## 📚 Knowledge Management (Memory Bank)

This project uses a structured knowledge management system to maintain project context and documentation:

### Core Knowledge Files

- [`notes/project-plan.md`](notes/project-plan.md) - Main project reference and guidelines
- [`notes/gamenight-features.md`](notes/gamenight-features.md) - Feature documentation and overview
- [`notes/tech-stack.md`](notes/tech-stack.md) - Technology stack and dependencies
- [`notes/ai-functionality.md`](notes/ai-functionality.md) - AI features and implementation notes
- [`notes/knowledge-management.md`](notes/knowledge-management.md) - Knowledge management system guide

### Documentation Sources

- [`docs/blueprint.md`](docs/blueprint.md) - Original project blueprint and requirements
- [`docs/data-structures.md`](docs/data-structures.md) - Database schema and data structure analysis

### How to Use the Memory Bank

1. **Before starting work**: Search for existing implementations and review related knowledge files
2. **During development**: Reference existing patterns and follow established conventions
3. **After completing work**: Document new features and update related knowledge files

### Quick Commands

- Search for information: Use `search "keyword"` to find content across files
- Read specific topics: Use `read notes/topic-name.md` to load stored knowledge
- List knowledge files: Use `list notes/` to see all available knowledge files

## 🛠️ Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library built on Radix UI
- **Google Genkit** - AI-powered content generation

## 📁 Project Structure

```
project-root/
├── src/
│   ├── app/                     # Next.js App Router pages
│   ├── components/              # React components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   └── ai/                      # AI-related functionality
├── docs/                        # Documentation files
├── notes/                       # Knowledge management
└── public/                      # Static assets
```

## 🎯 Features

- Event Calendar - Interactive calendar with game night events
- Event Registration - User-friendly signup with pricing calculation
- Admin Dashboard - Registration management and event oversight
- Volunteer System - Recruitment and role management
- Community Engagement - Ideas, polls, and feedback system
- AI Integration - Content generation and data processing

For detailed feature information, see [`notes/gamenight-features.md`](notes/gamenight-features.md).

## 🗄️ Database & Authentication Status

**Current State**: Static data with mock functionality
**Goal**: Full database integration with user authentication
**Architecture**: Prisma ORM with environment-based configuration

### Implementation Plan

See [`notes/database-authentication-plan.md`](notes/database-authentication-plan.md) for the comprehensive roadmap including:

- **Phase 1**: Prisma setup and database schema creation
- **Phase 2**: NextAuth.js authentication with user roles
- **Phase 3**: Repository pattern and API route implementation
- **Phase 4**: Feature integration and testing

### Key Requirements

- [ ] Prisma ORM installation and configuration
- [ ] Database schema with migrations and seeds
- [ ] NextAuth.js authentication system
- [ ] SQLite for development, PostgreSQL for production
- [ ] API routes for data operations
- [ ] Role-based access control

### Files to Review

- [`docs/data-structures.md`](docs/data-structures.md) - Database schema requirements
- [`notes/database-authentication-plan.md`](notes/database-authentication-plan.md) - Implementation roadmap
- [`package.json`](package.json) - Current dependencies
