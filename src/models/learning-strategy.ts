/**
 * Learning Strategy Entity Model
 *
 * Represents the learning strategy guidelines for the AI agent.
 */
export interface LearningStrategy {
  /** Unique identifier for the learning strategy */
  id: string;

  /** Learning goal */
  goal: string;

  /** Learning steps */
  steps: string[];

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Create LearningStrategy data transfer object
 */
export interface CreateLearningStrategyData {
  goal: string;
  steps: string[];
}

/**
 * Update LearningStrategy data transfer object
 */
export interface UpdateLearningStrategyData {
  goal?: string;
  steps?: string[];
}

/**
 * Learning strategy search filters
 */
export interface LearningStrategyFilters {
  goal?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * Learning strategy search options
 */
export interface LearningStrategySearchOptions {
  filters?: LearningStrategyFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'goal';
  orderDirection?: 'asc' | 'desc';
}

/**
 * Learning strategy validation errors
 */
export interface LearningStrategyValidationError {
  field: keyof LearningStrategy;
  message: string;
}

/**
 * Learning strategy validation result
 */
export interface LearningStrategyValidationResult {
  isValid: boolean;
  errors: LearningStrategyValidationError[];
}

/**
 * Predefined learning strategies
 */
export const DEFAULT_LEARNING_STRATEGIES: Omit<LearningStrategy, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    goal: 'Learn a new technology or concept',
    steps: [
      'Check existing documentation in notes/ directory',
      'Search for related files and code patterns',
      'Read relevant documentation and examples',
      'Write summary of findings in a new markdown note',
      'Update table of contents if adding significant new topic'
    ]
  },
  {
    goal: 'Understand project structure and organization',
    steps: [
      'Review the project plan template',
      'Examine file structure documentation',
      'Check tech stack information',
      'Review existing code patterns and conventions',
      'Identify read-only directories and components'
    ]
  },
  {
    goal: 'Implement a new feature or functionality',
    steps: [
      'Analyze requirements and break down into tasks',
      'Research existing similar implementations',
      'Create tests before implementation (TDD)',
      'Implement following project conventions',
      'Update documentation and knowledge base'
    ]
  },
  {
    goal: 'Debug and fix issues',
    steps: [
      'Reproduce the issue systematically',
      'Check error logs and stack traces',
      'Review related code and tests',
      'Apply fixes following project patterns',
      'Verify fix with tests and validation'
    ]
  }
];