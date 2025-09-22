# Database & Authentication Integration Plan

## Overview

This document outlines the current state and comprehensive plan for integrating database functionality and user authentication into Game Night Central using a vendor-agnostic approach.

## Architecture Decision

### 🎯 New Approach: ORM + Environment-Based Configuration

Instead of direct Firebase integration, we'll use:

- **Prisma ORM** for database abstraction
- **SQLite** for local development (no setup required)
- **PostgreSQL** for production (scalable, reliable)
- **Environment-based configuration** for easy switching
- **Migration and seed scripts** for data management

### ✅ Benefits of This Approach

- **No vendor lock-in** - Easy to switch databases
- **Local development** - SQLite runs without configuration
- **Type safety** - Full TypeScript integration with Prisma
- **Migrations** - Version-controlled database schema
- **Seeds** - Consistent test data across environments
- **Production ready** - Scales to PostgreSQL or other databases

## Current State Analysis

### ✅ What's Already in Place

- **Data Structures** - Well-defined schemas in `docs/data-structures.md`
- **Form Components** - React Hook Form with Zod validation
- **UI Components** - Complete Shadcn UI component library
- **TypeScript** - Full type safety setup
- **Next.js** - Built-in API routes support

### ❌ What's Missing

- **Database Connection** - No ORM or database configuration
- **Authentication System** - No login/signup functionality
- **Data Persistence** - All data is currently static/mock
- **User Management** - No user profiles or permissions
- **API Routes** - No backend endpoints for data operations

## Database Integration Plan

### Phase 1: Foundation Setup

#### 1.1 Prisma ORM Setup

```bash
# Install Prisma and database dependencies
npm install prisma @prisma/client
npm install bcryptjs @types/bcryptjs  # For password hashing
npm install next-auth @auth/prisma-adapter  # For authentication
```

#### 1.2 Database Configuration

```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"  // Development
  url      = env("DATABASE_URL")
  // Production: provider = "postgresql"
}

// User model with authentication
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  registrations Registration[]
  ideas        Idea[]
  pollVotes    PollVote[]
  volunteerApps VolunteerApplication[]

  @@map("users")
}

model Event {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  date        DateTime
  duration    String
  description String
  imageUrl    String?
  maxParticipants Int?
  status      EventStatus @default(PUBLISHED)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Pricing
  pricing     Json  // { men: number, women: number, couples: number }

  // Relations
  registrations Registration[]
  categories  EventCategory[]

  @@map("events")
}

model EventCategory {
  id          String @id @default(cuid())
  eventId     String
  name        String
  description String?
  icon        String
  imageUrl    String?
  order       Int

  event Event @relation(fields: [eventId], references: [id], onDelete: Cascade)

  @@map("event_categories")
}

model Registration {
  id          String   @id @default(cuid())
  eventId     String
  userId      String
  status      RegistrationStatus
  experience  String
  dietary     String?
  gameTypes   String?
  price       Float
  submittedAt DateTime @default(now())
  reviewedAt  DateTime?
  reviewedBy  String?

  event Event @relation(fields: [eventId], references: [id], onDelete: Cascade)
  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("registrations")
}

model VolunteerApplication {
  id          String   @id @default(cuid())
  userId      String
  availability String
  experience  String?
  roles       Json  // Array of role IDs
  status      ApplicationStatus @default(PENDING)
  submittedAt DateTime @default(now())
  reviewedAt  DateTime?
  notes       String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("volunteer_applications")
}

model Idea {
  id          String   @id @default(cuid())
  userId      String
  title       String
  description String
  status      IdeaStatus @default(PENDING)
  submittedAt DateTime @default(now())
  reviewedAt  DateTime?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("ideas")
}

model Poll {
  id        String   @id @default(cuid())
  question  String
  options   Json  // Array of strings
  votes     Json  // Array of numbers
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  expiresAt DateTime?

  votes PollVote[]

  @@map("polls")
}

model PollVote {
  id       String @id @default(cuid())
  pollId   String
  userId   String
  optionIndex Int
  votedAt  DateTime @default(now())

  poll Poll @relation(fields: [pollId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([pollId, userId])
  @@map("poll_votes")
}

// Enums
enum Role {
  USER
  VOLUNTEER
  ADMIN
}

enum EventStatus {
  DRAFT
  PUBLISHED
  CANCELLED
}

enum RegistrationStatus {
  MAN
  WOMAN
  COUPLE
}

enum ApplicationStatus {
  PENDING
  APPROVED
  REJECTED
}

enum IdeaStatus {
  PENDING
  APPROVED
  REJECTED
}
```

#### 1.3 Environment Configuration

```env
# .env.local (Development)
DATABASE_URL="file:./dev.db"

# .env.production
DATABASE_URL="postgresql://username:password@localhost:5432/gamenight"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

### Phase 2: Authentication System

#### 2.1 NextAuth.js Setup

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
```

#### 2.2 Authentication Components

- Login page (`src/app/auth/login/page.tsx`)
- Signup page (`src/app/auth/signup/page.tsx`)
- Protected route wrapper component
- Role-based access control

#### 2.3 Database Seed Script

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gamenight.com' },
    update: {},
    create: {
      email: 'admin@gamenight.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create sample event
  const event = await prisma.event.create({
    data: {
      title: 'Weekly Game Night',
      slug: 'weekly-game-night',
      date: new Date('2024-02-15T19:00:00Z'),
      duration: '3 hours',
      description:
        'Join us for our weekly game night featuring board games and card games.',
      pricing: { men: 15, women: 15, couples: 25 },
      maxParticipants: 30,
    },
  });

  console.log({ admin, event });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

### Phase 3: Data Layer Implementation

#### 3.1 Prisma Client Setup

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

#### 3.2 Repository Pattern with Prisma

```typescript
// src/lib/repositories/events.ts
import { prisma } from '@/lib/prisma';
import { Event, EventStatus } from '@prisma/client';

export class EventRepository {
  static async getAll(): Promise<Event[]> {
    return prisma.event.findMany({
      where: { status: EventStatus.PUBLISHED },
      include: { categories: true },
      orderBy: { date: 'asc' },
    });
  }

  static async getById(id: string): Promise<Event | null> {
    return prisma.event.findUnique({
      where: { id },
      include: { categories: true },
    });
  }

  static async create(
    eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Event> {
    return prisma.event.create({
      data: eventData,
      include: { categories: true },
    });
  }

  static async update(id: string, eventData: Partial<Event>): Promise<Event> {
    return prisma.event.update({
      where: { id },
      data: eventData,
      include: { categories: true },
    });
  }

  static async delete(id: string): Promise<void> {
    await prisma.event.delete({ where: { id } });
  }
}
```

#### 3.3 API Routes

```typescript
// src/app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { EventRepository } from '@/lib/repositories/events';

export async function GET() {
  try {
    const events = await EventRepository.getAll();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    const event = await EventRepository.create(eventData);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
```

### Phase 4: Feature Integration

#### 4.1 Event Management

- Replace static events with API calls
- Add real-time updates with SWR or TanStack Query
- Implement event creation/editing for admins
- Server-side rendering with data fetching

#### 4.2 Registration System

- Connect signup form to API routes
- Implement registration approval workflow
- Add email notifications with services like Resend
- Form validation with Zod schemas

#### 4.3 Admin Dashboard

- Real registration data display
- Bulk approval/denial actions
- Export functionality with CSV generation
- Analytics and reporting with charts

#### 4.4 Volunteer System

- Database-backed volunteer applications
- Role assignment and management
- Application review workflow
- Email notifications for status updates

#### 4.5 Community Features

- Database storage for ideas and polls
- Vote tracking and analytics
- User contribution history
- Moderation capabilities

## Testing Strategy

### Unit Tests

- Repository functions with mocked Prisma
- Authentication utilities (password hashing, JWT)
- Data transformation functions
- API route handlers

### Integration Tests

- Database connection and queries
- Authentication flow with NextAuth
- Form submissions with validation
- API endpoints with real database

### E2E Tests

- Complete user registration flow
- Event creation and registration
- Admin approval workflow
- Database seeding and migrations

### Database Testing

- Migration testing across environments
- Seed data consistency
- Rollback scenarios
- Performance testing with different databases

## Security Considerations

### Authentication Security

- Password hashing with bcrypt
- JWT session management with NextAuth
- Rate limiting for auth attempts
- Secure password requirements
- Session timeout handling

### Database Security

- SQL injection prevention through Prisma
- Input validation with Zod schemas
- API route protection and authorization
- Environment-based configuration security
- Database connection encryption

### User Data Protection

- GDPR compliance considerations
- Data retention policies
- User consent management
- Secure password storage
- Audit logging for admin actions

## Migration Strategy

### Data Migration

1. **Static to Dynamic**: Replace hardcoded data with database queries
2. **Mock to Real**: Update all mock data with real database calls
3. **Component Updates**: Modify components to handle loading states and errors

### Backward Compatibility

- Maintain current UI/UX during transition
- Graceful fallbacks for missing data
- Feature flags for new functionality

## Implementation Priority

### High Priority (Week 1-2)

1. **Prisma setup** - Install and configure Prisma ORM
2. **Database schema** - Create and run initial migration
3. **Basic authentication** - NextAuth.js setup with credentials
4. **Events data layer** - Repository pattern with Prisma
5. **Registration system** - Connect forms to database

### Medium Priority (Week 3-4)

1. **Admin dashboard** - Real data management interface
2. **User management** - Role-based access control
3. **Volunteer system** - Application tracking
4. **Community features** - Ideas and polls with database
5. **Email notifications** - Integration with services like Resend

### Low Priority (Week 5+)

1. **Advanced analytics** - Charts and reporting
2. **Bulk operations** - Mass data operations
3. **Performance optimizations** - Query optimization, caching
4. **Enhanced security** - Rate limiting, audit logs
5. **Testing infrastructure** - Unit, integration, E2E tests

## Files to Review

### Before Implementation

1. **`docs/data-structures.md`** - Database schema requirements
2. **`notes/database-authentication-plan.md`** - This implementation plan
3. **`package.json`** - Current dependencies and scripts

### During Implementation

1. **`prisma/schema.prisma`** - Database schema definition
2. **`src/lib/prisma.ts`** - Prisma client setup
3. **`src/lib/auth.ts`** - NextAuth configuration
4. **`src/lib/repositories/`** - Data access layer
5. **`src/app/api/`** - API route handlers

### After Implementation

1. **`src/app/auth/`** - Authentication pages
2. **`src/app/admin/page.tsx`** - Updated admin dashboard
3. **`src/app/signup/page.tsx`** - Updated registration system
4. **`src/components/`** - Updated components with real data
5. **`prisma/seed.ts`** - Database seeding script

## Success Metrics

### Functionality

- [ ] All pages load data from database
- [ ] User registration and login work
- [ ] Admin can approve/deny registrations
- [ ] Real-time updates work
- [ ] All CRUD operations functional

### Performance

- [ ] Page load times < 2 seconds
- [ ] Database queries optimized
- [ ] Proper loading states implemented
- [ ] Error handling in place

### Security

- [ ] Authentication required for protected routes
- [ ] Proper user permissions enforced
- [ ] Input validation working
- [ ] Security rules configured

## Next Steps

1. **Review this plan** and provide feedback on the Prisma approach
2. **Install Prisma dependencies** - Add Prisma, NextAuth, and bcryptjs
3. **Initialize Prisma** - Run `npx prisma init` to set up schema
4. **Create database schema** - Implement the models defined above
5. **Set up environment variables** - Configure DATABASE_URL and NextAuth secrets
6. **Begin Phase 1 implementation** with foundation setup
7. **Test incrementally** as features are added
8. **Migrate existing pages** to use real data

## Quick Start Commands

```bash
# 1. Install dependencies
npm install prisma @prisma/client next-auth @auth/prisma-adapter bcryptjs @types/bcryptjs

# 2. Initialize Prisma
npx prisma init

# 3. Create and run migration
npx prisma migrate dev --name init

# 4. Generate Prisma client
npx prisma generate

# 5. Seed the database
npx tsx prisma/seed.ts
```

## Environment Setup

### Development (.env.local)

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-development-secret-key
```

### Production (.env.production)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/gamenight"
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret-key
```

This plan provides a comprehensive roadmap for making the application fully functional with database integration and user authentication using a vendor-agnostic, ORM-based approach.
