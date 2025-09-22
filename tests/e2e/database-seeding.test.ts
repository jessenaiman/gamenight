import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import { PrismaClient } from '@prisma/client';
import { test, expect } from '@playwright/test';

test.describe('Database Seeding', () => {
  let prisma: PrismaClient;
  const testDbPath = path.join(process.cwd(), 'test-seed.db');

  test.beforeEach(async () => {
    // Clean up any existing test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }

    // Set up test database
    process.env.DATABASE_URL = `file:${testDbPath}`;
    prisma = new PrismaClient();
  });

  test.afterEach(async () => {
    await prisma.$disconnect();

    // Clean up test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  test('should seed database with initial data', async () => {
    // Run migrations
    execSync('npx prisma migrate dev --name init', {
      env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
      stdio: 'pipe',
    });

    // Generate client
    execSync('npx prisma generate', { stdio: 'pipe' });

    // Run seed script
    execSync('npx tsx prisma/seed.ts', {
      env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
      stdio: 'pipe',
    });

    // Verify categories were created
    const categories = await prisma.category.findMany();
    expect(categories).toHaveLength(3);
    expect(categories.map(c => c.name)).toEqual(
      expect.arrayContaining(['Board Games', 'Card Games', 'RPG'])
    );

    // Verify events were created
    const events = await prisma.event.findMany();
    expect(events).toHaveLength(3);
    expect(events.map(e => e.slug)).toEqual(
      expect.arrayContaining([
        'weekly-game-night',
        'mtg-tournament',
        'dnd-campaign',
      ])
    );

    // Verify users were created
    const users = await prisma.user.findMany();
    expect(users).toHaveLength(3);
    expect(users.map(u => u.email)).toEqual(
      expect.arrayContaining([
        'admin@gamenight.com',
        'volunteer@gamenight.com',
        'user@gamenight.com',
      ])
    );

    // Verify registrations were created
    const registrations = await prisma.registration.findMany();
    expect(registrations.length).toBeGreaterThanOrEqual(1);

    // Verify polls were created
    const polls = await prisma.poll.findMany();
    expect(polls.length).toBeGreaterThanOrEqual(1);

    // Verify poll options were created
    const pollOptions = await prisma.pollOption.findMany();
    expect(pollOptions.length).toBeGreaterThanOrEqual(3);

    // Verify ideas were created
    const ideas = await prisma.idea.findMany();
    expect(ideas.length).toBeGreaterThanOrEqual(2);
  });

  test('should handle seed script errors gracefully', async () => {
    // Run migrations first
    execSync('npx prisma migrate dev --name init', {
      env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
      stdio: 'pipe',
    });

    // Try to run seed with corrupted data
    const corruptedSeedPath = path.join(
      process.cwd(),
      'prisma/seed-corrupted.ts'
    );

    // Create a corrupted seed file
    const corruptedSeed = `
      import { PrismaClient } from '@prisma/client'

      const prisma = new PrismaClient()

      async function main() {
        throw new Error('Corrupted seed script')
      }

      main()
        .catch((e) => {
          console.error(e)
          process.exit(1)
        })
    `;

    fs.writeFileSync(corruptedSeedPath, corruptedSeed);

    try {
      // This should fail
      expect(() => {
        execSync(`npx tsx ${corruptedSeedPath}`, {
          env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
          stdio: 'pipe',
        });
      }).toThrow();
    } finally {
      // Clean up corrupted file
      if (fs.existsSync(corruptedSeedPath)) {
        fs.unlinkSync(corruptedSeedPath);
      }
    }
  });

  test('should verify database integrity after seeding', async () => {
    // Run full setup
    execSync('npx prisma migrate dev --name init', {
      env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
      stdio: 'pipe',
    });

    execSync('npx prisma generate', { stdio: 'pipe' });

    execSync('npx tsx prisma/seed.ts', {
      env: { ...process.env, DATABASE_URL: `file:${testDbPath}` },
      stdio: 'pipe',
    });

    // Verify all foreign key relationships are intact
    const eventsWithCategories = await prisma.event.findMany({
      include: { category: true },
    });
    expect(eventsWithCategories.every(e => e.category)).toBe(true);

    const registrationsWithUsers = await prisma.registration.findMany({
      include: { user: true, event: true },
    });
    expect(registrationsWithUsers.every(r => r.user && r.event)).toBe(true);

    const pollsWithOptions = await prisma.poll.findMany({
      include: { options: true },
    });
    expect(pollsWithOptions.every(p => p.options.length > 0)).toBe(true);
  });
});
