import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('Database Integration', () => {
  const testDbPath = path.join(process.cwd(), 'test-integration.db');

  beforeAll(() => {
    // Clean up any existing test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  afterAll(() => {
    // Clean up test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  describe('Database Scripts', () => {
    it('should run migrations successfully', () => {
      expect(() => {
        execSync('npx prisma migrate dev --name test', {
          env: { ...process.env, DATABASE_URL: 'file:./test-integration.db' },
          stdio: 'pipe',
        });
      }).not.toThrow();
    });

    it('should generate Prisma client', () => {
      expect(() => {
        execSync('npx prisma generate', { stdio: 'pipe' });
      }).not.toThrow();
    });

    it('should create database file after migration', () => {
      // Run migration
      execSync('npx prisma migrate dev --name test', {
        env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
        stdio: 'pipe',
      });

      // Check if database file was created
      expect(fs.existsSync(testDbPath)).toBe(true);

      // Check if database file has content
      const stats = fs.statSync(testDbPath);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should handle seed script execution', () => {
      // Run migration first
      execSync('npx prisma migrate dev --name test', {
        env: { ...process.env, DATABASE_URL: 'file:./test-integration.db' },
        stdio: 'pipe',
      });

      // Generate client
      execSync('npx prisma generate', { stdio: 'pipe' });

      // Run seed script
      expect(() => {
        execSync('npx tsx prisma/seed.ts', {
          env: { ...process.env, DATABASE_URL: 'file:./test-integration.db' },
          stdio: 'pipe',
        });
      }).not.toThrow();
    });
  });

  describe('Database Files', () => {
    it('should have proper Prisma schema file', () => {
      const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
      expect(fs.existsSync(schemaPath)).toBe(true);

      const schemaContent = fs.readFileSync(schemaPath, 'utf8');
      expect(schemaContent).toContain('datasource db');
      expect(schemaContent).toContain('generator client');
      expect(schemaContent).toContain('model User');
      expect(schemaContent).toContain('model Event');
    });

    it('should have seed script', () => {
      const seedPath = path.join(process.cwd(), 'prisma/seed.ts');
      expect(fs.existsSync(seedPath)).toBe(true);

      const seedContent = fs.readFileSync(seedPath, 'utf8');
      expect(seedContent).toContain('import { PrismaClient }');
      expect(seedContent).toContain('async function main()');
    });
  });
});

describe('Database Scripts', () => {
  const testDbPath = path.join(process.cwd(), 'test.db');

  beforeEach(() => {
    // Remove test database if it exists
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  afterEach(() => {
    // Clean up test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('should run migrations successfully', () => {
    expect(() => {
      execSync('npx prisma migrate dev --name test', {
        env: { ...process.env, DATABASE_URL: 'file:./test.db' },
        stdio: 'pipe',
      });
    }).not.toThrow();
  });

  it('should generate Prisma client', () => {
    expect(() => {
      execSync('npx prisma generate', { stdio: 'pipe' });
    }).not.toThrow();
  });
});
