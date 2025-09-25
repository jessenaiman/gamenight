/**
 * Section Entity Model
 *
 * Represents a section within the project plan template.
 */
export interface Section {
  /** Unique identifier for the section */
  id: string;

  /** Section title */
  title: string;

  /** Section content in markdown format */
  content: string;

  /** Display order */
  order: number;

  /** Reference to parent section, if nested */
  parentId?: string;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Create Section data transfer object
 */
export interface CreateSectionData {
  title: string;
  content: string;
  order: number;
  parentId?: string;
}

/**
 * Update Section data transfer object
 */
export interface UpdateSectionData {
  title?: string;
  content?: string;
  order?: number;
  parentId?: string;
}

/**
 * Section with nested subsections
 */
export interface SectionWithSubsections extends Section {
  /** Child sections */
  subsections: Section[];
}

/**
 * Section search filters
 */
export interface SectionFilters {
  title?: string;
  parentId?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * Section search options
 */
export interface SectionSearchOptions {
  filters?: SectionFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'title' | 'order';
  orderDirection?: 'asc' | 'desc';
  includeSubsections?: boolean;
}

/**
 * Section validation errors
 */
export interface SectionValidationError {
  field: keyof Section;
  message: string;
}

/**
 * Section validation result
 */
export interface SectionValidationResult {
  isValid: boolean;
  errors: SectionValidationError[];
}

/**
 * Section types for organization
 */
export enum SectionType {
  HEADER = 'header',
  OVERVIEW = 'overview',
  TECH_STACK = 'tech_stack',
  FILE_STRUCTURE = 'file_structure',
  AI_OPERATIONS = 'ai_operations',
  LEARNING_STRATEGY = 'learning_strategy',
  KNOWLEDGE_MANAGEMENT = 'knowledge_management',
  DATABASE_AUTH = 'database_auth',
  NEXT_STEPS = 'next_steps',
  CUSTOM = 'custom'
}