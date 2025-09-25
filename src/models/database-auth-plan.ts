/**
 * Database and Authentication Plan Entity Model
 *
 * Represents the database and authentication plan for the project.
 */
export interface DatabaseAuthPlan {
  /** Unique identifier for the database auth plan */
  id: string;

  /** Current implementation status */
  status: ImplementationStatus;

  /** Planned features */
  features: string[];

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Implementation status levels
 */
export enum ImplementationStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  IMPLEMENTED = 'implemented',
  TESTING = 'testing',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold'
}

/**
 * Create DatabaseAuthPlan data transfer object
 */
export interface CreateDatabaseAuthPlanData {
  status: ImplementationStatus;
  features: string[];
}

/**
 * Update DatabaseAuthPlan data transfer object
 */
export interface UpdateDatabaseAuthPlanData {
  status?: ImplementationStatus;
  features?: string[];
}

/**
 * Database auth plan search filters
 */
export interface DatabaseAuthPlanFilters {
  status?: ImplementationStatus;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * Database auth plan search options
 */
export interface DatabaseAuthPlanSearchOptions {
  filters?: DatabaseAuthPlanFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'status';
  orderDirection?: 'asc' | 'desc';
}

/**
 * Database auth plan validation errors
 */
export interface DatabaseAuthPlanValidationError {
  field: keyof DatabaseAuthPlan;
  message: string;
}

/**
 * Database auth plan validation result
 */
export interface DatabaseAuthPlanValidationResult {
  isValid: boolean;
  errors: DatabaseAuthPlanValidationError[];
}

/**
 * Predefined database and authentication features
 */
export const DEFAULT_DATABASE_FEATURES = [
  'User authentication system',
  'Role-based access control',
  'Database schema design',
  'Data validation and sanitization',
  'Password hashing and security',
  'Session management',
  'API authentication middleware',
  'Database connection pooling',
  'Migration system',
  'Seed data management'
];

/**
 * Database configuration options
 */
export interface DatabaseConfig {
  type: 'sqlite' | 'postgresql' | 'mysql';
  host?: string;
  port?: number;
  database: string;
  username?: string;
  password?: string;
  ssl?: boolean;
}

/**
 * Authentication configuration options
 */
export interface AuthConfig {
  providers: ('credentials' | 'google' | 'github' | 'discord')[];
  sessionStrategy: 'database' | 'jwt';
  sessionMaxAge: number; // in seconds
  passwordMinLength: number;
  requireEmailVerification: boolean;
}

/**
 * Current database and authentication plan for the project
 */
export const CURRENT_DATABASE_AUTH_PLAN: Omit<DatabaseAuthPlan, 'id' | 'createdAt' | 'updatedAt'> = {
  status: ImplementationStatus.IMPLEMENTED,
  features: [
    'NextAuth.js authentication',
    'Prisma ORM with SQLite',
    'Role-based access control',
    'Password hashing with bcrypt',
    'Session management',
    'Database migrations',
    'Seed data scripts'
  ]
};