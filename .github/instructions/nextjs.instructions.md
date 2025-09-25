# Next.js & React Development Guidelines

Auto-generated from project analysis. Last updated: 2025-09-25

## Active Technologies
- TypeScript, Next.js 15+, React 18+ + Next.js, TypeScript, Tailwind CSS 4.1, Shadcn UI, Prisma ORM (002-notes-project-plan)

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/
│   ├── events/
│   ├── ideas/
│   ├── rules/
│   ├── signup/
│   └── volunteers/
├── components/             # React components
│   ├── ui/                 # Shadcn components (read-only)
│   └── layout/             # Layout components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── ai/                     # AI-related functionality
tests/
```

## Commands
- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check formatting without changing files
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run Jest tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run db:seed` - Seed the database with sample data
- `npm run db:reset` - Reset the database
- `npm run db:studio` - Open Prisma Studio
- `npm run quality` - Run linting, formatting, and type checking
- `npm run quality:fix` - Run quality checks with auto-fix

## Code Style
- TypeScript, Next.js 15+, React 18+: Follow standard conventions
- Use TypeScript for all new files
- Use functional components with hooks
- Follow React best practices and performance patterns
- Use Tailwind CSS utility classes with shadcn components
- Use absolute imports (e.g., `@/components/ui/button`)

## Framework Specifics

### Next.js App Router
- Use the App Router (`src/app/`) for routing
- Each directory in `src/app/` represents a route
- Use `page.tsx` files for route endpoints
- Use `layout.tsx` files for shared layouts
- Use `[param]` directories for dynamic routes
- Use `@` alias for absolute imports from `src/` directory

### React Component Guidelines
- Use TypeScript interfaces for component props
- Use functional components with hooks
- Follow the container/presentational pattern where appropriate
- Use React's built-in context API or custom hooks for state management
- Use `useEffect` sparingly and always include proper dependencies
- Use `useMemo` and `useCallback` for performance optimization when needed

### Shadcn UI Components
- Components in `src/components/ui/` are read-only
- Use these components for consistent UI
- Do not modify these files directly
- Use shadcn CLI to add new components if needed

### Tailwind CSS 4.1
- Use utility classes for styling
- Use CSS-first configuration via `@import "tailwindcss"`
- Use `tailwind.config.ts` for custom configurations
- Use `@apply` for complex component classes in CSS files

### TypeScript Usage
- Use strict TypeScript mode
- Define interfaces for all component props
- Use type guards for runtime type checking
- Prefer type inference over explicit typing when clear
- Use discriminated unions for complex state management

## Recent Changes
- Next.js 15.5.3 with Turbopack support
- React 18+ with hooks and concurrent features
- Tailwind CSS 4.1 with CSS-first configuration
- Prisma ORM with database authentication plan
- Google Genkit for AI functionality

## Testing Guidelines
- Use Jest for unit testing
- Use React Testing Library for component testing
- Use Playwright for end-to-end testing
- Aim for high test coverage on critical paths
- Write tests that reflect user interactions

## Performance Considerations
- Use React.memo for components that render frequently
- Use React.lazy and Suspense for code splitting
- Optimize images with Next.js Image component
- Use server components when possible for smaller bundles
- Implement proper loading and error boundaries

## Common Patterns
- Use Next.js Link component for internal navigation
- Use Next.js Image component for optimized images
- Use Next.js Head component for metadata
- Use Next.js Script component for third-party scripts
- Use Next.js fetch for server-side data fetching
- Use React Server Components for data fetching when possible

## Environment Variables
- Use `.env.local` for local environment variables
- Use `process.env` to access environment variables
- Define types for environment variables in `env.d.ts`

## Database Integration
- Use Prisma ORM for database operations
- Define schema in `prisma/schema.prisma`
- Use Prisma Client for database queries
- Follow repository pattern for data access layer
- Use environment-based configuration for different databases

## AI Integration
- Use Google Genkit for AI functionality
- Located in `src/ai/` directory
- Follow established patterns in existing AI components

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->