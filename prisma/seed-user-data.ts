import prisma from '../lib/prisma';

async function main() {
  console.log("Seeding dummy user data...");
  
  // 1. Find the dummy user
  const user = await prisma.user.findUnique({
    where: { email: "dummy@example.com" }
  });

  if (!user) {
    console.error("Dummy user not found!");
    return;
  }

  // 2. Create Pet Profiles
  // Delete existing pets for this user to avoid duplicates if run multiple times
  await prisma.pet.deleteMany({ where: { userId: user.id } });

  console.log("Creating dummy pets...");
  await prisma.pet.create({
    data: {
      userId: user.id,
      petName: "Luna",
      species: "Cat",
      breed: "Maine Coon",
      age: 3,
      weight: 4.5,
      activityLevel: "Moderate",
      healthCondition: "Healthy Coat & Skin"
    }
  });

  await prisma.pet.create({
    data: {
      userId: user.id,
      petName: "Max",
      species: "Dog",
      breed: "Golden Retriever",
      age: 5,
      weight: 30.0,
      activityLevel: "High",
      healthCondition: "Joint Support"
    }
  });

  // 3. Create a past order for demo purposes
  // Let's fetch a product to use
  const product = await prisma.product.findFirst();
  
  if (product) {
    // Delete existing orders for this user
    await prisma.order.deleteMany({ where: { userId: user.id } });

    console.log("Creating dummy past order...");
    await prisma.order.create({
      data: {
        userId: user.id,
        totalPrice: product.price * 2 + 10000,
        shippingAddress: "Jl. Sudirman No. 1, Jakarta Selatan, DKI Jakarta, 12190",
        status: "Delivered",
        orderItems: {
          create: [
            {
              productId: product.id,
              quantity: 2,
              price: product.price
            }
          ]
        }
      }
    });
  }

  console.log("Dummy user data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
