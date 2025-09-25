/**
 * Next Steps Entity Model
 *
 * Represents the next steps for AI agent operations.
 */
export interface NextSteps {
  /** Unique identifier for the next step */
  id: string;

  /** Next step description */
  step: string;

  /** Step priority */
  priority: number;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Create NextSteps data transfer object
 */
export interface CreateNextStepsData {
  step: string;
  priority: number;
}

/**
 * Update NextSteps data transfer object
 */
export interface UpdateNextStepsData {
  step?: string;
  priority?: number;
}

/**
 * Next steps search filters
 */
export interface NextStepsFilters {
  priority?: number;
  priorityMin?: number;
  priorityMax?: number;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * Next steps search options
 */
export interface NextStepsSearchOptions {
  filters?: NextStepsFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'priority' | 'step';
  orderDirection?: 'asc' | 'desc';
}

/**
 * Next steps validation errors
 */
export interface NextStepsValidationError {
  field: keyof NextSteps;
  message: string;
}

/**
 * Next steps validation result
 */
export interface NextStepsValidationResult {
  isValid: boolean;
  errors: NextStepsValidationError[];
}

/**
 * Next steps priority levels
 */
export enum NextStepsPriority {
  URGENT = 1,
  HIGH = 2,
  MEDIUM = 3,
  LOW = 4
}

/**
 * Next steps categories for organization
 */
export enum NextStepsCategory {
  IMMEDIATE = 'immediate',
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
  ONGOING = 'ongoing'
}

/**
 * Predefined next steps for AI agent operations
 */
export const DEFAULT_NEXT_STEPS: Omit<NextSteps, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    step: 'Load README.md and project plan on startup',
    priority: NextStepsPriority.HIGH
  },
  {
    step: 'Search for existing notes or code before any task',
    priority: NextStepsPriority.HIGH
  },
  {
    step: 'Write markdown notes after learning new concepts',
    priority: NextStepsPriority.MEDIUM
  },
  {
    step: 'Verify read-only status of files before writing',
    priority: NextStepsPriority.HIGH
  },
  {
    step: 'Update table of contents when adding significant topics',
    priority: NextStepsPriority.MEDIUM
  },
  {
    step: 'Follow test-first development approach',
    priority: NextStepsPriority.HIGH
  },
  {
    step: 'Respect project coding conventions and patterns',
    priority: NextStepsPriority.HIGH
  },
  {
    step: 'Run quality checks before completing tasks',
    priority: NextStepsPriority.HIGH
  }
];

/**
 * Next steps status tracking
 */
export interface NextStepsStatus {
  totalSteps: number;
  completedSteps: number;
  inProgressSteps: number;
  pendingSteps: number;
  urgentSteps: number;
}

/**
 * Next steps progress report
 */
export interface NextStepsProgress {
  overall: number; // percentage
  byPriority: Record<NextStepsPriority, number>;
  byCategory: Record<NextStepsCategory, number>;
  recentActivity: NextSteps[];
}