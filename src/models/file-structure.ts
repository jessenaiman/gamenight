/**
 * File Structure Entity Model
 *
 * Represents the project file structure documentation.
 */
export interface FileStructure {
  /** Unique identifier for the file structure entry */
  id: string;

  /** File path */
  path: string;

  /** File or directory type */
  type: FileType;

  /** Description of the file/directory */
  description: string;

  /** Whether the file/directory is read-only */
  readOnly: boolean;

  /** Creation timestamp */
  createdAt: Date;

  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * File types
 */
export enum FileType {
  FILE = 'file',
  DIRECTORY = 'directory'
}

/**
 * Create FileStructure data transfer object
 */
export interface CreateFileStructureData {
  path: string;
  type: FileType;
  description: string;
  readOnly: boolean;
}

/**
 * Update FileStructure data transfer object
 */
export interface UpdateFileStructureData {
  path?: string;
  type?: FileType;
  description?: string;
  readOnly?: boolean;
}

/**
 * File structure search filters
 */
export interface FileStructureFilters {
  path?: string;
  type?: FileType;
  readOnly?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
}

/**
 * File structure search options
 */
export interface FileStructureSearchOptions {
  filters?: FileStructureFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'path' | 'type';
  orderDirection?: 'asc' | 'desc';
  includeSubdirectories?: boolean;
}

/**
 * File structure validation errors
 */
export interface FileStructureValidationError {
  field: keyof FileStructure;
  message: string;
}

/**
 * File structure validation result
 */
export interface FileStructureValidationResult {
  isValid: boolean;
  errors: FileStructureValidationError[];
}

/**
 * File structure tree node for hierarchical representation
 */
export interface FileStructureNode extends FileStructure {
  /** Child nodes (for directories) */
  children: FileStructureNode[];
  /** Depth level in the tree */
  depth: number;
  /** Whether this node is expanded in the UI */
  expanded?: boolean;
}

/**
 * File structure statistics
 */
export interface FileStructureStats {
  totalFiles: number;
  totalDirectories: number;
  readOnlyFiles: number;
  readOnlyDirectories: number;
  totalSize: number; // in bytes
}

/**
 * Predefined file structure entries for common project structure
 */
export const COMMON_FILE_STRUCTURE: Omit<FileStructure, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    path: 'src/',
    type: FileType.DIRECTORY,
    description: 'Main source code directory',
    readOnly: false
  },
  {
    path: 'src/components/',
    type: FileType.DIRECTORY,
    description: 'React components directory',
    readOnly: false
  },
  {
    path: 'src/components/ui/',
    type: FileType.DIRECTORY,
    description: 'Shadcn UI components (read-only)',
    readOnly: true
  },
  {
    path: 'src/app/',
    type: FileType.DIRECTORY,
    description: 'Next.js app router pages and layouts',
    readOnly: false
  },
  {
    path: 'src/lib/',
    type: FileType.DIRECTORY,
    description: 'Utility functions and configurations',
    readOnly: false
  },
  {
    path: 'src/hooks/',
    type: FileType.DIRECTORY,
    description: 'Custom React hooks',
    readOnly: false
  },
  {
    path: 'notes/',
    type: FileType.DIRECTORY,
    description: 'Project documentation and knowledge base',
    readOnly: false
  },
  {
    path: 'tests/',
    type: FileType.DIRECTORY,
    description: 'Test files and configurations',
    readOnly: false
  },
  {
    path: 'prisma/',
    type: FileType.DIRECTORY,
    description: 'Database schema and migrations',
    readOnly: false
  }
];