# Tech Stack & Dependencies

## Overview

Game Night Central is built with modern web technologies for a robust, scalable application.

## Core Technologies

### Framework & Runtime

- **Next.js 14+** → React framework with App Router
- **React 18+** → UI library
- **TypeScript** → Type-safe JavaScript
- **Node.js** → JavaScript runtime

### Styling & UI

- **Tailwind CSS** → Utility-first CSS framework
- **Shadcn UI** → Component library built on Radix UI
- **Radix UI** → Low-level, accessible UI primitives
- **Lucide React** → Icon library
- **Class Variance Authority** → Component variant management

### Development Tools

- **ESLint** → Code linting
- **PostCSS** → CSS processing
- **TypeScript** → Type checking

## Key Dependencies

### Production Dependencies

```json
{
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-alert-dialog": "^1.0.5",
  "@radix-ui/react-avatar": "^1.0.4",
  "@radix-ui/react-button": "^1.0.4",
  "@radix-ui/react-calendar": "^0.1.8",
  "@radix-ui/react-card": "^1.0.4",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-form": "^0.0.3",
  "@radix-ui/react-icons": "^1.3.0",
  "@radix-ui/react-input": "^1.0.4",
  "@radix-ui/react-label": "^2.0.2",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-progress": "^1.0.3",
  "@radix-ui/react-radio-group": "^1.1.3",
  "@radix-ui/react-scroll-area": "^1.0.5",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-separator": "^1.0.3",
  "@radix-ui/react-sheet": "^1.0.4",
  "@radix-ui/react-sidebar": "^1.0.0",
  "@radix-ui/react-slider": "^1.1.2",
  "@radix-ui/react-switch": "^1.0.3",
  "@radix-ui/react-table": "^1.0.0",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-textarea": "^1.0.4",
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-tooltip": "^1.0.7",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "lucide-react": "^0.408.0",
  "next": "^14.2.5",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "tailwind-merge": "^2.4.0",
  "tailwindcss-animate": "^1.0.7"
}
```

### Development Dependencies

```json
{
  "@types/node": "^22.0.0",
  "@types/react": "^18.3.3",
  "@types/react-dom": "^18.3.0",
  "eslint": "^8.57.0",
  "eslint-config-next": "^14.2.5",
  "postcss": "^8.4.40",
  "tailwindcss": "^3.4.7",
  "typescript": "^5.5.4"
}
```

## Project Structure

### UI Components (Read-only)

- Located in `src/components/ui/`
- Imported from Radix UI primitives
- Should not be modified directly
- Use shadcn's CLI to add/modify components

### Custom Components

- Located in `src/components/`
- Custom business logic components
- Can be modified as needed

### Pages

- Located in `src/app/` (App Router)
- Each route has its own directory
- Dynamic routes use `[slug]` pattern

### Utilities

- Located in `src/lib/`
- Shared utility functions
- Configuration files

## Related Files

- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Tailwind configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - Shadcn configuration
- `next.config.ts` - Next.js configuration
