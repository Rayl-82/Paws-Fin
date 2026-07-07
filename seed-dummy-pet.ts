import prisma from "./lib/prisma";

async function main() {
  let user = await prisma.user.findUnique({
    where: { email: 'dummy@example.com' }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Dummy User',
        email: 'dummy@example.com',
        passwordHash: 'password123',
      }
    });
    console.log('Created dummy user');
  } else {
    console.log('Dummy user already exists');
  }

  const existingPet = await prisma.pet.findFirst({
    where: { userId: user.id }
  });

  if (!existingPet) {
    await prisma.pet.create({
      data: {
        userId: user.id,
        petName: 'Luna',
        species: 'Dog',
        age: 3,
        weight: 15.5,
        activityLevel: 'Active',
        healthCondition: 'Joint Support',
      }
    });
    console.log('Created dummy pet Luna');
  } else {
    console.log('Dummy pet already exists');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
