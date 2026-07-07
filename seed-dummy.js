const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'dummy@example.com' },
    update: {},
    create: {
      name: 'Dummy User',
      email: 'dummy@example.com',
      passwordHash: hash
    }
  });
  console.log('Dummy user created:', user);
}
main().catch(console.error).finally(() => prisma.$disconnect());
