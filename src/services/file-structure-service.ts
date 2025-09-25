import { FileStructure, FileType, FileStructureFilters, FileStructureSearchOptions, FileStructureNode } from '@/models/file-structure';
import { existsSync, statSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

/**
 * File Structure Validation Service
 *
 * Provides functionality to validate and analyze project file structures,
 * particularly focusing on read-only directories and file organization.
 */
class FileStructureService {
  private fileStructureCache: Map<string, FileStructure> = new Map();

  /**
   * Validate if a file path is read-only
   */
  async validateReadOnlyStatus(filePath: string): Promise<{ isReadOnly: boolean; reason?: string }> {
    const normalizedPath = this.normalizePath(filePath);

    // Check if path exists
    if (!existsSync(normalizedPath)) {
      return { isReadOnly: false, reason: 'Path does not exist' };
    }

    // Define read-only patterns
    const readOnlyPatterns = [
      /^src\/components\/ui\//i,
      /^node_modules\//i,
      /^\.git\//i,
      /^dist\//i,
      /^build\//i,
      /^coverage\//i
    ];

    // Check if path matches read-only patterns
    const isReadOnly = readOnlyPatterns.some(pattern => pattern.test(normalizedPath));

    if (isReadOnly) {
      return {
        isReadOnly: true,
        reason: 'Path matches read-only directory pattern'
      };
    }

    // Check if it's a configuration file that should be read-only
    const readOnlyFiles = [
      '.gitignore',
      'package.json',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      'tsconfig.json',
      'next.config.js',
      'jest.config.js',
      'eslint.config.js'
    ];

    const fileName = normalizedPath.split('/').pop() || '';
    if (readOnlyFiles.includes(fileName)) {
      return {
        isReadOnly: true,
        reason: 'Configuration file should not be modified'
      };
    }

    return { isReadOnly: false };
  }

  /**
   * Get file structure information for a given path
   */
  async getFileStructure(filePath: string): Promise<FileStructure | null> {
    const normalizedPath = this.normalizePath(filePath);

    // Check cache first
    if (this.fileStructureCache.has(normalizedPath)) {
      return this.fileStructureCache.get(normalizedPath)!;
    }

    if (!existsSync(normalizedPath)) {
      return null;
    }

    const stats = statSync(normalizedPath);
    const readOnlyStatus = await this.validateReadOnlyStatus(normalizedPath);

    const fileStructure: FileStructure = {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      path: normalizedPath,
      type: stats.isDirectory() ? FileType.DIRECTORY : FileType.FILE,
      description: await this.generateDescription(normalizedPath, stats.isDirectory()),
      readOnly: readOnlyStatus.isReadOnly,
      createdAt: stats.birthtime,
      updatedAt: stats.mtime
    };

    // Cache the result
    this.fileStructureCache.set(normalizedPath, fileStructure);

    return fileStructure;
  }

  /**
   * Search file structures based on filters
   */
  async searchFileStructures(
    options: FileStructureSearchOptions = {}
  ): Promise<FileStructure[]> {
    const { filters = {}, limit = 100, offset = 0 } = options;

    // For this implementation, we'll return mock data
    // In a real implementation, this would scan the actual file system
    const mockFileStructures: FileStructure[] = [
      {
        id: 'mock-1',
        path: 'src/components/ui/',
        type: FileType.DIRECTORY,
        description: 'Shadcn UI components (read-only)',
        readOnly: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'mock-2',
        path: 'src/lib/',
        type: FileType.DIRECTORY,
        description: 'Utility functions and configurations',
        readOnly: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'mock-3',
        path: 'notes/',
        type: FileType.DIRECTORY,
        description: 'Project documentation and knowledge base',
        readOnly: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    let results = mockFileStructures;

    // Apply filters
    if (filters.readOnly !== undefined) {
      results = results.filter(fs => fs.readOnly === filters.readOnly);
    }

    if (filters.type) {
      results = results.filter(fs => fs.type === filters.type);
    }

    // Apply pagination
    return results.slice(offset, offset + limit);
  }

  /**
   * Get directory tree structure
   */
  async getDirectoryTree(rootPath: string, maxDepth = 3): Promise<FileStructureNode[]> {
    const normalizedPath = this.normalizePath(rootPath);

    if (!existsSync(normalizedPath)) {
      throw new Error(`Directory ${normalizedPath} does not exist`);
    }

    const rootStructure = await this.getFileStructure(normalizedPath);
    if (!rootStructure || rootStructure.type !== FileType.DIRECTORY) {
      throw new Error(`${normalizedPath} is not a directory`);
    }

    return this.buildDirectoryTree(normalizedPath, 0, maxDepth);
  }

  /**
   * Validate entire project structure
   */
  async validateProjectStructure(): Promise<{
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check for required directories
    const requiredDirectories = [
      'src/',
      'src/components/',
      'src/lib/',
      'src/hooks/',
      'tests/',
      'notes/'
    ];

    for (const dir of requiredDirectories) {
      if (!existsSync(dir)) {
        issues.push(`Missing required directory: ${dir}`);
        recommendations.push(`Create directory: ${dir}`);
      }
    }

    // Check for read-only directories
    const readOnlyChecks = await Promise.all([
      this.validateReadOnlyStatus('src/components/ui/'),
      this.validateReadOnlyStatus('node_modules/'),
      this.validateReadOnlyStatus('.git/')
    ]);

    readOnlyChecks.forEach((check, index) => {
      const paths = ['src/components/ui/', 'node_modules/', '.git/'];
      if (!check.isReadOnly) {
        issues.push(`Directory ${paths[index]} should be read-only`);
      }
    });

    // Check for configuration files
    const configFiles = ['package.json', 'tsconfig.json', 'jest.config.mjs'];
    for (const file of configFiles) {
      if (!existsSync(file)) {
        issues.push(`Missing configuration file: ${file}`);
      }
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations
    };
  }

  /**
   * Generate description for a file or directory
   */
  private async generateDescription(filePath: string, isDirectory: boolean): Promise<string> {
    const pathParts = filePath.split('/');
    const name = pathParts[pathParts.length - 1];

    if (isDirectory) {
      const descriptions: Record<string, string> = {
        'src': 'Main source code directory',
        'components': 'React components directory',
        'ui': 'UI components (typically read-only)',
        'lib': 'Utility functions and configurations',
        'hooks': 'Custom React hooks',
        'app': 'Next.js app router pages and layouts',
        'tests': 'Test files and configurations',
        'notes': 'Project documentation and knowledge base',
        'prisma': 'Database schema and migrations'
      };

      return descriptions[name] || `${name} directory`;
    } else {
      const descriptions: Record<string, string> = {
        'package.json': 'Project dependencies and configuration',
        'tsconfig.json': 'TypeScript configuration',
        'jest.config.mjs': 'Jest testing configuration',
        'eslint.config.mjs': 'ESLint configuration',
        'next.config.ts': 'Next.js configuration'
      };

      return descriptions[name] || `${name} file`;
    }
  }

  /**
   * Build directory tree recursively
   */
  private async buildDirectoryTree(
    dirPath: string,
    depth: number,
    maxDepth: number
  ): Promise<FileStructureNode[]> {
    if (depth >= maxDepth) {
      return [];
    }

    const nodes: FileStructureNode[] = [];
    const items = readdirSync(dirPath);

    for (const item of items) {
      const itemPath = join(dirPath, item);
      const itemStructure = await this.getFileStructure(itemPath);

      if (!itemStructure) continue;

      const node: FileStructureNode = {
        ...itemStructure,
        depth,
        children: [],
        expanded: depth < 2 // Auto-expand first 2 levels
      };

      // Recursively build children if it's a directory
      if (itemStructure.type === FileType.DIRECTORY && !itemStructure.readOnly) {
        node.children = await this.buildDirectoryTree(itemPath, depth + 1, maxDepth);
      }

      nodes.push(node);
    }

    return nodes.sort((a, b) => {
      // Directories first, then files
      if (a.type !== b.type) {
        return a.type === FileType.DIRECTORY ? -1 : 1;
      }
      // Alphabetical order within same type
      return a.path.localeCompare(b.path);
    });
  }

  /**
   * Normalize file path
   */
  private normalizePath(filePath: string): string {
    return resolve(filePath).replace(/\\/g, '/');
  }

  /**
   * Clear file structure cache
   */
  clearCache(): void {
    this.fileStructureCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.fileStructureCache.size,
      keys: Array.from(this.fileStructureCache.keys())
    };
  }
}

// Export singleton instance
export const fileStructureService = new FileStructureService();