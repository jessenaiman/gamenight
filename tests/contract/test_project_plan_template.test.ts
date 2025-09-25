import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

describe('Project Plan Template Contract', () => {
  const projectPlanPath = join(process.cwd(), 'notes/project-plan.md');

  beforeAll(() => {
    // Verify the project plan template exists
    if (!existsSync(projectPlanPath)) {
      throw new Error(
        'Project plan template not found at notes/project-plan.md'
      );
    }
  });

  describe('Document Structure Requirements', () => {
    let content: string;

    beforeAll(() => {
      content = readFileSync(projectPlanPath, 'utf-8');
    });

    test('should have required header information', () => {
      // Check for title
      expect(content).toMatch(/^#\s+.+/m);

      // Check for description section
      expect(content).toMatch(/##\s+Overview/i);

      // Check for table of contents
      expect(content).toMatch(/##\s+.*Table of Contents/i);

      // Check for tech stack section
      expect(content).toMatch(/##\s+.*Tech Stack/i);
    });

    test('should have AI agent operations section', () => {
      expect(content).toMatch(/##\s+.*Next Steps for AI Agent/i);
    });

    test('should have learning strategy section', () => {
      expect(content).toMatch(/##\s+.*Learning Strategy/i);
    });

    test('should have knowledge management section', () => {
      expect(content).toMatch(/##\s+.*Knowledge Management/i);
    });

    test('should have database and authentication plan section', () => {
      expect(content).toMatch(/##\s+.*Database.*Authentication Plan/i);
    });

    test('should have next steps section', () => {
      expect(content).toMatch(/##\s+.*Next Steps/i);
    });

    test('should have file structure documentation', () => {
      expect(content).toMatch(/##\s+.*File.*Structure/i);
    });

    test('should use proper markdown formatting', () => {
      // Check for markdown headers
      expect(content).toMatch(/^#\s+/m);
      expect(content).toMatch(/^##\s+/m);

      // Check for bullet points
      expect(content).toMatch(/^\s*-\s+/m);

      // Check for code blocks if any
      const codeBlocks = content.match(/```[\s\S]*?```/g);
      if (codeBlocks) {
        codeBlocks.forEach(block => {
          expect(block).toMatch(/```/);
        });
      }
    });

    test('should have working table of contents', () => {
      // Extract TOC section
      const tocMatch = content.match(
        /##\s+.*Table of Contents.*\n([\s\S]*?)(?=\n##\s+)/i
      );
      expect(tocMatch).toBeTruthy();

      if (tocMatch) {
        const tocContent = tocMatch[1];
        // Should contain links or references to main sections
        expect(tocContent).toMatch(/\[[^\]]+\]\([^)]+\)|^\s*-\s+.+/m);
      }
    });

    test('should document read-only directories', () => {
      expect(content).toMatch(/read-only|readonly|src\/components\/ui/i);
    });

    test('should reference markdown note format', () => {
      expect(content).toMatch(/notes\/|markdown|\.md/i);
    });

    test('should have current tech stack information', () => {
      expect(content).toMatch(
        /Next\.js|TypeScript|Tailwind CSS|Shadcn UI|Prisma/i
      );
    });
  });

  describe('Content Quality Requirements', () => {
    let content: string;

    beforeAll(() => {
      content = readFileSync(projectPlanPath, 'utf-8');
    });

    test('should have clear section hierarchy', () => {
      const headers = content.match(/^#{1,6}\s+.+/gm);
      expect(headers).toBeTruthy();
      expect(headers!.length).toBeGreaterThan(5); // Should have multiple sections
    });

    test('should have practical examples or guidelines', () => {
      // Should contain actionable information
      expect(content).toMatch(/should|must|will|can|use|create|write|read/i);
    });

    test('should reference actual project structure', () => {
      // Should reference actual directories and files
      expect(content).toMatch(/src\/|tests\/|components\/|notes\/|docs\//i);
    });
  });

  describe('Technical Requirements', () => {
    test('should be valid markdown', () => {
      const content = readFileSync(projectPlanPath, 'utf-8');

      // Basic markdown validation - check for balanced brackets
      const openBrackets = (content.match(/\[/g) || []).length;
      const closeBrackets = (content.match(/\]/g) || []).length;
      expect(openBrackets).toBe(closeBrackets);

      // Check for balanced parentheses in links
      const openParens = (content.match(/\(/g) || []).length;
      const closeParens = (content.match(/\)/g) || []).length;
      expect(openParens).toBe(closeParens);
    });

    test('should be readable text file', () => {
      const content = readFileSync(projectPlanPath, 'utf-8');

      // Should not contain null bytes or other binary content
      expect(content).not.toMatch('\u0000');

      // Should be mostly ASCII with some Unicode allowed
      const nonAsciiCount = (content.match(/[^\u0000-\u007F]/g) || []).length;
      const totalChars = content.length;
      const nonAsciiPercentage = (nonAsciiCount / totalChars) * 100;

      // Should be less than 10% non-ASCII characters
      expect(nonAsciiPercentage).toBeLessThan(10);
    });
  });
});
