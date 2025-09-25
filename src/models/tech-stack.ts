/**
 * Tech Stack Entity Model
 *
 * Represents the technology stack information used in the project.
 */
export interface TechStack {
  /** Unique identifier for the tech stack entry */
  id: string;

  /** Technology name */
  name: string;

  /** Technology version */
  version: string;

  /** Technology description */
  description: string;

  /** Technology category (framework, library, tool, etc.) */
  category: TechCategory;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Technology categories
 */
export enum TechCategory {
  FRAMEWORK = 'framework',
  LIBRARY = 'library',
  TOOL = 'tool',
  DATABASE = 'database',
  AUTHENTICATION = 'authentication',
  UI_COMPONENT = 'ui_component',
  DEVELOPMENT_TOOL = 'development_tool',
  TESTING_TOOL = 'testing_tool',
  DEPLOYMENT_TOOL = 'deployment_tool',
  OTHER = 'other'
}

/**
 * Create TechStack data transfer object
 */
export interface CreateTechStackData {
  name: string;
  version: string;
  description: string;
  category: TechCategory;
}

/**
 * Update TechStack data transfer object
 */
export interface UpdateTechStackData {
  name?: string;
  version?: string;
  description?: string;
  category?: TechCategory;
}

/**
 * Tech stack search filters
 */
export interface TechStackFilters {
  name?: string;
  category?: TechCategory;
  version?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * Tech stack search options
 */
export interface TechStackSearchOptions {
  filters?: TechStackFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'name' | 'category';
  orderDirection?: 'asc' | 'desc';
}

/**
 * Tech stack validation errors
 */
export interface TechStackValidationError {
  field: keyof TechStack;
  message: string;
}

/**
 * Tech stack validation result
 */
export interface TechStackValidationResult {
  isValid: boolean;
  errors: TechStackValidationError[];
}

/**
 * Predefined tech stack entries for common technologies
 */
export const COMMON_TECH_STACK: Omit<TechStack, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Next.js',
    version: '15+',
    description: 'React framework for production',
    category: TechCategory.FRAMEWORK
  },
  {
    name: 'React',
    version: '18+',
    description: 'Frontend JavaScript library',
    category: TechCategory.LIBRARY
  },
  {
    name: 'TypeScript',
    version: '5+',
    description: 'JavaScript with syntax for types',
    category: TechCategory.TOOL
  },
  {
    name: 'Tailwind CSS',
    version: '4.1',
    description: 'Utility-first CSS framework',
    category: TechCategory.LIBRARY
  },
  {
    name: 'Prisma',
    version: '6+',
    description: 'Next-generation ORM for TypeScript & Node.js',
    category: TechCategory.DATABASE
  },
  {
    name: 'Shadcn UI',
    version: 'Latest',
    description: 'Beautifully designed components built with Radix UI',
    category: TechCategory.UI_COMPONENT
  }
];