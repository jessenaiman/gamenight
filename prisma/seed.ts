import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Board Games' },
      update: {},
      create: {
        name: 'Board Games',
        description: 'Classic and modern board games',
        color: '#3B82F6',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Card Games' },
      update: {},
      create: {
        name: 'Card Games',
        description: 'Trading card games and party games',
        color: '#10B981',
      },
    }),
    prisma.category.upsert({
      where: { name: 'RPG' },
      update: {},
      create: {
        name: 'RPG',
        description: 'Role-playing games and campaigns',
        color: '#8B5CF6',
      },
    }),
  ]);

  // Create sample events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { slug: 'weekly-game-night' },
      update: {},
      create: {
        title: 'Weekly Game Night',
        slug: 'weekly-game-night',
        description:
          'Join us every Friday for our regular game night featuring a variety of board games and card games.',
        date: new Date('2024-10-04T19:00:00Z'),
        location: 'Community Center - Main Hall',
        maxCapacity: 30,
        pricing: {
          member: 5,
          nonMember: 10,
          couple: 15,
        },
        status: 'PUBLISHED',
        categoryId: categories[0].id,
      },
    }),
    prisma.event.upsert({
      where: { slug: 'mtg-tournament' },
      update: {},
      create: {
        title: 'Magic: The Gathering Tournament',
        slug: 'mtg-tournament',
        description: 'Competitive MTG tournament with prizes for top players.',
        date: new Date('2024-10-12T13:00:00Z'),
        location: 'Game Store Downtown',
        maxCapacity: 16,
        pricing: {
          entry: 20,
          spectator: 5,
        },
        status: 'PUBLISHED',
        categoryId: categories[1].id,
      },
    }),
    prisma.event.upsert({
      where: { slug: 'dnd-campaign' },
      update: {},
      create: {
        title: 'D&D Campaign Launch',
        slug: 'dnd-campaign',
        description:
          'Start of a new Dungeons & Dragons campaign for players of all experience levels.',
        date: new Date('2024-10-20T18:00:00Z'),
        location: 'Library Meeting Room',
        maxCapacity: 6,
        pricing: {
          session: 15,
          fullCampaign: 60,
        },
        status: 'PUBLISHED',
        categoryId: categories[2].id,
      },
    }),
  ]);

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@gamenight.com' },
      update: {},
      create: {
        email: 'admin@gamenight.com',
        name: 'Admin User',
        password:
          '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'volunteer@gamenight.com' },
      update: {},
      create: {
        email: 'volunteer@gamenight.com',
        name: 'Volunteer User',
        password:
          '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'VOLUNTEER',
      },
    }),
    prisma.user.upsert({
      where: { email: 'user@gamenight.com' },
      update: {},
      create: {
        email: 'user@gamenight.com',
        name: 'Regular User',
        password:
          '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'USER',
      },
    }),
  ]);

  // Create sample registrations
  await Promise.all([
    prisma.registration.upsert({
      where: { id: 'reg-1' },
      update: {},
      create: {
        id: 'reg-1',
        status: 'CONFIRMED',
        guestCount: 1,
        totalAmount: 5,
        paymentStatus: 'PAID',
        eventId: events[0].id,
        userId: users[2].id,
      },
    }),
    prisma.registration.upsert({
      where: { id: 'reg-2' },
      update: {},
      create: {
        id: 'reg-2',
        status: 'PENDING',
        guestCount: 2,
        totalAmount: 15,
        paymentStatus: 'PENDING',
        eventId: events[0].id,
        userId: users[1].id,
      },
    }),
  ]);

  // Create sample polls
  const poll = await prisma.poll.upsert({
    where: { id: 'poll-1' },
    update: {},
    create: {
      id: 'poll-1',
      title: 'What type of games do you prefer?',
      description: 'Help us plan future game nights',
      isActive: true,
      eventId: events[0].id,
      userId: users[0].id,
    },
  });

  // Create poll options
  await Promise.all([
    prisma.pollOption.upsert({
      where: { id: 'option-1' },
      update: {},
      create: {
        id: 'option-1',
        text: 'Board Games',
        order: 1,
        pollId: poll.id,
      },
    }),
    prisma.pollOption.upsert({
      where: { id: 'option-2' },
      update: {},
      create: {
        id: 'option-2',
        text: 'Card Games',
        order: 2,
        pollId: poll.id,
      },
    }),
    prisma.pollOption.upsert({
      where: { id: 'option-3' },
      update: {},
      create: {
        id: 'option-3',
        text: 'RPG Games',
        order: 3,
        pollId: poll.id,
      },
    }),
  ]);

  // Create sample ideas
  await Promise.all([
    prisma.idea.upsert({
      where: { id: 'idea-1' },
      update: {},
      create: {
        id: 'idea-1',
        title: 'Game Library Expansion',
        description: 'Add more modern board games to our collection',
        status: 'PENDING',
        userId: users[2].id,
      },
    }),
    prisma.idea.upsert({
      where: { id: 'idea-2' },
      update: {},
      create: {
        id: 'idea-2',
        title: 'Virtual Game Nights',
        description: 'Host online game sessions for remote participants',
        status: 'APPROVED',
        userId: users[1].id,
      },
    }),
  ]);

  console.log('Database seeded successfully!');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${events.length} events`);
  console.log(`Created ${users.length} users`);
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
