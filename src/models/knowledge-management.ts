/**
 * Knowledge Management Entity Model
 *
 * Represents the knowledge management practices for the AI agent.
 */
export interface KnowledgeManagement {
  /** Unique identifier for the knowledge management entry */
  id: string;

  /** Knowledge management practice */
  practice: string;

  /** Practice description */
  description: string;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Create KnowledgeManagement data transfer object
 */
export interface CreateKnowledgeManagementData {
  practice: string;
  description: string;
}

/**
 * Update KnowledgeManagement data transfer object
 */
export interface UpdateKnowledgeManagementData {
  practice?: string;
  description?: string;
}

/**
 * Knowledge management search filters
 */
export interface KnowledgeManagementFilters {
  practice?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * Knowledge management search options
 */
export interface KnowledgeManagementSearchOptions {
  filters?: KnowledgeManagementFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'practice';
  orderDirection?: 'asc' | 'desc';
}

/**
 * Knowledge management validation errors
 */
export interface KnowledgeManagementValidationError {
  field: keyof KnowledgeManagement;
  message: string;
}

/**
 * Knowledge management validation result
 */
export interface KnowledgeManagementValidationResult {
  isValid: boolean;
  errors: KnowledgeManagementValidationError[];
}

/**
 * Predefined knowledge management practices
 */
export const DEFAULT_KNOWLEDGE_PRACTICES: Omit<KnowledgeManagement, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    practice: 'Markdown Documentation',
    description: 'Use markdown format for all documentation in the notes/ directory'
  },
  {
    practice: 'Consistent File Naming',
    description: 'Use descriptive names with hyphens for file names (e.g., project-plan.md)'
  },
  {
    practice: 'Table of Contents Management',
    description: 'Update table of contents when adding significant new topics'
  },
  {
    practice: 'Knowledge Reuse',
    description: 'Search for existing knowledge before creating new documentation'
  },
  {
    practice: 'Version Control',
    description: 'Commit documentation changes with descriptive commit messages'
  },
  {
    practice: 'Read-Only Respect',
    description: 'Never modify read-only directories like src/components/ui/'
  },
  {
    practice: 'Context Preservation',
    description: 'Maintain context and relationships between related documentation'
  },
  {
    practice: 'Update Frequency',
    description: 'Keep documentation current with project changes and improvements'
  }
];

/**
 * Knowledge management categories for organization
 */
export enum KnowledgeCategory {
  DOCUMENTATION = 'documentation',
  CODE_PATTERN = 'code_pattern',
  BEST_PRACTICE = 'best_practice',
  TROUBLESHOOTING = 'troubleshooting',
  LEARNING_RESOURCE = 'learning_resource',
  PROJECT_GUIDELINE = 'project_guideline'
}

/**
 * Knowledge management priority levels
 */
export enum KnowledgePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}