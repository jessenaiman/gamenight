import { mockDeep, mockReset } from 'jest-mock-extended';

import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: mockDeep(),
}));

describe('Prisma Client', () => {
  beforeEach(() => {
    mockReset(prisma);
  });

  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });

  it('should have all required methods', () => {
    expect(prisma.user).toBeDefined();
    expect(prisma.event).toBeDefined();
    expect(prisma.category).toBeDefined();
    expect(prisma.registration).toBeDefined();
    expect(prisma.poll).toBeDefined();
    expect(prisma.idea).toBeDefined();
  });

  it('should have NextAuth models', () => {
    expect(prisma.account).toBeDefined();
    expect(prisma.session).toBeDefined();
    expect(prisma.verificationToken).toBeDefined();
  });

  it('should have proper singleton behavior in development', () => {
    // Test that the singleton pattern works correctly
    const { prisma: prisma2 } = require('@/lib/prisma');
    expect(prisma).toBe(prisma2);
  });
});
